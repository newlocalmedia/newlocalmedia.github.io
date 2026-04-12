# Live Post-Deploy QA Checklist

Use this after structural or presentation changes ship to GitHub Pages.

## Goal

Catch regressions in:

- homepage prerendering
- generated project pages
- shared assets and icons
- sitemap / metadata
- GitHub Pages deployment state

## Required checks

### 1. Deployment health

- [ ] Latest GitHub Pages deploy completed successfully
- [ ] Latest Site Quality workflow passed
- [ ] No stale asset or cache issue is visible on the live site

### 2. Homepage

- [ ] View source shows prerendered homepage content, not just empty shell placeholders
- [ ] Featured repo renders correctly
- [ ] Top stats render correctly
- [ ] Shared header logo looks correct
- [ ] `assets/home.js` loads and hydrates without breaking prerendered content
- [ ] Image modal still opens and closes correctly

### 3. Representative project pages

Check at least:

- `/projects/dknauss/wp-sudo/`
- `/projects/dknauss/wp-security-hardening-guide/`
- `/projects/dknauss/the-drafting-table/`

Verify:

- [ ] hero buttons are present and labeled correctly
- [ ] repository details rows render correctly
- [ ] images and screenshot galleries load
- [ ] docs tables render without overflow
- [ ] recent branding/graphic updates appear live

### 4. Sitemap / metadata

- [ ] `/sitemap.xml` loads
- [ ] `lastmod` values are present
- [ ] homepage title / OG / Twitter title match
- [ ] representative project page metadata still points at intended preview images

### 5. Accessibility smoke pass

- [ ] Skip link appears on focus
- [ ] Focus indicator is visible
- [ ] Modal closes with Escape and returns focus
- [ ] No obviously clipped or overlapping text at mobile width

## Current local baseline

On 2026-04-12, local validation passed:

- `npm run build`
- `html-validate`
- `node scripts/check-site.mjs`

## Notes

- If live output does not match local build, suspect GitHub Pages lag or browser cache first.
- If homepage content looks blank or stale, verify both `data/repos.json` and prerendered `index.html` are up to date.
