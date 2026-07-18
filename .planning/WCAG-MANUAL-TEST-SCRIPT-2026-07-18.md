# WCAG 2.2 AA Manual Test Script — 2026-07-18

Use this script to execute **B-004 — Manual WCAG 2.2 AA Verification Pass** in one structured session.

This is the **run order and procedure**.  
The master checklist remains:

- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/WCAG-GAP-AUDIT-CHECKLIST.md`

Related live verification checklist:

- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/.planning/LIVE-POST-DEPLOY-QA-CHECKLIST.md`

---

## Goal

Verify whether the current site can honestly be described as **manually audited for WCAG 2.2 AA gaps** across its core page types and shared interaction patterns.

This is a **gap audit**, not a formal conformance certification.

---

## Session length

Plan for **90–120 minutes**.

If time is short, complete:

1. Home
2. Projects index
3. `wp-sudo`
4. `wp-security-hardening-guide`
5. one modal/gallery page

---

## Browsers / assistive tech

Primary matrix:

- **Chrome** — keyboard-only pass
- **Safari + VoiceOver** — screen reader spot-check
- **Firefox** — secondary keyboard/reflow spot-check if needed

Viewport / zoom matrix:

- **320px width**
- **768px width**
- **1280px width**
- **200% zoom**
- **400% zoom** where practical

---

## Pages to test in this pass

### Core pages

1. `/`
2. `/projects/`
3. `/projects/dknauss/`
4. `/projects/newlocalmedia/`

### Generated project pages

5. `/projects/dknauss/wp-sudo/`
6. `/projects/dknauss/wp-security-hardening-guide/`
7. `/projects/dknauss/wordpress-runbook-template/`
8. `/projects/dknauss/borges-bibliography-builder/`

These cover:

- homepage prerender + shared header
- archive/index templates
- hero buttons
- repo details grid
- docs tables
- modal image/gallery behavior
- split inset / quote / aside patterns

---

## Preflight

Before starting:

- [ ] Confirm latest local build passes: `npm run check`
- [ ] Confirm the page under test is the intended local or live URL
- [ ] Clear stale assumptions caused by cache if something looks inconsistent
- [ ] Open the audit checklist and record results as you go

Recommended tabs:

1. Site page under test
2. `WCAG-GAP-AUDIT-CHECKLIST.md`
3. note-taking doc or issue draft

---

## Failure logging format

Use this format for every failure:

```text
[!] URL:
Component/pattern:
Steps to reproduce:
Expected behavior:
Actual behavior:
WCAG criterion:
Severity: P0 / P1 / P2 / P3
Proposed fix:
```

If something appears fine but still needs a screen reader or zoom pass, mark it as:

```text
[~] Needs manual confirmation
```

---

## Shared test routine for every page

Run this routine on **every** page before moving on.

### A. Landmarks and heading structure

- [ ] Verify there is exactly one visible or structural `h1`
- [ ] Verify heading levels are sensible
- [ ] Verify `main` landmark exists and is unique
- [ ] Verify nav landmarks are understandable and not ambiguous

### B. Keyboard-only pass

Without using the mouse:

1. Press `Tab` from the top of the page
2. Confirm the **skip link appears visibly**
3. Activate it with `Enter`
4. Continue tabbing through all visible interactive elements

Check:

- [ ] focus is always visible
- [ ] focus order is logical
- [ ] no dead-end keyboard traps
- [ ] buttons behave like buttons
- [ ] links behave like links
- [ ] no control depends on hover only

### C. Link and button labeling

- [ ] Link text is meaningful out of context
- [ ] Button text matches purpose
- [ ] Icon-only controls have accessible names
- [ ] Repeated controls use consistent labeling

### D. Responsive / zoom pass

At minimum:

- [ ] 320px width: no clipped text, overlap, or off-screen controls
- [ ] 200% zoom: content still usable
- [ ] 400% zoom: key content reflows without breaking core tasks

### E. Contrast and non-color cues

- [ ] Focus ring remains visible
- [ ] Inline links remain distinguishable
- [ ] Meaning is not conveyed by color alone

---

## Special routine: modal / gallery interactions

Run this on pages with click-to-enlarge images or screenshot galleries.

Pages:

- `/`
- `/projects/dknauss/wp-sudo/`
- `/projects/dknauss/borges-bibliography-builder/`

Test:

1. Tab to the first image trigger
2. Activate it with `Enter` or `Space`
3. Confirm focus moves into the modal
4. Tab through modal controls only
5. Press `Escape` to close
6. Confirm focus returns to the invoking trigger

Check:

- [ ] modal opens from keyboard
- [ ] focus is trapped inside while open
- [ ] Escape closes the modal
- [ ] focus returns correctly
- [ ] enlarged image retains meaningful alt/context

---

## Special routine: docs tables

Run this on:

- `/projects/dknauss/wp-security-hardening-guide/`
- `/projects/dknauss/admin-menu-maestro/` if desired

