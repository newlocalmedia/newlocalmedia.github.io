# WCAG Gap Audit — 2026-04-12

Audit type: **structured gap audit**, not a certification.

Reference checklist:

- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/WCAG-GAP-AUDIT-CHECKLIST.md`

Reviewed artifacts:

- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/index.html`
- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/projects/index.html`
- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/projects/dknauss/wp-sudo/index.html`
- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/projects/dknauss/wp-security-hardening-guide/index.html`
- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/assets/styles.css`
- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/assets/home.js`
- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/scripts/build-project-pages.mjs`

Method:

- source review of rendered HTML/CSS/JS
- local build and validation (`npm run check`)
- representative component inspection

Known limitation:

- A full live keyboard / screen-reader / zoom pass could not be completed from this sandbox because a local HTTP server and browser automation session could not be started reliably here. Items that require real interaction are marked **Needs manual confirmation**.

## Summary

Current state is **meaningfully improved** and likely close to a solid WCAG 2.2 AA baseline for a static content site, but it is **not ready to claim full WCAG conformance** yet.

### Confirmed strengths

- `lang="en-US"` present on reviewed pages
- skip links exist on home, archive, and project pages
- one `h1` per reviewed page
- landmark structure is present (`header`, `nav`, `main`, `footer`)
- modal markup includes `role="dialog"`, `aria-modal="true"`, label/description, and close control
- modal scripts include focus trap and focus return logic
- hidden helper text uses a safe screen-reader-only pattern
- docs tables use real table markup instead of div grids
- interactive controls generally have visible text labels
- keyboard target sizes appear adequate in code

### Confirmed gap fixed in this pass

#### A11Y-001 — Project-page detail and docs links relied too heavily on color

- **Pattern:** Repository details links and docs-table title links on generated project pages
- **WCAG:** 1.4.1 Use of Color / 1.4.3 Contrast (risk pattern)
- **Severity:** P2
- **Status:** Fixed in this pass
- **Issue:** Generated CSS removed underlines from these links by default, leaving color as the primary distinguisher.
- **Fix:** Restored underline styling for `.detail-list a` and `.docs-table tbody th a` in `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/scripts/build-project-pages.mjs`

## Checklist status

Legend:

- `[x]` pass from source review
- `[~]` needs manual confirmation
- `[!]` fail / gap
- `[-]` not applicable

### Core pages

- [x] Home `/`
- [x] Projects index `/projects/`
- [x] Software project sample `/projects/dknauss/wp-sudo/`
- [x] Documentation project sample `/projects/dknauss/wp-security-hardening-guide/`
- [~] Responsive live behavior at 320px / 200% / 400% zoom
- [~] Modal interaction in a real browser

### 1. Perceivable

- [x] Informative images have alt text in reviewed pages
- [x] Decorative SVG icons are generally hidden with `aria-hidden="true"`
- [x] Modal preview images carry alt text through to the modal image
- [x] Lists are marked up as lists
- [x] Docs tables are real tables
- [~] Reading order remains logical under all responsive states
- [~] Contrast ratios verified with tooling
- [~] Text resize / reflow verified in a browser
- [~] Text spacing override verified in a browser

### 2. Operable

- [x] Skip links are present in generated pages
- [x] Modal code supports Escape close, focus trap, and focus return
- [x] Focus-visible styles are present for links and buttons
- [~] Full keyboard reachability confirmed on live pages
- [~] Focus is never obscured by overlays/sticky UI in practice
- [~] No keyboard traps exist outside the modal flow

### 3. Understandable

- [x] Navigation patterns are structurally consistent across page types
- [x] Page titles are descriptive
- [x] Button/link labels are mostly understandable out of context
- [~] Repeated UI language should be manually checked after recent visual tweaks

### 4. Robust

- [x] `npm run check` passes
- [x] `html-validate` passes
- [x] Modal controls and buttons use correct native elements
- [x] ARIA usage appears restrained and purposeful in reviewed components
- [~] Screen reader announcement behavior should be verified in VoiceOver

## Recommended next actions

1. Run a **real keyboard-only pass** on:
   - `/`
   - `/projects/`
   - `/projects/dknauss/wp-sudo/`
   - `/projects/dknauss/wp-security-hardening-guide/`
2. Run a **VoiceOver pass** for landmarks, headings, modal behavior, and link names.
3. Verify **contrast** with browser tooling or axe/Lighthouse.
4. Verify **200% / 400% zoom and 320px reflow** on representative pages.
5. Record any remaining P1/P2 findings directly into the main checklist.

## Exit status

Status on 2026-04-12:

- **Cannot yet claim fully WCAG-audited**
- **Can claim significant accessibility review and static conformance cleanup completed**
