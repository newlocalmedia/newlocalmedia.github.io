# WCAG Manual Test Worksheet — 2026-04-12

Use this worksheet to execute the live/manual portion of the accessibility audit.

Related docs:

- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/WCAG-GAP-AUDIT-CHECKLIST.md`
- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/.planning/WCAG-GAP-AUDIT-2026-04-12.md`
- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/.planning/WCAG-REMEDIATION-PLAN-2026-04-12.md`

---

## Environment

- **Date tested:** __________________
- **Tester:** __________________
- **Browser:** __________________
- **Assistive tech:** __________________
- **Viewport / zoom:** __________________
- **Device / OS:** __________________

---

## Test order

1. `/`
2. `/projects/`
3. `/projects/dknauss/`
4. `/projects/dknauss/wp-sudo/`
5. `/projects/dknauss/wp-security-hardening-guide/`
6. `/projects/dknauss/the-drafting-table/`

---

## Page worksheet template

Copy this section once per page.

```md
# Page: __________________

URL: __________________

## Keyboard-only pass

- [ ] Skip link appears on first Tab
- [ ] Skip link moves focus to main content
- [ ] Focus order is logical
- [ ] Focus indicator is visible at every stop
- [ ] All interactive elements are keyboard reachable
- [ ] No keyboard trap encountered
- [ ] Buttons/links activate correctly with keyboard

Notes:

-

## Modal pass (if present)

- [ ] Modal trigger reachable by keyboard
- [ ] Focus moves into modal on open
- [ ] Tab remains trapped inside modal
- [ ] Escape closes modal
- [ ] Focus returns to the original trigger
- [ ] Close button is easy to reach and understand

Notes:

-

## Screen reader pass

- [ ] Landmarks list is sensible
- [ ] Headings list is logical
- [ ] Link names make sense out of context
- [ ] Button names make sense out of context
- [ ] Modal is announced correctly (if present)

Notes:

-

## Zoom / reflow pass

- [ ] 320px width works without horizontal reading scroll
- [ ] 200% zoom works
- [ ] 400% zoom works (where practical)
- [ ] No clipped text
- [ ] No overlapping controls
- [ ] No hidden actions

Notes:

-

## Contrast / distinguishability

- [ ] Body text appears to meet contrast needs
- [ ] Links are distinguishable without color alone
- [ ] Focus indicators are visible enough
- [ ] Pills / controls remain visually distinct

Notes:

-

## Result

- Overall: Pass / Needs fixes / Fail
- Issues found:
  - A11Y-___
  - A11Y-___
```

---

## Shared pattern checks

Run these once, then note affected pages.

### Shared pattern: Header / nav / skip link

- [ ] Works consistently on all tested pages
- Affected pages: __________________
- Notes:
  -

### Shared pattern: Hero action rows

- [ ] Labels are consistent
- [ ] Focus order is sensible
- [ ] Buttons remain usable at narrow widths
- Affected pages: __________________
- Notes:
  -

### Shared pattern: Repository details list

- [ ] Links are underlined/distinguishable
- [ ] Row labels remain understandable
- Affected pages: __________________
- Notes:
  -

### Shared pattern: Docs tables

- [ ] Links are distinguishable
- [ ] Table remains readable on narrow screens
- Affected pages: __________________
- Notes:
  -

### Shared pattern: Image modal

- [ ] Open/close/focus behavior works consistently
- Affected pages: __________________
- Notes:
  -

---

## Issue log

Use one block per issue found.

```md
### A11Y-___

- **URL:** 
- **Pattern:** 
- **WCAG criterion:** 
- **Severity:** P0 / P1 / P2 / P3
- **Steps to reproduce:** 
- **Expected:** 
- **Actual:** 
- **Suggested fix:** 
- **Shared fix candidate?:** yes / no
- **Files likely involved:** 
```

---

## Exit check

- [ ] Keyboard-only pass completed
- [ ] Screen reader pass completed
- [ ] Zoom / reflow completed
- [ ] Contrast check completed
- [ ] Modal behavior verified
- [ ] New issues added to remediation plan if needed
