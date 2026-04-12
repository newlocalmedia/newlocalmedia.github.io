# SEO Follow-Through — 2026-04-12

## Current technical position

The site currently has a strong technical SEO baseline:

- canonical URLs
- page titles and descriptions
- Open Graph / Twitter metadata
- prerendered homepage content
- generated archive/project pages
- sitemap with `lastmod`
- structured data

## Operational gap

The remaining SEO work is **monitoring and verification**, not markup fundamentals.

This environment does **not** have access to the site's Google Search Console property, so indexing and query performance could not be verified directly here.

## Required follow-through in Search Console

1. Submit or refresh:
   - `https://newlocalmedia.github.io/sitemap.xml`
2. Inspect indexing status for:
   - `/`
   - `/projects/`
   - `/projects/dknauss/wp-sudo/`
   - `/projects/dknauss/wp-security-hardening-guide/`
   - `/projects/dknauss/the-drafting-table/`
3. Review whether Google rewrites:
   - homepage title
   - homepage description
   - top project page titles/descriptions
4. Record first impressions/clicks for priority pages

## On-site follow-up already completed in this repo

- homepage title / OG / Twitter title unified
- long descriptions shortened
- archive descriptions improved
- sitemap `lastmod` added
- homepage prerendered at build time

## Next likely SEO improvements after Search Console review

1. tighten titles/descriptions further if Google rewrites them poorly
2. strengthen archive-page intro copy if impressions remain weak
3. improve internal linking between related security and docs projects
4. monitor whether SVG-based social images behave consistently across crawlers/platforms
