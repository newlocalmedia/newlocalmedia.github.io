# WCAG Gap Audit Checklist

Formal checklist for auditing this site against **WCAG 2.2 AA**.

This is a **gap audit** document, not a certification. Use it to identify where the site:

- clearly passes
- likely passes but needs manual confirmation
- fails
- is not applicable

---

## Audit scope

Audit these page types at minimum:

- `/`
- `/projects/`
- `/projects/dknauss/`
- `/projects/newlocalmedia/`
- one generated software project page
- one generated documentation project page
- image modal interactions
- responsive layouts at mobile and desktop widths

Recommended browser / AT matrix:

- Safari + VoiceOver
- Chrome + keyboard only
- Firefox + keyboard only

Recommended viewport matrix:

- 320px wide
- 768px wide
- 1280px wide
- 200% zoom
- 400% zoom where practical

---

## Audit result scale

Use one status per item:

- `[ ]` Not yet tested
- `[~]` Needs manual confirmation
- `[x]` Pass
- `[!]` Fail
- `[-]` Not applicable

Severity for failures:

- **P0** blocks core use
- **P1** serious barrier
- **P2** moderate issue
- **P3** minor issue

Record for every failure:

- page URL
- component or pattern
- keyboard steps / reproduction steps
- expected behavior
- actual behavior
- WCAG criterion
- severity
- proposed fix

---

## Current audit note — 2026-07-18

An assisted local pass was completed on **July 18, 2026** and documented in:

- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/.planning/WCAG-MANUAL-FINDINGS-2026-07-18.md`

That pass confirmed a clean structural baseline across the sampled page set and
found one homepage link-label clarity issue, which was fixed locally the same
day. Follow-up assisted passes also verified skip-link behavior, visible focus
spot checks, Escape-close modal behavior, footer presence, sampled 320px/640px
reflow, and approximate contrast checks on key text/button treatments. This
checklist is still intentionally conservative and should not be marked complete
until VoiceOver and true browser-zoom checks are completed manually.

---

## Page inventory

### Core pages

- [x] Home `/`
- [x] Projects index `/projects/`
- [x] Owner index `/projects/dknauss/`
- [x] Owner index `/projects/newlocalmedia/`

### Generated project pages

- [x] Software project sample
- [x] Documentation project sample
- [x] Page with image modal
- [x] Page with docs table
- [x] Page with split inset / quote / aside treatment

---

## 1. Perceivable

### 1.1 Text alternatives

- [x] Informative images have meaningful `alt` text
- [~] Decorative images/icons are hidden from assistive tech
- [x] Linked images describe destination or content
- [x] Modal preview images retain meaningful alt text
- [~] SVG icons used only as decoration have `aria-hidden="true"`

### 1.2 Time-based media

- [-] Audio/video captions required
- [-] Audio description required

### 1.3 Adaptable

- [~] Page structure uses meaningful headings in order
- [x] Each page has exactly one `h1`
- [x] Landmark structure is present and understandable
- [~] Lists are marked up as lists
- [x] Tables are real tables, not div grids
- [x] Docs tables expose row/column relationships to AT
- [~] Reading order remains logical in responsive layouts
- [~] Meaning does not depend only on visual position

### 1.4 Distinguishable

- [~] Text contrast meets AA
- [~] UI component and focus-indicator contrast meets AA
- [~] Color is not the only way meaning is conveyed
- [~] Text can resize to 200% without loss of content/function
- [~] Reflow works at 320 CSS px / 400% zoom
- [~] Hover/focus states remain readable
- [x] Images of text are avoided unless essential
- [ ] Spacing override test passes:
  - line height 1.5
  - paragraph spacing 2x font size
  - letter spacing 0.12em
  - word spacing 0.16em

---

## 2. Operable

### 2.1 Keyboard accessible

- [~] All interactive elements are reachable by keyboard
- [~] No keyboard traps
- [x] Skip link works and is visible on focus
- [~] Modal opens, traps focus, and closes with Escape
- [x] Focus returns to invoking control after closing modal
- [~] No interaction depends on pointer hover only

### 2.2 Enough time

- [-] Time limit extension controls required
- [-] Auto-updating moving content pause controls required

### 2.3 Seizures and physical reactions

- [~] No flashing content above threshold

### 2.4 Navigable

- [~] Page titles are unique and descriptive
- [~] Focus order is logical
- [~] Link text is descriptive out of context
- [x] Repeated navigation can be bypassed
- [~] Headings and labels describe topic/purpose
- [~] Focus is visible everywhere
- [~] Focus is not obscured by sticky or overlay UI

### 2.5 Input modalities

- [~] Click/tap targets are large enough
- [x] Pointer interactions do not require complex gestures
- [x] Controls do not rely on dragging
- [~] Buttons/links have clear visible labels matching accessible names

---

## 3. Understandable

### 3.1 Readable

- [x] Document language is set correctly
- [~] Unusual abbreviations or jargon are explained where needed
- [~] Instructions are clear and concise

### 3.2 Predictable

- [x] Navigation is consistent across pages
- [x] Repeated UI patterns use consistent labels
- [~] Focus does not trigger unexpected context changes
- [~] Controls behave as expected

### 3.3 Input assistance

- [ ] Error messages are clear and associated with the right fields
- [-] Form validation review required
- [-] Critical data submission review required

---

## 4. Robust

### 4.1 Compatible

- [x] HTML validates without critical structural issues
- [~] Interactive controls have correct semantics
- [~] ARIA is valid and not overused
- [~] Accessible names exist for links, buttons, and modal controls
- [ ] Dynamic updates are announced appropriately
- [x] Hidden text uses a screen-reader-safe pattern

---

## Reusable component checklist

Audit these shared patterns once, then spot-check across pages.

### Global layout

- [x] Skip link
- [x] Header / nav landmarks
- [x] Footer landmark
- [x] Main landmark

### Cards and link groups

- [x] Project cards
- [x] Spotlight cards
- [~] Account cards
- [~] Meta pills
- [x] Action buttons / links

### Project page patterns

- [x] Hero action row
- [x] Repository details list
- [x] Documentation table
- [~] Related project list
- [x] Quote / aside / inset box patterns

### Media / dialogs

- [x] Click-to-expand image trigger
- [x] Modal dialog wrapper
- [x] Modal close button
- [~] Focus trap
- [x] Focus restore

---

## Manual test script

### Keyboard-only pass

For each audited page:

1. Load page at top.
2. Press `Tab` from browser chrome into page.
3. Confirm skip link appears and works.
4. Continue tabbing through all interactive elements.
5. Confirm visible focus at every stop.
6. Confirm no dead ends, traps, or skipped controls.
7. Open image modal if present.
8. Confirm:
   - focus moves into dialog
   - Tab stays inside dialog
   - Escape closes dialog
   - focus returns to trigger

### Screen reader pass

For each audited page:

1. Read landmarks list.
2. Read headings list.
3. Confirm heading hierarchy makes sense.
4. Navigate by links and buttons.
5. Confirm labels are understandable out of context.
6. Open modal and confirm:
   - dialog is announced
   - close button is reachable
   - returning focus is sensible

### Zoom / reflow pass

For each audited page:

1. Test at 200% zoom.
2. Test narrow viewport / 320px width.
3. Test 400% zoom on representative pages.
4. Confirm:
   - no horizontal scrolling for normal reading
   - no clipped text
   - no overlapping controls
   - actions remain usable

---

## Audit worksheet template

Copy this block for each issue found.

```md
### Issue ID

- **URL:** 
- **Pattern:** 
- **WCAG criterion:** 
- **Severity:** P0 / P1 / P2 / P3
- **Status:** Fail
- **Steps to reproduce:** 
- **Expected:** 
- **Actual:** 
- **Suggested fix:** 
- **Notes / screenshots:** 
```

---

## Exit criteria for calling the site "WCAG-audited"

Do not call the site fully audited until all are true:

- [ ] representative page types tested
- [ ] keyboard-only pass completed
- [ ] screen-reader pass completed
- [ ] contrast verified
- [ ] reflow / zoom verified
- [ ] modal behavior verified
- [ ] all P0 and P1 issues fixed
- [ ] remaining P2/P3 issues documented and prioritized

---

## Repo note

Local automated checks help, but they do **not** replace this checklist.

Use automated checks for:

- HTML validity
- metadata presence
- build integrity

Use this checklist for:

- manual WCAG gap review
- component-level regression review
- release readiness
