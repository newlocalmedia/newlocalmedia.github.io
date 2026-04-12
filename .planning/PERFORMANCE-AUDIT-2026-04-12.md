# Performance & Core Web Vitals Audit — 2026-04-12

Audit type: **static review with prioritized recommendations**.

Limitation:

- A full Lighthouse / PageSpeed run was not completed from this sandboxed environment.

## What is already helping

- Homepage content is prerendered at build time
- Non-critical images generally use `loading="lazy"`
- Homepage uses preconnect hints for GitHub/avatar sources
- Sitemap and page metadata are in good shape
- Home runtime code is extracted into `/Users/danknauss/Developer/GitHub/newlocalmedia.github.io/assets/home.js`

## Main performance / CWV risks

### PERF-001 — Generated pages inline large duplicated CSS blocks

Every generated project/archive page ships a substantial inline `<style>` block. This improves portability but reduces shared-cache efficiency.

**Impact:** Higher transfer cost and poorer repeat-view caching.

**Priority:** Medium

### PERF-002 — Many preview/screenshot images do not declare intrinsic width/height

The site uses responsive image CSS well, but many generated images still rely on CSS sizing without explicit intrinsic dimensions in markup.

**Impact:** CLS risk and less stable layout reservation.

**Priority:** High

### PERF-003 — Several project preview assets remain PNG-first

Some pages already offer WebP sources, but this is not yet consistent across generated preview media and screenshot galleries.

**Impact:** Heavier image transfer than necessary.

**Priority:** High

### PERF-004 — Raw GitHub-hosted screenshots are used directly for some galleries

This is convenient, but it reduces local control over sizing, formats, caching, and availability.

**Impact:** Less predictable performance and caching.

**Priority:** Medium

## Recommended quick wins

1. Add explicit `width` / `height` where image metadata is known in `site-config.mjs`.
2. Expand WebP generation / `<picture>` usage for project previews and screenshot galleries.
3. Consider moving shared generated-page CSS to a cacheable asset if maintenance tradeoffs are acceptable.
4. Consider local copies or optimized derivatives for the heaviest GitHub-hosted gallery screenshots.

## Recommended measurement follow-up

When a browser-capable or external network-capable environment is available, capture:

- homepage desktop/mobile Lighthouse
- `/projects/dknauss/wp-sudo/`
- `/projects/dknauss/wp-security-hardening-guide/`
- `/projects/dknauss/the-drafting-table/`

Record:

- Performance score
- LCP
- CLS
- INP / Interaction metrics
- top image/script contributors
