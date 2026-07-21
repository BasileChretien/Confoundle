# Project Plan — Confoundle

*An open-source app that teaches people to reason like scientists — by letting them get fooled, then showing them the trick — so that misinformation loses its grip.*

---

## 1. The problem, honestly stated

Misinformation spreads because it is simple, emotional, and identity-affirming. It gives people a "whoa" they can pass along and a story that makes them feel in on something. Careful, true explanations lose this race because they are complex, effortful, and often arrive wearing the jersey of an opposing tribe — which triggers rejection rather than reflection.

You cannot win by being simpler and angrier than the rage-bait; that just makes you its mirror image. The only winnable game is to hand people a **reusable reasoning skill** in a format that is genuinely fun to share, on strictly non-partisan footing. Someone who learns to spot a confounder can apply it to *any* claim — including ones from their own side — which is the difference between education and counter-propaganda.

## 2. What this is (and isn't)

**Is:** a tool that teaches the *reasoning move* (spot the confounder, correlation ≠ causation, base rates, selection bias) through a get-fooled-then-revealed mechanic, engineered from day one to spread on social platforms.

**Isn't:** a fact-checking site, a debunking encyclopedia, or a tool that tells people the correct conclusions. Conclusions are what the tool teaches people to *reach themselves*.

## 3. Design tenets (non-negotiable)

1. **Teach the method, never the conclusion.** The transferable skill is the product. Any specific answer is just the vehicle.
2. **Radical non-partisanship as architecture, not vibe.** The example set is deliberately balanced and includes cases where *every* political side reasons badly — including your own. This earns trust from the audience you most want to reach, and makes it science rather than advocacy.
3. **Discovery over assertion.** "You got fooled — here's how" beats "you're wrong." The user commits to an answer *before* the reveal; the small sting of being caught is the engine.
4. **Rigor is existential.** One sloppy error hands critics the whole project. Every puzzle is airtight and sourced to primary literature. A confidently-wrong puzzle is worse than none.
5. **Separate the viral hook from the depth container.** What spreads is a feed-native clip/card; the app is where the hooked minority go deeper.
6. **Grounded in inoculation theory (prebunking).** Expose people to a weakened form of a manipulation so they recognize it in the wild — the most evidence-backed method for the goal.
7. **Fun is a first-class requirement,** not a coat of paint applied at the end.
8. **Privacy-respecting by design.** For a tool whose whole currency is trust, surveillance is a contradiction. Collect the minimum, never the personal. (See §10.)

## 4. The core mechanic — the heart of the product

Every unit of content is a **puzzle with a reveal**, built in four beats:

