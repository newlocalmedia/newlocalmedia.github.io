import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { CURATED_REPOS, projectPath } from './site-config.mjs';

const root = process.cwd();
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const sitemap = readFileSync(resolve(root, 'sitemap.xml'), 'utf8');

const requiredSnippets = [
  '<title>Work in Progress | New Local Media</title>',
  '<link rel="canonical" href="https://newlocalmedia.github.io/">',
  '<meta name="description" content="Curated open-source projects from New Local Media and Dan Knauss on WordPress security, technical docs, identity, automation, and experiments.">',
  '<meta property="og:title" content="Work in Progress | New Local Media">',
  '<meta name="twitter:title" content="Work in Progress | New Local Media">',
  '<meta property="og:image" content="https://newlocalmedia.github.io/assets/og-image.png">',
  '<meta name="twitter:card" content="summary_large_image">',
  '<script type="application/ld+json">',
  '"@type": "ItemList"',
  '<link rel="manifest" href="site.webmanifest">',
  '<a class="skip-link" href="#main-content">Skip to content</a>',
  '<main id="main-content">'
];

for (const snippet of requiredSnippets) {
  if (!html.includes(snippet)) {
    throw new Error(`Missing required markup: ${snippet}`);
  }
}

const requiredFiles = [
  'assets/og-image.png',
  'assets/icon-512.png',
  'assets/apple-touch-icon.png',
  'assets/favicon-32.png',
  'site.webmanifest',
  'robots.txt',
  'sitemap.xml',
  'scripts/build-project-pages.mjs',
  'scripts/site-config.mjs'
];

for (const rel of requiredFiles) {
  if (!existsSync(resolve(root, rel))) {
    throw new Error(`Missing required file: ${rel}`);
  }
}

for (const fullName of CURATED_REPOS) {
  const rel = `.${projectPath(fullName)}index.html`;
  if (!existsSync(resolve(root, rel))) {
    throw new Error(`Missing generated project page: ${rel}`);
  }
  const projectHtml = readFileSync(resolve(root, rel), 'utf8');
  if (!projectHtml.includes('<script type="application/ld+json">')) {
    throw new Error(`Project page missing JSON-LD: ${rel}`);
  }
  if (!projectHtml.includes('<link rel="canonical" href="https://newlocalmedia.github.io')) {
    throw new Error(`Project page missing canonical: ${rel}`);
  }
  if (!sitemap.includes(`https://newlocalmedia.github.io${projectPath(fullName)}`)) {
    throw new Error(`Sitemap missing project URL: ${fullName}`);
  }
}

if (!sitemap.includes('<lastmod>')) {
  throw new Error('Sitemap missing lastmod entries.');
}

console.log('Site metadata/assets checks passed.');
