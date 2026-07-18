import { createReadStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const root = process.cwd();
const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8'
};

const STRUCTURAL_PAGES = [
  { path: '/', label: 'Home' },
  { path: '/projects/', label: 'Projects index' },
  { path: '/projects/dknauss/', label: 'dknauss owner archive' },
  { path: '/projects/newlocalmedia/', label: 'newlocalmedia owner archive' },
  { path: '/projects/dknauss/wp-sudo/', label: 'Sudo project page' },
  { path: '/projects/dknauss/wp-security-hardening-guide/', label: 'Hardening guide project page' }
];

const REFLOW_PAGES = [
  { path: '/', label: 'Home' },
  { path: '/projects/dknauss/wp-sudo/', label: 'Sudo project page' },
  { path: '/projects/dknauss/wp-security-hardening-guide/', label: 'Hardening guide project page' }
];

const AXE_RULES = [
  'button-name',
  'document-title',
  'html-has-lang',
  'image-alt',
  'landmark-one-main',
  'link-name',
  'page-has-heading-one',
  'region'
];

function fail(message) {
  throw new Error(message);
}

function ensureInsideRoot(candidate) {
  const resolved = resolve(candidate);
  if (!resolved.startsWith(root + '/') && resolved !== root) {
    throw new Error(`Refusing to serve path outside root: ${resolved}`);
  }
  return resolved;
}

function staticServer() {
  const server = createServer((req, res) => {
    try {
      const requestUrl = new URL(req.url || '/', 'http://127.0.0.1');
      let pathname = decodeURIComponent(requestUrl.pathname);
      if (pathname.endsWith('/')) pathname += 'index.html';
      if (!extname(pathname)) pathname = `${pathname}/index.html`;
      const filePath = ensureInsideRoot(normalize(join(root, pathname)));
      const type = MIME_TYPES[extname(filePath)] || 'application/octet-stream';
      const stream = createReadStream(filePath);
      stream.on('error', () => {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
        res.end('Not found');
      });
      res.writeHead(200, { 'content-type': type });
      stream.pipe(res);
    } catch (error) {
      res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
      res.end(`Server error: ${error.message}`);
    }
  });

  return new Promise((resolvePromise, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        reject(new Error('Could not determine local server address.'));
        return;
      }
      resolvePromise({
        close: () => new Promise((resolveClose, rejectClose) => server.close((error) => error ? rejectClose(error) : resolveClose())),
        origin: `http://127.0.0.1:${address.port}`
      });
    });
  });
}

async function browserOptions() {
  const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  try {
    await access(macChrome);
    return { headless: true, executablePath: macChrome };
  } catch {
    return { headless: true };
  }
}

function formatViolations(violations) {
  return violations.map((violation) => {
    const nodeTargets = violation.nodes.map((node) => node.target.join(' ')).join(' | ');
    return `${violation.id}: ${violation.help} [${nodeTargets}]`;
  }).join('\n');
}