1. **The setup** — a chart, stat, or claim that makes a wrong answer feel obvious. ("Cities with more firefighters have more fire damage." "This treatment has a higher success rate overall.")
2. **The commit** — the user picks / predicts. This commitment is what makes the reveal land emotionally. No commit, no sting, no share.
3. **The reveal** — the confounder or mechanism appears, and the intuitive answer flips or dissolves. The strongest reveals are *reversals* (Simpson's paradox) — the hardest possible "whoa."
4. **The lesson** — the named, portable skill ("this is a confounder — a hidden third thing driving both"), plus a "now you'll see it everywhere" that primes real-world transfer.

**Output artifact:** a screenshot-able **result card** — the atomic unit of sharing (see §6 for its two framings).

## 5. Curriculum & scope discipline

Your definition of science is huge (literature, sociology, history). That breadth is a *long-term* strength and a *short-term* trap. Boiling the ocean kills v1.

**v1 spine — causal & statistical reasoning** (your home turf, and the single most transferable anti-misinformation skill): confounding / hidden third variable; correlation ≠ causation; Simpson's paradox (reversal); base rates & the base-rate fallacy; selection / survivorship bias; measurement bias (e.g. arrest data measures *enforcement*, not just behavior); sample size & noise; regression to the mean.

**Later expansions** (each a "world"): source evaluation, sociology & history of ideas, rhetorical manipulation techniques (fake experts, false dilemmas, cherry-picking), literature & interpretation. Add a category only once the v1 loop is proven.

## 6. Distribution & growth — the virality engine

This is a virality-first project, so this section is the strategy, not an afterthought.

**Two-tier sharing:**

- **Tier 1 (mass, default):** one-tap result card. Zero self-exposure, one tap, screenshot-native. The volume engine — keep it the floor for everyone.
- **Tier 2 (evangelist minority, opt-in):** filmed challenges. Higher friction, higher engagement, remixable. **Do not build a camera** — native TikTok/Reels/Shorts tools are better and carry the distribution. Design the reveal clip to be **duet/stitch-native** so the reaction happens on-platform, in the native remix loop, and you never host or moderate a single video.

**Register of the shareable artifact — DECIDED: offer both.** Present two ready-made outputs and let the user pick the one that fits their vibe:

| | Competitive | Self-deprecating |
|---|---|---|
| Framing | "Caught it in 4s — bet you can't" | "lol I completely fell for this" |
| Casts the sharer as | the knower (after solving) | relatable (during the reveal) |
| Rewards | status flex + direct recruitment | honesty + relatability |
| Best for | raw spread | lecture-wary audiences (your target) |

*Critical constraint: offer the choice **at the moment of sharing**, as two one-tap cards side by side — never as an upfront mode-selection. A decision on the critical path is friction, and friction sheds sharers. Default to one, surface the other beside it, and track which spreads better — that's real signal on your audience.*

**Viral levers you may use** (all honesty-compatible): awe, amusement, the counterintuitive *aha* that flips intuition, and social currency (looking smart / winning an argument). **Levers you must leave on the table:** anger and oversimplification — the very engine of what you're fighting.

## 7. Technical architecture

Designed to fit your existing stack (Claude Code CLI, Remotion, fal.ai, GitHub).

- **App shell:** installable **PWA** first (web reach + shareable URLs + "add to home screen"); wrap to native later only if the filmed layer needs deeper OS integration. A PWA keeps every puzzle URL-addressable, which matters enormously for sharing.
- **Puzzles as data:** each puzzle is a **JSON/MDX file** (setup, data, choices, reveal, lesson, provenance source, go-deeper link, difficulty, category, language). Content contributable by non-coders, translatable, independently testable. Engine renders generically; content and code stay separate.
- **Content generation via Remotion** — the standout fit: generate the vertical **reveal clips** and **result cards** programmatically from the same puzzle JSON. One data source → interactive puzzle *and* feed-native video *and* share card, all consistent, all at scale, no hand-editing. A real force-multiplier most similar projects lack.
- **Generative visuals:** fal.ai/Replicate for any novel imagery a puzzle needs.
- **Analytics:** privacy-respecting, self-hostable (Plausible/Umami). Track the funnel, not people (see §10).
- **Backend:** none for v1 (static puzzles + client-side card/clip rendering). Add a thin service only for contribution submission, leaderboards, or register A/B tests.
- **Repo:** GitHub, built with Claude Code. Monorepo: `engine/`, `puzzles/`, `remotion/`, `web/`.

## 8. Content pipeline & governance (where rigor lives)

The tool's credibility is only as strong as its worst puzzle. Treat content like a peer-reviewed pipeline:

1. **Draft** — puzzle authored as JSON with a claimed lesson.
2. **Source** — every factual element cited; no puzzle ships uncited.
3. **Rigor review** — a second reviewer confirms the statistics are correct *and* not oversimplified (the honest answer is often "it's complicated" — multiple confounders, measurement bias — and the puzzle must not swap one tidy false story for another).
4. **Neutrality review** — a check on the *balance of the set*: are charged examples spread across the spectrum, including ones that challenge the contributors' own priors?
5. **Publish** with a public changelog and an easy "report an error" path.

This is your discipline as an ANSM expert and methods peer-reviewer applied to content — a genuine advantage.

**8a. Sources & "go deeper" links.** A link can do two different jobs; keep them separate:

- **Provenance** — the source backing each puzzle's factual claim. Required internally for *every* puzzle, for rigor and defensibility. Lives in the puzzle metadata.
- **Go-deeper** — an optional link for the curious, placed **after the lesson, off the fool→reveal→share path** (a citation inside the reveal kills the emotional beat).

Choose go-deeper links for *learnability*, not just authority: prefer a review, meta-analysis, or strong explainer over a lone primary study; prefer open access; and where the truthful answer is "a body of evidence," say so rather than implying one paper settles it. A tool that teaches people not to over-trust a single study must model that in its own citations — and that discipline is exactly what earns credibility with sceptics.

## 9. Open-source strategy

- **License:** permissive for the engine (MIT/Apache-2.0) to maximize adoption; **CC-BY-SA** for the puzzle content so improvements flow back.
- **Contribution model:** puzzles-as-data lowers the barrier; a clear `CONTRIBUTING.md` with the rigor + neutrality checklist above. A small vetting standard matters far more than raw volume.
- **Governance:** a lightweight editorial standard from day one. An open contribution model with no editorial discipline is how a fact-based tool gets captured and turned partisan. Define who merges, and against what bar.
- **Trilingual reach (FR / JA / EN) as a differentiator.** Almost nothing in this space is strong across all three; your languages plus the JSON-i18n structure make it cheap. A distinctive wedge, not a nice-to-have.

## 10. Privacy & data policy

Untangle "data" into three very different things:

- **Product analytics** — aggregate, cookieless, no personal data (Plausible/Umami). You *need* this to build well and measure the funnel; it is measuring the product, not surveilling users. On-brand and fine.
- **Research data** — the pre/post reasoning tests for the efficacy study (§13). Valuable and publishable, but this is *science*: opt-in, consented, IRB-approved, anonymised. Treat it as a study, not a product feature.
- **Personal / behavioural / ad-tech data** — profiles, individual tracking, anything sellable. **Never.** It contradicts the mission, repels the privacy-wary audience you most want, hands critics a free attack, and drags in GDPR and Japan's APPI.

Data minimalism is the legally and ethically easy path. State **"privacy-respecting by design"** publicly — for a trust tool, it's a differentiator.

## 11. Funding & sustainability

**Principle: decouple survival from monetisation, and never monetise in a way that bends your incentives.** The moment revenue depends on user attention or user data, design quietly drifts toward engagement-maximising and data-hungry — the exact pathology you're fighting. So: **free and un-surveilled for individuals** — reach *is* the mission.

- **No** to behavioural ads (they need the data you won't collect, and would make an anti-manipulation tool run manipulation), content paywalls (gating reach defeats the point), and data sales.
- **Grants** — the best fit and likely your primary funding (media-literacy, open-science, civic-tech, education funders). Your grant experience applies; the efficacy evidence (§13) is the unlock. Fund it like the public good it is.
- **Donations** — a **Buy Me a Coffee** button (or **Open Collective** for a *public ledger*). For a trust tool, *where your money comes from* is itself a credibility asset — "who funds you?" is the first attack every such project faces, and a transparent ledger turns that into a trust signal. Place the ask at a **moment of delight** (after a run of good "aha"s / finishing a set), keep it quiet and rare, and never on the critical path. Treat it as a thermometer, not a budget.
- **Institutional / education licensing** — the cleanest revenue: free for individuals, paid teacher/classroom features (dashboards, curated sets, progress) for schools and NGOs with budget. Same open-core shape you already run with Kusurigilance.

**Sequence:** settle the *principles* now (privacy-first, no ads, no data sales, free for individuals); defer the *mechanism* until you have traction. (Note: if you later wrap a native app, in-app payment buttons hit app-store payment rules — revisit then.)

## 12. Roadmap

| Phase | Goal | Scope | Success signal |
|---|---|---|---|
| **0 — Prototype** | Prove the *aha* fires | 1 playable puzzle (Simpson's-paradox reversal), reveal beat, one share card | Test users audibly react; card looks screenshot-worthy |
| **1 — MVP** | Prove the share loop | ~10 puzzles, commit→reveal→card, PWA, one-tap sharing (both card framings), EN | Organic shares happen unprompted; virality coefficient measurable |
| **2 — Content engine** | Make it grow | Puzzle JSON schema, contribution flow, categories, FR/JA, Remotion card+clip pipeline | External contributors submit vetted puzzles |
| **3 — Filmed layer** | Unlock UGC spread | Duet-native reveal clips, native share handoff | Duet/stitch chains appear in the wild |
| **4 — Scale & breadth** | Beyond causal reasoning | New reasoning "worlds," community, sustainability | Retained users; measurable reach into target audiences |

## 13. Metrics — how you'll know it's working

- **Aha-rate:** % who commit *then* are surprised by the reveal (the emotional beat is the product).
- **Virality coefficient (K-factor):** new users invited per player. Above ~1 = organic growth. The single number that decides whether this spreads.
- **Share funnel:** start → commit → reveal → share, with drop-off at each step.
- **Retention & skill progression:** do people return and climb difficulty?
- **Efficacy (the researcher's metric — and your edge):** does it *actually* improve resistance to misleading claims? Measurable with a pre/post or randomized design — the inoculation-RCT paradigm. It turns the project into a **publishable study**, aligns with your academic goals, and is your strongest funding and credibility argument.

## 14. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Virality vs. nuance pull opposite ways | Only honesty-compatible viral levers (awe, aha, social currency); never anger/oversimplification |
| Becomes the partisan mirror-image | Neutrality-as-architecture; balanced set including self-challenging examples; editorial governance |
| A rigor error discredits everything | Sourced, peer-reviewed content pipeline; public error-reporting; ship slow on facts |
| Filmed-challenge friction → low UGC | One-tap card stays the default; filming is opt-in, never the required path |
| Scope creep (science is huge) | v1 = causal/statistical reasoning only; expand by category, after the loop is proven |
| Video moderation burden | Don't host video; ride native duet/stitch |
| Reaching the target audience at all | Non-partisan framing + discovery mechanic to sidestep identity-protective rejection |
| Funding corrupts incentives | Free & un-surveilled for individuals; fund via grants/donations/institutional, never user attention or data |
| Maintainer burnout / sustainability | Lean, static, solo-buildable MVP; efficacy evidence → grants |

## 15. Team & resources

- **Build:** solo-feasible for MVP with Claude Code; Remotion collapses content-production cost.
- **Content:** the leverage point. Recruit a small vetting circle (methods-literate reviewers, translators) — this is where collaborators matter most, not the code.
- **Funding:** optional for MVP. Once efficacy is shown, media-literacy / open-science / civic-tech funders become realistic.

## 16. Immediate next steps

1. **Build the Phase 0 prototype** — one Simpson's-paradox puzzle end to end (fool → reveal → card) to confirm the *aha* and the card's shareability.
2. **Lock the puzzle JSON schema** — the contract everything else (engine, Remotion templates, i18n, contributions, provenance + go-deeper links) depends on.
3. **Draft 3–5 seed puzzles** across difficulty to stress-test the schema and pipeline.
4. **Finish clearing the name** — Confoundle is chosen; run the domain, app-store, and trademark checks (§17).

## 17. Naming — DECIDED: Confoundle

**Confoundle** — *confounder* × a *Wordle*-style daily puzzle. It signals both the concept (the hidden variable) and the format (a quick daily reveal you share), and as a coined word it's inherently more distinctive — and so more registrable — than any dictionary word.

**Screened so far (positive signals, not proof):**

- No existing product surfaced under the name; search engines don't recognize "confoundle" as a term at all (they redirect to "confounding").
- **Instagram handle confirmed open.**
- Coined form → stronger trademark distinctiveness.

**Still to clear before treating it as fully yours** (these need registrars, not a web screen):

1. **Domain** — .com / .app.
2. **App-store exact match** — iOS App Store + Google Play.
3. **Trademark** — EUIPO, France **INPI**, Japan **JPO**, USPTO — classes **9** (software) and **41** (education/entertainment).

A name is only "free" once those clear; a brief trademark-attorney check before launch is worth it.

**Minor caveat to expect:** because the name sits so close to "confounding," search engines will initially treat "confoundle" as a typo and redirect — a small early-discoverability wrinkle that disappears once the app has any footprint of its own. The tight concept-fit is worth it.

**Alternatives considered and ruled out** (all collide with existing products, several in this exact space; kept here so they aren't re-litigated): Prebunk (generic field term / Google's), Foolproof (van der Linden's book), Spurious (existing iOS app + getspurious.com), Sleight (multiple Steam games), Confoundr (existing R package + bioinformatics app).
