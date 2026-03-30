import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const html = readFileSync(resolve(root, 'index.html'), 'utf8');

const requiredSnippets = [
  '<link rel="canonical" href="https://newlocalmedia.github.io/">',
  '<meta name="description" content="Work in Progress is a curated showcase of public repositories from New Local Media and Dan Knauss, spanning WordPress security, technical documentation, identity, automation, and experiments.">',
  '<meta property="og:title" content="Work in Progress | New Local Media">',
  '<meta property="og:image" content="https://newlocalmedia.github.io/assets/og-image.png">',
  '<meta name="twitter:card" content="summary_large_image">',
  '<script type="application/ld+json">',
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
  'sitemap.xml'
];

for (const rel of requiredFiles) {
  if (!existsSync(resolve(root, rel))) {
    throw new Error(`Missing required file: ${rel}`);
  }
}

console.log('Site metadata/assets checks passed.');
