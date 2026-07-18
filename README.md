# Work in Progress

[![Site Quality](https://github.com/newlocalmedia/newlocalmedia.github.io/actions/workflows/site-quality.yml/badge.svg)](https://github.com/newlocalmedia/newlocalmedia.github.io/actions/workflows/site-quality.yml) [![Security Policy](https://img.shields.io/badge/security-policy-4c1)](SECURITY.md)
[![Update Repo Data Snapshot](https://github.com/newlocalmedia/newlocalmedia.github.io/actions/workflows/update-repo-data.yml/badge.svg)](https://github.com/newlocalmedia/newlocalmedia.github.io/actions/workflows/update-repo-data.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Live Site](https://img.shields.io/badge/site-live-29ABE0)](https://newlocalmedia.github.io/)

Curated GitHub Pages showcase for our public projects, documentation, experiments, and demos.

## What this repo is

This repository powers the public site at [newlocalmedia.github.io](https://newlocalmedia.github.io/).

The site:

- showcases selected repositories from [`@newlocalmedia`](https://github.com/newlocalmedia) and [`@dknauss`](https://github.com/dknauss).
- rebuilds project detail pages from a GitHub data snapshot.
- publishes a lightweight static site with no framework dependency.
- includes basic quality checks for HTML, metadata, and generated outputs.

## Local testing 

```bash
npm install
npm run check
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

For non-macOS local runs, or when Google Chrome is not available at the default
macOS path, install a Playwright browser once before running the accessibility
smoke checks:

```bash
npx playwright install chromium
```

## Available scripts

```bash
npm run build
npm run check
npm run check:a11y
```

### What they do

- `npm run build` regenerates project pages and the sitemap from `/data/repos.json`
- `npm run check` rebuilds generated files, validates HTML, checks required SEO/site metadata, and runs accessibility smoke checks
- `npm run check:a11y` runs the lightweight accessibility smoke suite (landmarks, link/button names, alt text, modal behavior, and sampled reflow checks)

## Audit docs

- Accessibility gap checklist: [WCAG-GAP-AUDIT-CHECKLIST.md](WCAG-GAP-AUDIT-CHECKLIST.md)
- Accessibility disclosure: [accessibility.txt](accessibility.txt)

## Accessibility and QA

This repo includes a lightweight automated accessibility smoke pass in CI. It
is intentionally narrower than a full manual WCAG audit and is designed to
catch obvious regressions quickly.

Current automated coverage includes:

- sampled landmark and heading checks
- missing `alt` and unnamed control detection
- selected axe-core smoke rules
- image modal Escape-close and focus-restore verification
- sampled 320px and 640px reflow checks on key pages

Manual checks still matter, especially for:

- VoiceOver and rotor navigation
- 200% and 400% zoom behavior
- text-spacing overrides
- broad visual contrast review across all states and pages

## Repository structure

```text
.
├── assets/        Static images, icons, previews, and OG assets
├── data/          Generated repository snapshot data
├── projects/      Generated project detail pages
├── scripts/       Build, validation, and snapshot tooling
├── index.html     Homepage and client-side rendering logic
└── sitemap.xml    Generated sitemap
```

## How content gets updated

Repository data is refreshed by GitHub Actions on a schedule and can also be updated manually.

The workflow:

1. fetches repository data from GitHub
2. writes `/data/repos.json`
3. rebuilds project pages and `/sitemap.xml`
4. commits generated changes when the snapshot changes

## Contributing

Issues and pull requests are welcome for:

- content corrections and improvements
- layout or accessibility improvements
- metadata or SEO corrections and improvements
- automation and build improvements

See [CONTRIBUTING.md](CONTRIBUTING.md) for workflow details.

## Support and security

- General help: [SUPPORT.md](SUPPORT.md)
- Security reports: [SECURITY.md](SECURITY.md)

## License

This repository is available under the [MIT License](LICENSE).
