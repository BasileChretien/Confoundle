import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { viteSingleFile } from "vite-plugin-singlefile";
import { puzzles } from "./src/puzzles/all";
import { ALL_DICTIONARIES } from "./src/app/translations/all";
import { lessonPages, lessonSitemap } from "./src/server/prerender";

/**
 * The controller's contact address on the privacy page.
 *
 * A build variable rather than a line in public/privacy.html because it is the
 * one piece of that page nobody can write in advance, and a privacy policy
 * naming a data controller with no way to reach them does not do its job. Kept
 * out of the repo on purpose too: a plain address in a public file is a
 * spam-harvesting target, and this is the only address on the site.
 *
 * Unset, the placeholder survives into the build and the build says so, every
 * time, rather than shipping a policy with a dead link in silence.
 */
const CONTACT_PLACEHOLDER = "CONTACT-EMAIL-PLACEHOLDER";

/**
 * Reject a contact address that is obviously not one.
 *
 * This exists because it happened, twice, in the space of ten minutes: an
 * example address written into a set of instructions got pasted verbatim into
 * the build, and the privacy policy went out carrying it. That failure is
 * worse than leaving the placeholder in, because CONTACT-EMAIL-PLACEHOLDER is
 * visibly broken whereas a plausible-looking address just quietly goes
 * nowhere, and the page it sits on is the one that tells a person how to
 * exercise a legal right.
 *
 * So the build FAILS rather than warns. A warning scrolls past in a wall of
 * asset sizes, which is exactly what happened. The only thing a warning is
 * right for is the placeholder itself, which is honest about being unset.
 */
const PLACEHOLDER_PATTERNS = [
  /^CONTACT-EMAIL-PLACEHOLDER$/i,
  /\bthe-real-address\b/i,
  /@(wherever|yourdomain|your-domain|example|domain)\b/i,
  /@(example|test|invalid|localhost)\.(com|org|net)$/i,
];

function checkContactEmail(value: string | undefined): string | undefined {
  const email = value?.trim();
  if (!email) return undefined;
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) {
    throw new Error(
      `CONTACT_EMAIL is not an email address: ${JSON.stringify(email)}`,
    );
  }
  if (PLACEHOLDER_PATTERNS.some((p) => p.test(email))) {
    throw new Error(
      `CONTACT_EMAIL looks like an example rather than a real address: ${JSON.stringify(email)}.\n` +
        "This goes on the published privacy policy as the data controller's contact, " +
        "so it has to be a mailbox that someone actually reads. Leave it unset if you " +
        "are not ready; the build will warn instead.",
    );
  }
  return email;
}

interface BuildVars {
  /**
   * Where the absolute URLs point. Open Graph rejects a relative one, so it is
   * decided at build time. Defaults to confoundle.org rather than the pages.dev
   * host, because these URLs are baked into every lesson page as canonical
   * links, hreflang alternates and Open Graph tags, and into the app shell's
   * own preview tags, and those pages exist to be pasted into arguments:
   * whatever host they carry is the one that circulates.
   */
  origin: string;
  /** The validated controller contact address, or undefined when unset. */
  contactEmail: string | undefined;
  /**
   * Cloudflare Web Analytics site token, or undefined to ship no beacon at all.
   *
   * Opt-in per deployment rather than baked in, for the same reason the contact
   * address is: a fork of this repo must not silently report its traffic to
   * somebody else's dashboard. Unset is the honest default and costs nothing.
   */
  analyticsToken: string | undefined;
}

/**
 * The two settings a deployment supplies, read from the shell AND from a
 * gitignored .env.local (covered by *.local in .gitignore).
 *
 * Reading the file matters more than it looks. The earlier version read only
 * process.env, so .env.local was silently ignored and the address had to be
 * retyped, in the right shell dialect, on every local build. That is precisely
 * the class of mistake that shipped a placeholder to production twice. loadEnv
 * picks the file up; a shell variable of the same name still overrides it, so
 * CI and the Cloudflare dashboard (which set the shell variable) are unchanged.
 */
