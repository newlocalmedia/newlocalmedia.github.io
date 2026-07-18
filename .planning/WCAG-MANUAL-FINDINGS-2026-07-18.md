# WCAG Manual Findings — 2026-07-18

Use this file to record the results of the manual audit run defined in:

- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/.planning/WCAG-MANUAL-TEST-SCRIPT-2026-07-18.md`

And to sync outcomes back into:

- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/WCAG-GAP-AUDIT-CHECKLIST.md`

---

## Audit metadata

- **Date:** 2026-07-18
- **Auditor:** Codex assisted pass
- **Environment:** local
- **Browsers tested:** Codex in-app browser; local headless Chrome via Playwright using the installed Google Chrome binary
- **Assistive tech tested:** none yet
- **Viewport set:** 320, 640, and 1280 in this assisted pass
- **Build checked first:** yes
- **Commit or deploy under review:** local build on 2026-07-18

---

## Executive summary

### Overall status

- [x] Pass with minor issues only
- [ ] Pass with moderate gaps
- [ ] Significant accessibility gaps found
- [x] Incomplete audit session

### Summary notes

Briefly describe:

- the overall state
- the highest-risk patterns
- whether the site can currently be described as manually WCAG-audited

Notes:

```text
Assisted local structural scan completed across the core page set. No obvious
critical structural failures were found in the sampled pages: each scanned page
had one h1, one main landmark, no images missing alt text, no positive tabindex
values, and no unnamed links or buttons in the simple name scan.

One likely moderate issue was identified on the homepage during the initial
scan: repeated generic action labels such as "Learn More" appeared without
project-specific accessible naming. That issue was remediated locally on
2026-07-18 by adding screen-reader-only context to repeated generic action
labels on homepage cards and shared source/action buttons.

During the follow-up assisted keyboard/mobile pass, the wp-sudo image modal
also passed an Escape-close verification with focus restored to the invoking
trigger. Skip-link behavior was confirmed functionally on the homepage: after
activating "Skip to content", the next Tab stop lands inside main content
rather than returning to top navigation. Visible focus indicators were
spot-checked on homepage and project-page controls and appeared clear, high
contrast, and consistently rendered.

Two narrow-width reflow issues were found and fixed locally on 2026-07-18:
homepage section panels were overflowing slightly at 320px due to grid-item
min-width behavior, and project-page breadcrumbs could overflow at 320px on the
hardening guide page because the breadcrumb row did not shrink/wrap. Both now
pass the sampled 320px reflow check on `/`, `/projects/dknauss/wp-sudo/`, and
`/projects/dknauss/wp-security-hardening-guide/`.

An additional automated spot-check pass in local headless Chrome also confirmed
that those same sampled pages pass a 640px-width reflow proxy check with no
horizontal overflow. Approximate contrast checks on sampled homepage and
project-page text/components also passed, including the skip link, hero/body
text, pills, and primary/secondary/demo/download button treatments. Because the
contrast pass used computed colors plus ancestor background approximation rather
than a dedicated browser contrast tool, it should be treated as strong
supporting evidence rather than the final word for every state on every page.

This site can not yet be described as fully manually WCAG-audited. It can be
described only as having completed an assisted structural pass plus targeted
keyboard, focus, modal, sampled reflow, and sampled contrast verification.
```

### Severity totals

- **P0:** 0
- **P1:** 0
- **P2:** 0 open (2 identified and fixed locally during this pass)
- **P3:** 0

---

## Pages covered in this session

- [x] `/`
- [x] `/projects/`
- [x] `/projects/dknauss/`
- [x] `/projects/newlocalmedia/`
- [x] `/projects/dknauss/wp-sudo/`
- [x] `/projects/dknauss/wp-security-hardening-guide/`
- [x] `/projects/dknauss/wordpress-runbook-template/`
- [x] `/projects/dknauss/borges-bibliography-builder/`

---

## Shared patterns covered

- [x] Skip link
- [x] Global header / nav landmarks
- [x] Footer / contentinfo
- [x] Hero button groups
- [x] Repo details grid
- [x] Docs tables
- [x] Quote / aside / inset boxes
- [x] Image modal
- [x] Screenshot galleries
- [x] Focus states
- [x] Responsive reflow

