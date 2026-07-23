import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { viteSingleFile } from "vite-plugin-singlefile";
import { puzzles } from "./src/puzzles";
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

interface BuildVars {
  /**
   * Where the lesson pages' absolute URLs point. Open Graph will not accept a
   * relative one, so this has to be decided at build time. Override for a fork
   * or a custom domain.
   */
  origin: string;
  /** The privacy page's contact address. Undefined leaves the placeholder. */
  contactEmail: string | undefined;
}

/**
 * The two settings a deployment supplies, read from the shell **and** from a
 * gitignored `.env.local` (already covered by `*.local` in .gitignore).
 *
 * Reading the file matters more than it looks. Vite loads .env files into the
 * app's `import.meta.env`, never into `process.env` for this config, so a
 * build-time variable like these two has to ask for them explicitly. Left to
 * the shell alone, the address has to be retyped on every single deploy, and
 * the one time it is forgotten `pnpm run deploy` publishes a policy whose only
 * contact link is dead, with the warning about it scrolled off the top of a
 * hundred lines of build output. Written down once on the deploying machine, it
 * cannot be forgotten. A real shell variable still wins over the file, which is
 * what a Git-connected Pages build sets from the dashboard.
 */
function buildVars(mode: string): BuildVars {
  const envDir = fileURLToPath(new URL(".", import.meta.url));
  const env = loadEnv(mode, envDir, ["CONTACT_EMAIL", "SITE_ORIGIN"]);
  return {
    origin: (env.SITE_ORIGIN ?? "https://confoundle.pages.dev").replace(/\/$/, ""),
    contactEmail: env.CONTACT_EMAIL?.trim() || undefined,
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
    // anyway: they are 160 standalone documents that no app shell ever needs,
    // and precaching them would put the whole library into every install.
    globIgnores: [
      "**/assets/{fr,es,pt,ja,zh,ru,hi,bn,ar}-*.js",
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
export default defineConfig(({ mode }) => ({
  // Enables the in-app puzzle picker in the single-file demo build only.
  define: { __DEMO__: JSON.stringify(singleFile) },
  plugins: singleFile
    ? [react(), viteSingleFile()]
    : [react(), pwa, lessonPagesPlugin(buildVars(mode))],
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
    : undefined,
}));