function resolveBuildVars(mode: string): BuildVars {
  const envDir = fileURLToPath(new URL(".", import.meta.url));
  const env = loadEnv(mode, envDir, [
    "CONTACT_EMAIL",
    "SITE_ORIGIN",
    "CF_ANALYTICS_TOKEN",
  ]);
  return {
    origin: (env.SITE_ORIGIN ?? "https://confoundle.org").replace(/\/$/, ""),
    contactEmail: checkContactEmail(env.CONTACT_EMAIL),
    analyticsToken: env.CF_ANALYTICS_TOKEN?.trim() || undefined,
  };
}

/**
 * Write one static HTML page per lesson per language, at /l/<slug>/[<locale>/].
 *
 * These exist for a case the game cannot serve: someone is arguing on the
 * internet and wants to hand over the explanation rather than retype it. A link
 * into the puzzle would open something built to fool the reader first, which
 * lands badly when it arrives from an opponent, and a single-page app returns
 * the same empty shell to the crawler that builds the preview card, so every
 * lesson would unfurl identically.
 *
 * Prerendered rather than served from a Pages Function because the Function
 * version measured 910 KB gzipped, almost all of it the nine dictionaries,
 * against a 1 MiB limit for the whole Functions bundle. Doing it here has no
 * ceiling, costs nothing at runtime, and keeps the share links working on a
 * plain static host.
 *
 * Note this is the one legitimate consumer of translations/all.ts, the eager
 * dictionary map. It is a build script, not the app, so importing it cannot
 * undo the client's code splitting.
 */
function lessonPagesPlugin({ origin, contactEmail }: BuildVars): Plugin {
  return {
    name: "confoundle-lesson-pages",
    apply: "build",
    async closeBundle() {
      const outDir = "dist";
      const pages = lessonPages({
        puzzles,
        dictionaries: ALL_DICTIONARIES,
        origin,
      });
      for (const page of pages) {
        const file = join(outDir, page.file);
        await mkdir(dirname(file), { recursive: true });
        await writeFile(file, page.html, "utf8");
      }
      await writeFile(join(outDir, "sitemap.xml"), lessonSitemap(pages), "utf8");
      this.info?.(`prerendered ${pages.length} lesson pages for ${origin}`);

      // The privacy page's contact address, substituted here so the repo never
      // carries it and so setting it later is one variable rather than an edit.
      const policyPath = join(outDir, "privacy.html");
      const policy = await readFile(policyPath, "utf8");
      if (contactEmail) {
        await writeFile(
          policyPath,
          policy.split(CONTACT_PLACEHOLDER).join(contactEmail),
          "utf8",
        );
        this.info?.(`privacy contact set to ${contactEmail}`);
      } else if (policy.includes(CONTACT_PLACEHOLDER)) {
        this.warn?.(
          "privacy.html still has CONTACT-EMAIL-PLACEHOLDER. Accounts must not " +
            "go live without a contact address: build with CONTACT_EMAIL=... set.",
        );
      }
    },
  };
}

/**
 * The app shell's own head: canonical URL, social preview tags, and the
 * analytics beacon if this deployment has a token.
 *
 * The lesson pages have carried Open Graph tags since they existed, because
 * they are the thing people paste into arguments. The app itself never did, so
 * a link to the site root unfurled as a bare URL on every platform that builds
 * a preview card. That matters more now than it did: the share card, the lesson
 * links and any future social posting all point people at this origin, and a
 * link with no picture and no title reads as spam.
 *
 * Injected here rather than written into index.html because the URLs have to be
 * absolute (Open Graph rejects relative ones) and the origin is a build
 * variable, so index.html cannot know it.
 */
