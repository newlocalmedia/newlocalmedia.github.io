# Backlog

Items here are scoped, not scheduled. Move to a phase plan when ready to act.

---

## B-001 — The Drafting Table: WordPress Playground Blueprint

**What:** Add a `blueprint.json` to the `the-drafting-table` repo that installs the theme via WordPress Playground. Then add a `playground` field to `site-config.mjs` pointing to the hosted blueprint URL.

**Why:** Every other plugin and theme on the site that supports Playground has a Demo button and a "Try it" detail row. The Drafting Table should too.

**Effort:** Small — blueprint authoring (~30 min), one config line.

**Acceptance:**
- `blueprint.json` committed to `the-drafting-table` repo
- `playground` field added to `the-drafting-table` entry in `site-config.mjs`
- Demo button appears in hero meta row on the project page
- "Try it → WordPress Playground" detail row renders correctly

---

## B-002 — AI-Assisted Docs: Process & Workflow Document

**What:** Write a document (to live in or alongside the `ai-assisted-docs` project) capturing learned processes, agent roles, skill file conventions, and editorial workflows for AI-assisted technical writing. This is the practitioner's account — what actually worked, what didn't, how the pipeline evolved.

**Why:** The existing `ai-assisted-docs` project covers methodology and agent roles at an abstract level. A companion document grounded in real project experience would add credibility, be useful to others building similar workflows, and serve as a reference for future projects.

**Possible scope:**
- How skill files are structured and tested
- Model selection heuristics (what goes to Opus vs Sonnet vs Haiku)
- Editorial review pipeline in practice
- Lessons from the WordPress security guide, benchmark, and style guide projects
- What BDD scenario coverage looks like in a docs pipeline

**Effort:** Medium — primarily writing and editing, not engineering.

**Acceptance:**
- Document exists and is coherent as a standalone reference
- Published or linked from the `ai-assisted-docs` project page
- Matches the editorial standards of the other NLM docs

---

## B-003 — WordPress.org Detail Row and Badges

**What:** When repos are listed on WordPress.org (plugins or themes), add a "WordPress.org" detail row to the project page with a link to the listing. Optionally include a WordPress.org badge.

**Why:** WordPress.org presence is a meaningful signal of maturity and discoverability. It belongs in the repo details grid alongside GitHub stars, license, and release.

**When:** Deferred until at least one repo is listed on WordPress.org.

**Effort:** Small — one new `detailItems()` entry in `build-project-pages.mjs`, one new field per applicable repo in `site-config.mjs`.

**Acceptance:**
- `wpOrg` field in `site-config.mjs` (URL to .org listing)
- Detail row renders: "WordPress.org → [plugin/theme name]" linking to the listing
- Only appears when `wpOrg` is set

---

## B-004 — Manual WCAG 2.2 AA Verification Pass

**What:** Run a formal manual accessibility audit across the homepage, archive pages, and all generated project pages using the checklist in `WCAG-GAP-AUDIT-CHECKLIST.md`.

**Why:** The site has had multiple a11y cleanups, but it has not yet been manually verified well enough to claim WCAG conformance. The main remaining risk is real interaction behavior rather than markup structure.

**Scope:**
- Keyboard-only navigation
- Focus order and visible focus states
- Modal open/close/focus return behavior
- Screen reader spot-checks
- 200% and 400% zoom / reflow
- Contrast review

**Effort:** Medium — mostly manual QA plus a small patch pass for anything found.

**Acceptance:**
- Audit results recorded against the checklist
- Pass/fail notes captured for homepage, owner archive pages, projects index, and project pages
- Any high-severity issues either fixed or explicitly deferred with notes
- Site can be described accurately as audited, with known gaps documented

---

## B-005 — Live Post-Deploy QA Checklist

**What:** Create and run a repeatable post-deploy QA pass for the live GitHub Pages site after structural changes.

**Why:** Recent work added homepage prerendering, an external homepage runtime script, sitemap `lastmod`, and broader generator refactors. A lightweight live QA ritual will catch deploy regressions, stale assets, or cache-related surprises earlier.

**Scope:**
- Confirm prerendered homepage cards are present in page source
- Confirm `assets/home.js` loads and hydrates correctly
- Confirm `sitemap.xml` publishes with `lastmod`
- Confirm key project pages render expected hero actions and metadata
- Confirm no GitHub Pages deployment lag/errors for recent pushes

**Effort:** Small.

**Acceptance:**
- QA checklist documented in the repo or runbook notes
- Recent deploy verified against the checklist
- Any recurring deploy/cache issues turned into follow-up backlog items

---

## B-006 — Performance and Core Web Vitals Audit

**What:** Run a focused performance audit on the live site and identify the top fixes for Core Web Vitals, layout stability, and initial load.

**Why:** Technical SEO and maintainability are in much better shape now. The next quality lever is performance, especially on the homepage with prerendered content, image-heavy project pages, and the extracted runtime script.

**Scope:**
- Lighthouse / PageSpeed review
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Interaction / script-loading review
- Image sizing and lazy-loading review

**Effort:** Medium.

**Acceptance:**
- Baseline metrics captured for homepage and top project pages
- Prioritized fix list produced
- Quick wins identified separately from deeper refactors

---

## B-007 — SEO Monitoring and Search Console Follow-Through

**What:** Add the operational follow-through for the recent SEO remediation work.

**Why:** The site now has stronger metadata, prerendered homepage content, improved archive descriptions, and sitemap `lastmod`. The next step is confirming how search engines actually index and rewrite those pages.

**Scope:**
- Refresh or submit sitemap in Google Search Console
- Inspect indexing status for homepage and key project pages
- Review title/description rewrites in search results
- Note which pages begin earning impressions/clicks

**Effort:** Small.

**Acceptance:**
- Search Console review completed
- Findings recorded in a short note or issue
- Any metadata/content changes driven by observed search behavior added to backlog

---

## B-008 — Final Homepage Rendering Consolidation

**What:** Finish reducing duplication between prerendered homepage markup and runtime homepage rendering logic.

**Why:** The site is much easier to maintain than before, but homepage rendering still has two paths: build-time markup generation and client-side refresh rendering. There is still room to reduce template drift and make future edits safer.

**Possible scope:**
- Share more card/action/meta template fragments between generator and runtime
- Move more homepage presentation configuration into `site-config.mjs`
- Document the contract between prerendered markup and client refresh behavior

**Effort:** Medium.

**Acceptance:**
- Reduced duplication in homepage rendering helpers
- Clearer separation between content config and rendering code
- No behavior regressions in prerendered or live-refreshed homepage sections

---

## Roadmap Notes

- The "More Projects!" section title in `index.html` and the `SECTION_META.selected.title` value in `site-config.mjs` are currently out of sync. Aligning them is low priority until WordPress.org work begins and the selected-projects section gets a proper overhaul.
- Near-term roadmap priority order:
  1. B-004 — Manual WCAG 2.2 AA Verification Pass
  2. B-005 — Live Post-Deploy QA Checklist
  3. B-006 — Performance and Core Web Vitals Audit
  4. B-007 — SEO Monitoring and Search Console Follow-Through
  5. B-008 — Final Homepage Rendering Consolidation
