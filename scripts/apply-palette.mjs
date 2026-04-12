// Applies the active palette from palettes.mjs across all HTML files
// and the build script.
//
// Usage: node scripts/apply-palette.mjs
//
// Change ACTIVE_PALETTE in palettes.mjs first, then run this script.

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { globSync } from 'node:fs';
import { ACTIVE_PALETTE, PALETTES } from './palettes.mjs';

const root = resolve(import.meta.dirname, '..');

// ── Detect current palette by reading index.html ────────────────────────────
const indexHtml = readFileSync(resolve(root, 'index.html'), 'utf8');
const currentKey = Object.keys(PALETTES).find(k =>
  indexHtml.includes(`--primary: ${PALETTES[k].vars['--primary']}`)
);

if (currentKey === ACTIVE_PALETTE) {
  console.log(`Already on palette "${ACTIVE_PALETTE}" (${PALETTES[ACTIVE_PALETTE].name}). Nothing to do.`);
  process.exit(0);
}

if (!currentKey) {
  console.error('Could not detect current palette from index.html. Aborting.');
  process.exit(1);
}

const from = PALETTES[currentKey];
const to   = PALETTES[ACTIVE_PALETTE];

console.log(`Switching: ${from.name}  →  ${to.name}`);

// ── Build replacement map ────────────────────────────────────────────────────
function swap(content) {
  // CSS variables
  for (const [prop, toVal] of Object.entries(to.vars)) {
    const fromVal = from.vars[prop];
    content = content.replaceAll(`${prop}: ${fromVal}`, `${prop}: ${toVal}`);
  }

  // Hardcoded hex values derived from variables
  const hexMap = {
    [from.vars['--primary']]:    to.vars['--primary'],
    [from.vars['--background']]: to.vars['--background'],
    [from.vars['--tertiary']]:   to.vars['--tertiary'],
    [from.vars['--foreground']]: to.vars['--foreground'],
    [from.vars['--repo-icon']]:  to.vars['--repo-icon'],
    [from.gradientTop]:          to.gradientTop,
  };
  // --star may differ from --accent (e.g. original palette uses #f2c46d)
  // only add to hexMap if it isn't already covered by another entry
  if (from.vars['--star'] !== from.vars['--accent'] &&
      from.vars['--star'] !== from.vars['--primary']) {
    hexMap[from.vars['--star']] = to.vars['--star'];
  }
  for (const [f, t] of Object.entries(hexMap)) {
    if (f !== t) content = content.replaceAll(f, t);
  }

  // theme-color meta
  content = content.replaceAll(
    `content="${from.themeColor}"`,
    `content="${to.themeColor}"`
  );

  // Inline rgba() — primary, surface, tertiary, modal, accent
  const rgbaPairs = [
    [from.primaryRgb,  to.primaryRgb],
    [from.surfaceRgb,  to.surfaceRgb],
    [from.tertiaryRgb, to.tertiaryRgb],
    [from.modalRgb,    to.modalRgb],
    [from.accentRgb,   to.accentRgb],
  ];
  for (const [f, t] of rgbaPairs) {
    if (f === t) continue;
    // Match with or without spaces after commas
    const pattern = new RegExp(
      `rgba\\(\\s*${f.split(',').map(n => n.trim()).join('\\s*,\\s*')}\\s*,\\s*([0-9.]+)\\s*\\)`,
      'g'
    );
    const [r, g, b] = t.split(',').map(s => s.trim());
    content = content.replace(pattern, (_, a) => `rgba(${r},${g},${b},${a})`);
  }

  return content;
}

// ── Apply across files ───────────────────────────────────────────────────────
const files = [
  ...globSync('**/*.html', { cwd: root, ignore: ['**/palette-preview.html', '**/node_modules/**'] }),
  'scripts/build-project-pages.mjs',
  'assets/styles.css',
].map(f => resolve(root, f));

let updated = 0;
for (const file of files) {
  const before = readFileSync(file, 'utf8');
  const after  = swap(before);
  if (after === before) continue;
  writeFileSync(file, after);
  console.log('  updated:', relative(root, file));
  updated++;
}

console.log(`\nDone. ${updated} file(s) updated. Active palette: ${ACTIVE_PALETTE} — ${to.name}`);