---

## Findings queue

Add one block per finding.

### Finding template

```text
ID: A11Y-001
Severity: P0 / P1 / P2 / P3
URL:
Component/pattern:
WCAG criterion:

Steps to reproduce:
1.
2.
3.

Expected behavior:

Actual behavior:

Impact:

Proposed fix:

Status: open / fixed / deferred
```

---

## Findings

### A11Y-001

- **Severity:** P2
- **URL:** `/`
- **Component/pattern:** repeated homepage card action links labeled “Learn More”
- **WCAG criterion:** WCAG 2.4.4 Link Purpose (In Context); manual confirmation also recommended against 2.4.6 for label clarity

**Steps to reproduce**

1. Open the homepage.
2. Inspect the card action links in the AI-assisted docs section.
3. Note that multiple links share the visible label “Learn More”.

**Expected behavior**

```text
Repeated action links should have sufficiently descriptive visible or accessible
names so that screen reader users navigating by links can distinguish their
destinations without guessing.
```

**Actual behavior**

```text
The initial assisted structural scan found five homepage links with the generic
visible label "Learn More". This may be acceptable in immediate card context
visually, but it was likely too vague when links were reviewed out of context
via a rotor or links list unless additional accessible naming was present.
```

**Impact**

```text
Screen reader users may have difficulty distinguishing repeated card actions
when navigating by links alone, especially on the homepage where several cards
use the same label.
```

**Proposed fix**

```text
Prefer project-specific action labels such as "Learn More about AI-Assisted
Docs" or add screen-reader-only contextual text inside the links so the
accessible names are unique while the visible UI can remain short if desired.
```

**Status:** fixed

**Resolution note**

```text
Implemented locally on 2026-07-18. Shared homepage action-link generators now
append screen-reader-only project context to repeated generic labels such as
"Learn More", "Project", "App", "GitHub", and similar source/homepage actions.
Static build and HTML/SEO checks passed after the change. Full manual
screen-reader confirmation is still recommended in a later pass.
```

---

### A11Y-002

- **Severity:** P2
- **URL:** `/`, `/projects/dknauss/wp-security-hardening-guide/`
- **Component/pattern:** 320px narrow-width overflow in homepage section panels and project-page breadcrumb row
- **WCAG criterion:** WCAG 1.4.10 Reflow

**Steps to reproduce**

1. Load the homepage at 320 CSS pixels wide.
2. Inspect horizontal scroll width and section panel bounds.
3. Load the hardening guide page at 320 CSS pixels wide and inspect the breadcrumb row.

**Expected behavior**

```text
Content should reflow to a single-column mobile layout without requiring
horizontal scrolling, except for content specifically allowed by WCAG 1.4.10.
```

**Actual behavior**

```text
In the initial assisted 320px pass, homepage section panels overflowed the
viewport slightly due to grid-item min-width behavior, producing a page
scrollWidth wider than innerWidth. On the hardening guide page, the breadcrumb
row could also overflow horizontally because it did not shrink/wrap on narrow
viewports.
```

**Impact**

```text
Mobile and high-zoom users could encounter avoidable horizontal scrolling in
sampled views, making reading and navigation more difficult.
```

**Proposed fix**

```text
Allow stacked panel/grid items to shrink with `min-width: 0` on the homepage
layout and permit project-page breadcrumb content to wrap/shrink on narrow
viewports.
```

**Status:** fixed

**Resolution note**

```text
Implemented locally on 2026-07-18. The homepage stack now explicitly allows
grid children to shrink, and the project-page breadcrumb row now wraps and can
shrink within the hero top row. Follow-up 320px checks passed on `/`,
`/projects/dknauss/wp-sudo/`, and
`/projects/dknauss/wp-security-hardening-guide/` with no horizontal overflow.
```

---

## Page-by-page notes

## Home `/`

### Status

- [ ] Pass
- [x] Pass with notes
- [ ] Fail
- [ ] Not completed

### Notes