function appHeadPlugin({ origin, analyticsToken }: BuildVars): Plugin {
  const title = "Confoundle, spot the hidden variable";
  const description =
    "Spot the hidden variable. A daily reasoning puzzle that fools you, then shows you the trick.";
  const image = `${origin}/icons/icon-512.png`;
  const tags = [
    `<link rel="canonical" href="${origin}/">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="Confoundle">`,
    `<meta property="og:url" content="${origin}/">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<meta name="twitter:image" content="${image}">`,
  ];
  // Cloudflare's beacon is the only third-party script the app loads without
  // the reader asking for it (the Google one waits for the account panel), so
  // it is `defer` and it is the last thing in the head. It sets no cookie and
  // reads no storage; see the "How visits are counted" section of privacy.html,
  // which has to stay true to this line.
  if (analyticsToken) {
    tags.push(
      `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" ` +
        `data-cf-beacon='${JSON.stringify({ token: analyticsToken })}'></script>`,
    );
  }
  return {
    name: "confoundle-app-head",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler: (html) => html.replace("</head>", `${tags.join("\n    ")}\n  </head>`),
    },
  };
}

// `SINGLEFILE=1 vite build` inlines everything (JS, CSS, fonts) into one
// self-contained dist-single/index.html, for publishing a playable build where
// a static host isn't available. The PWA/service worker is dropped in that mode.
const singleFile = process.env.SINGLEFILE === "1";