async function runStructuralSmoke(page, url, label) {
  await page.goto(url, { waitUntil: 'load' });

  const snapshot = await page.evaluate(() => {
    function referencedLabelText(element) {
      const ids = (element.getAttribute('aria-labelledby') || '').split(/\s+/).filter(Boolean);
      return ids.map((id) => document.getElementById(id)?.textContent?.trim() || '').join(' ').trim();
    }

    function imageAltText(element) {
      return [...element.querySelectorAll('img[alt]')].map((img) => img.getAttribute('alt')?.trim() || '').join(' ').trim();
    }

    function accessibleishName(element) {
      return (
        element.getAttribute('aria-label')?.trim()
        || referencedLabelText(element)
        || element.getAttribute('title')?.trim()
        || element.innerText?.trim()
        || element.textContent?.trim()
        || imageAltText(element)
        || ''
      ).trim();
    }

    return {
      footerCount: document.querySelectorAll('footer').length,
      h1Count: document.querySelectorAll('h1').length,
      mainCount: document.querySelectorAll('main').length,
      missingAltCount: [...document.images].filter((img) => !img.hasAttribute('alt')).length,
      positiveTabindexCount: [...document.querySelectorAll('[tabindex]')]
        .filter((element) => Number.parseInt(element.getAttribute('tabindex') || '', 10) > 0)
        .length,
      skipLinkPresent: Boolean(document.querySelector('.skip-link[href="#main-content"]')),
      unnamedButtons: [...document.querySelectorAll('button')]
        .filter((button) => accessibleishName(button).length === 0)
        .length,
      unnamedLinks: [...document.querySelectorAll('a[href]')]
        .filter((link) => accessibleishName(link).length === 0)
        .length
    };
  });

  if (snapshot.h1Count !== 1) fail(`${label}: expected exactly 1 h1, found ${snapshot.h1Count}`);
  if (snapshot.mainCount !== 1) fail(`${label}: expected exactly 1 main landmark, found ${snapshot.mainCount}`);
  if (snapshot.footerCount !== 1) fail(`${label}: expected exactly 1 footer landmark, found ${snapshot.footerCount}`);
  if (!snapshot.skipLinkPresent) fail(`${label}: skip link missing.`);
  if (snapshot.missingAltCount !== 0) fail(`${label}: found ${snapshot.missingAltCount} images missing alt.`);
  if (snapshot.positiveTabindexCount !== 0) fail(`${label}: found ${snapshot.positiveTabindexCount} positive tabindex values.`);
  if (snapshot.unnamedButtons !== 0) fail(`${label}: found ${snapshot.unnamedButtons} unnamed buttons.`);
  if (snapshot.unnamedLinks !== 0) fail(`${label}: found ${snapshot.unnamedLinks} unnamed links.`);

  const axe = await new AxeBuilder({ page })
    .withRules(AXE_RULES)
    .analyze();

  if (axe.violations.length) {
    fail(`${label}: axe smoke violations found.\n${formatViolations(axe.violations)}`);
  }
}

async function runModalSmoke(page, origin) {
  await page.goto(`${origin}/projects/dknauss/wp-sudo/`, { waitUntil: 'load' });
  const trigger = page.locator('.image-trigger').first();
  await trigger.click();
  await page.waitForTimeout(150);
  const openState = await page.evaluate(() => ({
    activeClass: String(document.activeElement?.className || ''),
    hidden: document.getElementById('image-modal')?.hidden,
    modalOpen: document.body.classList.contains('modal-open')
  }));
  if (openState.hidden !== false || !openState.modalOpen) {
    fail('Modal smoke: image modal did not open correctly on wp-sudo.');
  }

  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  const closeState = await page.evaluate(() => ({
    activeClass: String(document.activeElement?.className || ''),
    hidden: document.getElementById('image-modal')?.hidden,
    modalOpen: document.body.classList.contains('modal-open')
  }));
  if (closeState.hidden !== true || closeState.modalOpen) {
    fail('Modal smoke: image modal did not close on Escape.');
  }
  if (closeState.activeClass !== 'image-trigger') {
    fail(`Modal smoke: focus did not restore to trigger (active class: ${closeState.activeClass || 'none'}).`);
  }
}

async function runReflowSmoke(browser, origin) {
  for (const width of [320, 640]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    for (const entry of REFLOW_PAGES) {
      await page.goto(`${origin}${entry.path}`, { waitUntil: 'load' });
      await page.waitForTimeout(100);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      if (overflow) {
        await context.close();
        fail(`${entry.label}: horizontal overflow detected at ${width}px.`);
      }
    }
    await context.close();
  }
}

async function main() {
  const server = await staticServer();
  const browser = await chromium.launch(await browserOptions());
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  try {
    for (const entry of STRUCTURAL_PAGES) {
      await runStructuralSmoke(page, `${server.origin}${entry.path}`, entry.label);
    }
    await runModalSmoke(page, server.origin);
    await runReflowSmoke(browser, server.origin);
    console.log('Accessibility smoke checks passed.');
  } finally {
    await context.close();
    await browser.close();
    await server.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