```text
Structural scan passed: one h1, one main landmark, skip link present, no simple
unnamed controls, no positive tabindex, no missing alt attributes in the scan.
Initial repeated generic homepage action labels were remediated locally with
screen-reader-only contextual text so card actions now expose distinct
accessible names. Skip-link behavior was confirmed functionally, visible focus
was spot-checked successfully, and the homepage now passes the sampled 320px
and 640px reflow checks after a min-width fix. Approximate automated contrast
checks passed on sampled homepage text and button treatments. VoiceOver
link-list quality and true browser zoom checks still need manual confirmation.
```

---

## Projects index `/projects/`

### Status

- [ ] Pass
- [x] Pass with notes
- [ ] Fail
- [ ] Not completed

### Notes

```text
Structural scan passed. One h1, one main landmark, skip link present, no simple
unnamed controls found. Footer/contentinfo and keyboard/focus behavior still
need manual confirmation.
```

---

## Owner archive `/projects/dknauss/`

### Status

- [ ] Pass
- [x] Pass with notes
- [ ] Fail
- [ ] Not completed

### Notes

```text
Structural scan passed. Breadcrumb nav labeled, one h1, one main landmark, skip
link present. Dense link list still needs manual keyboard and screen-reader
navigation confirmation.
```

---

## Owner archive `/projects/newlocalmedia/`

### Status

- [ ] Pass
- [x] Pass with notes
- [ ] Fail
- [ ] Not completed

### Notes

```text
Structural scan passed. Sparse-content archive layout appears structurally
sound, but still needs manual focus/reflow confirmation.
```

---

## `wp-sudo`

URL: `/projects/dknauss/wp-sudo/`

### Status

- [ ] Pass
- [x] Pass with notes
- [ ] Fail
- [ ] Not completed

### Notes

```text
Structural scan passed. Assisted modal test passed via click-open / click-close:
focus moved into the dialog on open and returned to the invoking image-trigger
button on close. Escape-key close behavior still needs explicit manual
confirmation.
```

---

## `wp-security-hardening-guide`

URL: `/projects/dknauss/wp-security-hardening-guide/`

### Status

- [ ] Pass
- [x] Pass with notes
- [ ] Fail
- [ ] Not completed

### Notes

```text
Structural scan passed. Why-card and docs-table regions appear semantically
present. Narrow-width overflow and VoiceOver table comprehension still require
manual verification.
```

---

## `wordpress-runbook-template`

URL: `/projects/dknauss/wordpress-runbook-template/`

### Status

- [ ] Pass
- [x] Pass with notes
- [ ] Fail
- [ ] Not completed

### Notes

```text
Structural scan passed. Break-glass aside pattern still needs manual reading
order and reflow verification.
```

---

## `borges-bibliography-builder`

URL: `/projects/dknauss/borges-bibliography-builder/`

### Status

- [ ] Pass
- [x] Pass with notes
- [ ] Fail
- [ ] Not completed

### Notes

```text
Structural scan passed. Gallery page still needs manual repeated-trigger naming
verification and responsive layout checks.
```

---

## VoiceOver spot-check notes

Record:

- rotor quality
- landmark usefulness
- heading outline quality
- modal behavior
- any naming problems

```text
Not tested yet in this assisted pass.
```

---

## Reflow / zoom notes

Record issues seen at:

- 320px
- 200%
- 400%

```text
Not tested yet in this assisted pass.
```

---

## Checklist sync summary

After the session, note what changed in:

- `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/WCAG-GAP-AUDIT-CHECKLIST.md`

Summary:

```text
Master checklist not yet updated from this file. Wait until a fuller manual pass
is complete so manual-only confirmations and any additional findings can be
recorded together.
```

---

## Recommended remediation batches

### Batch 1 — urgent

List all P0/P1 items to fix first.

```text
None yet.
```

### Batch 2 — moderate

Grouped P2 fixes.

```text
A11Y-R3 likely starts with A11Y-001 (homepage repeated "Learn More" labels).
```

### Batch 3 — minor / polish

Grouped P3 fixes.

```text
None yet.
```

---

## Final disposition

- [ ] Audit complete
- [x] Audit incomplete
- [x] Follow-up patch session required
- [ ] Follow-up live QA required

### Closing note

```text
This file currently reflects an assisted local pass, not a full manual WCAG
verification session. Next work should be: keyboard-only tab order, visible
focus review, Escape-close confirmation for the modal, VoiceOver rotor/landmark
testing, and 320/200%/400% reflow checks.
```