const pwa = VitePWA({
  registerType: "autoUpdate",
  includeAssets: ["favicon.svg"],
  workbox: {
    // Dictionaries are code-split (see app/translations/index.ts), so keep
    // them OUT of the precache manifest. Precaching them would undo the split:
    // the install would still pull all ten languages down, just later.
    //
    // Instead each dictionary is cached the first time it is actually used, so
    // a reader in France ends up fully offline in French and never downloads
    // Bengali at all. The locale chunk names are content-hashed, hence globs.
    // The lesson pages are written after this manifest is built, but say so
    // anyway: they are a couple of hundred standalone documents that no app
    // shell ever needs, and precaching them would put the whole library into
    // every install.
    globIgnores: [
      "**/assets/{fr,es,pt,ja,zh,ru,hi,bn,ar}-*.js",
      // The puzzle content and the Trap Hunt bank, for the same reason as the
      // dictionaries and with the same consequence. Between them they were
      // 1.28 MB of a 1.99 MB shell, so every install carried all 73 cards and
      // 500-odd Trap Hunt items whether or not the reader ever opened one, and
      // each new card pushed the shell closer to workbox's 2 MiB per-file
      // ceiling. They are cached at runtime below instead.
      //
      // The chunk names are pinned by `manualChunks`, not inferred, precisely
      // so these globs cannot silently stop matching: a renamed entry module
      // would otherwise produce a differently-named chunk that quietly falls
      // back into the precache.
      "**/assets/puzzle-content-*.js",
      "**/assets/item-bank-*.js",
      "l/**",
      "sitemap.xml",
    ],
    // Workbox answers every NAVIGATION it does not recognise with the app
    // shell. That is right for the app, which is one URL, and wrong for these
    // three, which are real pages and real responses:
    //
    //   /l/...        the shareable lesson pages. Without this, anyone who has
    //                 opened the app once gets the puzzle instead of the
    //                 explanation when they follow a shared link, which is the
    //                 exact failure the pages exist to avoid. Found by
    //                 following a link in a browser that had the app installed.
    //   /api/account  the data export is an <a download>, which is a
    //                 navigation, so it would download the app shell as JSON.
    //   sitemap.xml   fetched by crawlers.
    navigateFallbackDenylist: [/^\/l\//, /^\/api\//, /\.xml$/],
    runtimeCaching: [
      {
        urlPattern: /\/assets\/(fr|es|pt|ja|zh|ru|hi|bn|ar)-[^/]+\.js$/,
        handler: "CacheFirst",
        options: {
          cacheName: "confoundle-locales",
          // Ten languages, and hashed names mean a new entry per deploy.
          expiration: { maxEntries: 30 },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        /*
          THE CONTENT, CACHED ON FIRST USE. This is what keeps an installed app
          working offline after the split: the registry is fetched during the
          first launch, so it is in this cache before anyone can be offline
          with the app installed, and the bank joins it the first time a review
          or a run is opened.

          NO EXPIRATION BY COUNT, unlike the locales above. A reader has one
          registry, not ten, so there is nothing to bound; capping entries
          would only evict across deploys, which is what the hash already
          handles by making the old entry unreachable rather than wrong.
        */
        urlPattern: /\/assets\/(puzzle-content|item-bank)-[^/]+\.js$/,
        handler: "CacheFirst",
        options: {
          cacheName: "confoundle-content",
          cacheableResponse: { statuses: [0, 200] },
        },
      },
    ],
  },
  manifest: {
    name: "Confoundle",
    short_name: "Confoundle",
    description:
      "Spot the hidden variable. A daily reasoning puzzle that fools you, then shows you the trick.",
    theme_color: "#f2ecde",
    background_color: "#f2ecde",
    display: "standalone",
    orientation: "portrait",
    start_url: "/",
    icons: [
      { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Resolved once: reading it twice would run the contact-address validation
  // twice and report the same failure twice.
  const buildVars = singleFile ? null : resolveBuildVars(mode);
  return {
  // Enables the in-app puzzle picker in the single-file demo build only.
  define: { __DEMO__: JSON.stringify(singleFile) },
  // Tailwind is a Vite plugin in v4 rather than a PostCSS plugin, which is why
  // postcss.config.js and autoprefixer are gone: v4 handles vendor prefixing
  // itself. Both build modes need it.
  // The single-file build gets neither plugin on purpose: it is handed to
  // someone as a file, has no origin to be canonical about, and must not phone
  // home to an analytics endpoint from whatever machine opens it.
  plugins: singleFile
    ? [react(), tailwindcss(), viteSingleFile()]
    : [
        react(),
        tailwindcss(),
        pwa,
        lessonPagesPlugin(buildVars!),
        appHeadPlugin(buildVars!),
      ],
  resolve: singleFile
    ? {
        // No PWA plugin in single-file mode: point its virtual module at a stub.
        alias: {
          "virtual:pwa-register": fileURLToPath(
            new URL("./src/app/pwa-stub.ts", import.meta.url),
          ),
        },
      }
    : undefined,
  build: singleFile
    ? {
        outDir: "dist-single",
        assetsInlineLimit: 100_000_000,
        chunkSizeWarningLimit: 100_000,
        cssCodeSplit: false,
        // Emit one IIFE bundle (no ES-module semantics) so the extracted page
        // runs as a classic <script> in any sandbox, however it injects scripts.
        rollupOptions: {
          output: { format: "iife", inlineDynamicImports: true },
        },
      }
    : {
        rollupOptions: {
          output: {
            /*
              PINNED NAMES FOR THE TWO LAZY CHUNKS, so the globs above and the
              runtime-caching rule can match them. Left to itself the bundler
              names a chunk after its entry module, which means renaming
              `all.ts` or `testItems.ts` would rename the chunk, the globs
              would stop matching, and the content would slide back into the
              precache with nothing failing anywhere. That is the same class of
              silent regression `shellSplit.test.ts` exists to catch from the
              other direction.

              This groups modules; it does not make them eager. Both chunks are
              reached only through `import()`, so they stay off the critical
              path.
            */
            manualChunks(id: string) {
              if (
                id.includes("/src/puzzles/data/") ||
                id.endsWith("/src/puzzles/all.ts") ||
                id.endsWith("/src/puzzles/schema.ts")
              )
                return "puzzle-content";
              if (id.endsWith("/src/puzzles/testItems.ts")) return "item-bank";
              return undefined;
            },
          },
        },
      },
  };
});