Check:

- [ ] rows and columns are understandable
- [ ] row headers are announced meaningfully
- [ ] no overflow or clipping at narrow widths
- [ ] links inside tables remain reachable and visible

---

## Special routine: inset / aside / quote treatments

Run this on:

- `/projects/dknauss/wordpress-runbook-template/`
- `/projects/dknauss/wp-security-style-guide/` if desired

Check:

- [ ] reading order remains logical
- [ ] aside content is understandable when linearized
- [ ] decorative treatment does not reduce readability
- [ ] no text overlap at narrow widths or zoom

---

## Page-by-page execution order

## 1. Home `/`

Primary concerns:

- shared header
- top stats row
- feature cards
- image modal
- prerendered content/hydration stability

Run:

- [ ] shared test routine
- [ ] modal routine

Extra checks:

- [ ] top stats read in a sensible order
- [ ] featured project image links are clear
- [ ] hero action rows remain keyboard-usable
- [ ] section headings create a sensible outline

---

## 2. Projects index `/projects/`

Primary concerns:

- owner-card layout
- navigation clarity
- heading structure

Run:

- [ ] shared test routine

Extra checks:

- [ ] owner sections are understandable as grouped lists
- [ ] no ambiguous repeated links

---

## 3. Owner archive `/projects/dknauss/`

Primary concerns:

- dense project list
- description readability
- keyboard scan through many links

Run:

- [ ] shared test routine

Extra checks:

- [ ] list semantics are preserved
- [ ] project descriptions do not collapse into hard-to-track reading order

---

## 4. Owner archive `/projects/newlocalmedia/`

Primary concerns:

- consistency with the dknauss archive
- sparse-content edge case

Run:

- [ ] shared test routine

Extra checks:

- [ ] page still feels complete and understandable with fewer items

---

## 5. Software sample `/projects/dknauss/wp-sudo/`

Primary concerns:

- hero action cluster
- repo details grid
- screenshot gallery modal behavior
- richer content density

Run:

- [ ] shared test routine
- [ ] modal routine

Extra checks:

- [ ] hero buttons announce clear destinations
- [ ] repo details terms/values stay associated at narrow widths
- [ ] no emoji/button-label weirdness in accessible names

---

## 6. Documentation sample `/projects/dknauss/wp-security-hardening-guide/`

Primary concerns:

- docs table behavior
- why-cards / card headers
- visual grouping and reading order

Run:

- [ ] shared test routine
- [ ] docs table routine

Extra checks:

- [ ] card headings stay associated with their body text
- [ ] source/process cards remain understandable at 320px and 400% zoom

---

## 7. Inset/aside sample `/projects/dknauss/wordpress-runbook-template/`

Primary concerns:

- main text + break-glass aside layout
- decorative visual treatment
- reading order at responsive widths

Run:

- [ ] shared test routine
- [ ] inset/aside routine

Extra checks:

- [ ] “break-glass” box does not visually or structurally interrupt reading order
- [ ] code samples remain readable and zoom-safe

---

## 8. Gallery-heavy sample `/projects/dknauss/borges-bibliography-builder/`

Primary concerns:

- large screenshot gallery
- modal repetition
- link/button naming consistency

Run:

- [ ] shared test routine
- [ ] modal routine

Extra checks:

- [ ] repeated screenshot triggers remain understandable in screen reader context
- [ ] gallery captions add useful context instead of duplicating alt text blindly

---

## VoiceOver spot-check routine

Run this on:

- `/`
- `/projects/dknauss/wp-sudo/`
- `/projects/dknauss/wp-security-hardening-guide/`

Steps:

1. Turn on VoiceOver (`Cmd` + `F5`)
2. Open the rotor (`VO` + `U`)
3. Check:
   - headings
   - landmarks
   - links
   - form/button controls where present
4. Navigate forward through major page regions

Confirm:

- [ ] headings form a usable outline
- [ ] landmarks are meaningful
- [ ] buttons and links have understandable names
- [ ] modal behavior is announced sensibly

---

## Exit criteria for the session

This pass is complete when:

- [ ] every target page above has been tested
- [ ] every shared routine has been run where applicable
- [ ] failures are logged with severity and repro steps
- [ ] the master WCAG checklist is updated
- [ ] any obvious follow-up fixes are grouped into a short patch list

---

## Suggested outputs after the session

1. Update:
   - `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/WCAG-GAP-AUDIT-CHECKLIST.md`

2. Add a findings note, for example:
   - `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/.planning/WCAG-MANUAL-FINDINGS-2026-07-18.md`

3. Open a short remediation batch:
   - P0/P1 first
   - then grouped P2 fixes

---

## Fast severity guide

- **P0** — blocks basic navigation or content access
- **P1** — serious barrier, but some workaround exists
- **P2** — moderate issue affecting usability or comprehension
- **P3** — minor inconsistency or polish-level accessibility issue

