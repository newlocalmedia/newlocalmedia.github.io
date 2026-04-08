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

## Roadmap Notes

- The "More Projects!" section title in `index.html` and the `SECTION_META.selected.title` value in `site-config.mjs` are currently out of sync. Aligning them is low priority until WordPress.org work begins and the selected-projects section gets a proper overhaul.
