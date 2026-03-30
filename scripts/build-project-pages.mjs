import { mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  CURATED_REPOS,
  PROJECT_META,
  SECTION_META,
  SITE_URL,
  MAIN_SITE_URL,
  SITE_NAME,
  ORGANIZATION_NAME,
  sectionForRepo,
  projectPath,
  projectUrl,
} from './site-config.mjs';

const root = process.cwd();
const dataPath = resolve(root, 'data/repos.json');
const projectsRoot = resolve(root, 'projects');
const ogImageUrl = `${SITE_URL}/assets/og-image.png`;
const iconUrl = `${SITE_URL}/assets/icon-512.png`;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function stripTags(value) {
  return String(value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
  }).format(new Date(value));
}

function repoHomepage(repo) {
  const override = PROJECT_META[repo.full_name]?.extraLinks?.[0]?.url;
  const homepage = override || repo.homepage;
  return homepage && homepage.trim() && homepage.trim() !== repo.html_url ? homepage.trim() : null;
}

function summaryHtml(repo) {
  const override = PROJECT_META[repo.full_name]?.summary;
  return escapeHtml(override || repo.description || 'No description yet.');
}

function descriptionText(repo) {
  return stripTags(summaryHtml(repo));
}

function ownerEntity(repo) {
  if (repo.owner.login === 'newlocalmedia') {
    return {
      '@type': 'Organization',
      '@id': `${MAIN_SITE_URL}#organization`,
      name: ORGANIZATION_NAME,
      url: MAIN_SITE_URL,
      sameAs: ['https://github.com/newlocalmedia']
    };
  }
  return {
    '@type': 'Person',
    '@id': 'https://github.com/dknauss#person',
    name: 'Dan Knauss',
    url: 'https://github.com/dknauss',
    sameAs: ['https://github.com/dknauss']
  };
}

function softwareSchema(repo, pageUrl) {
  const schemaType = PROJECT_META[repo.full_name]?.schemaType || 'SoftwareSourceCode';
  const entity = {
    '@type': schemaType,
    '@id': `${pageUrl}#primary`,
    name: repo.name,
    description: descriptionText(repo),
    url: pageUrl,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    author: { '@id': ownerEntity(repo)['@id'] },
    publisher: { '@id': `${MAIN_SITE_URL}#organization` },
    dateModified: repo.updated_at,
    codeRepository: repo.html_url,
    sameAs: [repo.html_url],
    keywords: [SECTION_META[sectionForRepo(repo.full_name)].title, repo.owner.login, repo.name]
  };

  if (repo.language) {
    entity.programmingLanguage = repo.language;
  }

  const homepage = repoHomepage(repo);
  if (homepage) {
    entity.targetProduct = {
      '@type': 'WebApplication',
      url: homepage,
      name: repo.name
    };
    entity.sameAs.push(homepage);
  }

  if (schemaType === 'TechArticle') {
    delete entity.codeRepository;
    delete entity.programmingLanguage;
    entity.about = ['Technical documentation', 'WordPress'];
  }

  return entity;
}

function narrativeParagraphs(repo, related) {
  const meta = PROJECT_META[repo.full_name] || {};
  const section = SECTION_META[sectionForRepo(repo.full_name)];
  const paragraphs = [
    meta.narrative || section.narrative,
    `${repo.name} is featured here as part of ${section.title.toLowerCase()}. ${descriptionText(repo)}`
  ];
  if (related.length) {
    paragraphs.push(`Related projects in this same part of the collection include ${related.map((item) => item.name).join(', ')}.`);
  }
  return paragraphs;
}

function relatedRepos(fullName, lookup) {
  const section = sectionForRepo(fullName);
  const pool = CURATED_REPOS.filter((name) => name !== fullName && sectionForRepo(name) === section);
  return pool.map((name) => lookup.get(name)).filter(Boolean);
}

function detailItems(repo) {
  const items = [
    ['Owner', `<a href="https://github.com/${encodeURIComponent(repo.owner.login)}">@${escapeHtml(repo.owner.login)}</a>`],
    ['Source', `<a href="${repo.html_url}">${escapeHtml(repo.full_name)}</a>`],
    ['Last updated', `<time datetime="${escapeHtml(repo.updated_at)}">${escapeHtml(formatDate(repo.updated_at))}</time>`],
    ['Stars', escapeHtml(String(repo.stargazers_count))]
  ];
  if (repo.language) {
    items.splice(3, 0, ['Primary language', escapeHtml(repo.language)]);
  }
  const homepage = repoHomepage(repo);
  if (homepage) {
    items.push(['Homepage', `<a href="${homepage}">${escapeHtml(homepage)}</a>`]);
  }
  return items;
}

function renderPage(repo, lookup) {
  const pageUrl = projectUrl(repo.full_name);
  const section = SECTION_META[sectionForRepo(repo.full_name)];
  const meta = PROJECT_META[repo.full_name] || {};
  const homepage = repoHomepage(repo);
  const related = relatedRepos(repo.full_name, lookup);
  const title = `${repo.name} | ${SITE_NAME} | ${ORGANIZATION_NAME}`;
  const description = descriptionText(repo);
  const paragraphs = narrativeParagraphs(repo, related);
  const details = detailItems(repo);
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: SITE_NAME,
        item: `${SITE_URL}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: repo.name,
        item: pageUrl
      }
    ]
  };
  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: [{ '@id': `${pageUrl}#primary` }],
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: ogImageUrl,
      width: 1200,
      height: 630
    }
  };
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${MAIN_SITE_URL}#organization`,
        name: ORGANIZATION_NAME,
        url: MAIN_SITE_URL,
        logo: iconUrl,
        sameAs: ['https://github.com/newlocalmedia']
      },
      {
        '@type': 'Person',
        '@id': 'https://github.com/dknauss#person',
        name: 'Dan Knauss',
        url: 'https://github.com/dknauss',
        sameAs: ['https://github.com/dknauss']
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        publisher: { '@id': `${MAIN_SITE_URL}#organization` }
      },
      breadcrumb,
      webPage,
      softwareSchema(repo, pageUrl)
    ]
  };

  return `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="author" content="${escapeHtml(repo.owner.login === 'newlocalmedia' ? ORGANIZATION_NAME : 'Dan Knauss')}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="color-scheme" content="dark">
  <meta name="theme-color" content="#272938">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <link rel="canonical" href="${pageUrl}">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_US">
  <meta property="og:site_name" content="${escapeHtml(ORGANIZATION_NAME)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${ogImageUrl}">
  <meta property="og:image:secure_url" content="${ogImageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapeHtml(repo.name)} in Work in Progress by New Local Media.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${ogImageUrl}">
  <meta name="twitter:image:alt" content="${escapeHtml(repo.name)} in Work in Progress by New Local Media.">
  <script type="application/ld+json">
${JSON.stringify(graph, null, 2)}
  </script>
  <style>
    :root {
      --primary: #8182ff;
      --secondary: #ffffff;
      --foreground: #c8d2d4;
      --background: #272938;
      --tertiary: #0b121e;
      --surface: rgba(39, 41, 56, 0.88);
      --surface-2: rgba(11, 18, 30, 0.88);
      --line: rgba(255, 255, 255, 0.12);
      --shadow: 0 32px 90px rgba(0, 0, 0, 0.35);
      --radius: 28px;
      --max: 980px;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--secondary);
      background:
        radial-gradient(circle at top left, rgba(129, 130, 255, 0.18), transparent 26%),
        radial-gradient(circle at top right, rgba(255, 255, 255, 0.06), transparent 22%),
        linear-gradient(180deg, #303348 0%, var(--background) 46%, var(--tertiary) 100%);
      line-height: 1.65;
    }
    a { color: inherit; }
    a:focus-visible { outline: 3px solid rgba(129,130,255,0.85); outline-offset: 3px; }
    .skip-link {
      position: absolute; left: 14px; top: -48px; z-index: 1000; padding: 10px 14px; border-radius: 12px;
      background: var(--secondary); color: var(--tertiary); font-weight: 700; text-decoration: none;
    }
    .skip-link:focus { top: 14px; }
    .shell { width: min(calc(100% - 28px), var(--max)); margin: 18px auto 40px; }
    .panel { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); backdrop-filter: blur(12px); }
    .topbar, .hero, .section { padding: 24px; }
    .topbar, .meta, .actions, .section-head, .breadcrumbs { display: flex; gap: 12px; flex-wrap: wrap; }
    .topbar, .section-head { justify-content: space-between; align-items: center; }
    .brand { display: inline-flex; align-items: center; gap: 14px; text-decoration: none; }
    .brand img { width: 56px; height: 56px; border-radius: 18px; background: rgba(255,255,255,0.06); }
    .brand-copy { display: grid; gap: 2px; }
    .eyebrow { font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--foreground); }
    .muted, .lede, .breadcrumbs a, .breadcrumbs span, .section p, .detail-list dt { color: var(--foreground); }
    .stack { display: grid; gap: 18px; margin-top: 18px; }
    .button, .pill { display: inline-flex; align-items: center; min-height: 34px; padding: 0 12px; border-radius: 999px; border: 1px solid var(--line); background: rgba(11,18,30,0.55); text-decoration: none; font-weight: 700; }
    .button.primary { background: rgba(129,130,255,0.18); border-color: rgba(129,130,255,0.35); }
    h1, h2 { margin: 0; letter-spacing: -0.03em; }
    h1 { font-size: clamp(2.4rem, 6vw, 4rem); line-height: 0.98; }
    h2 { font-size: 1.35rem; }
    .lede { margin: 14px 0 0; font-size: 1.05rem; }
    .hero-copy { display: grid; gap: 14px; }
    .meta { margin-top: 18px; }
    .pill { color: var(--foreground); }
    .details-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 18px; }
    .detail-list { display: grid; grid-template-columns: minmax(120px, 160px) 1fr; gap: 8px 12px; margin: 0; }
    .detail-list dt, .detail-list dd { margin: 0; }
    .detail-list a, .section a, .breadcrumbs a { color: var(--primary); text-decoration: none; }
    .detail-list a:hover, .section a:hover, .breadcrumbs a:hover { text-decoration: underline; }
    .related-list { display: grid; gap: 10px; padding-left: 1.2rem; margin: 0; }
    .summary-box { padding: 18px; border: 1px solid var(--line); border-radius: 22px; background: rgba(255,255,255,0.04); }
    .summary-box strong { display: block; margin-bottom: 6px; }
    footer { padding: 12px 4px 0; text-align: center; color: var(--foreground); }
    @media (max-width: 760px) {
      .topbar, .hero, .section { padding: 20px; }
      .details-grid { grid-template-columns: 1fr; }
      .shell { width: min(calc(100% - 18px), var(--max)); }
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div class="shell">
    <header class="panel topbar">
      <a class="brand" href="${MAIN_SITE_URL}">
        <img src="/assets/new-local-media-logo.png" alt="New Local Media logo">
        <span class="brand-copy">
          <span class="eyebrow">New Local Media</span>
          <strong>${escapeHtml(SITE_NAME)}</strong>
          <span class="muted">Open projects, products, and experiments.</span>
        </span>
      </a>
      <div class="actions">
        <a class="button" href="/">Back to collection</a>
        <a class="button primary" href="${repo.html_url}">View on GitHub</a>
        ${homepage ? `<a class="button" href="${homepage}">Visit homepage</a>` : ''}
      </div>
    </header>
    <main id="main-content" class="stack">
      <nav class="panel section breadcrumbs" aria-label="Breadcrumb">
        <a href="/">${escapeHtml(SITE_NAME)}</a>
        <span aria-hidden="true">/</span>
        <span>${escapeHtml(repo.name)}</span>
      </nav>

      <article class="panel hero">
        <div class="hero-copy">
          <div class="eyebrow">${escapeHtml(section.title)}</div>
          <h1>${escapeHtml(repo.name)}</h1>
          <p class="lede">${summaryHtml(repo)}</p>
          <div class="meta">
            <span class="pill">@${escapeHtml(repo.owner.login)}</span>
            ${repo.language ? `<span class="pill">${escapeHtml(repo.language)}</span>` : ''}
            <span class="pill">${escapeHtml(String(repo.stargazers_count))} stars</span>
            <span class="pill">Updated ${escapeHtml(formatDate(repo.updated_at))}</span>
          </div>
        </div>
      </article>

      <section class="panel section" aria-labelledby="why-title">
        <div class="section-head">
          <div>
            <h2 id="why-title">Why this project is here</h2>
          </div>
        </div>
        ${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n        ')}
      </section>

      <section class="panel section" aria-labelledby="details-title">
        <div class="section-head">
          <div>
            <h2 id="details-title">Repository details</h2>
          </div>
        </div>
        <div class="details-grid">
          <dl class="detail-list">
            ${details.map(([term, value]) => `<dt>${escapeHtml(term)}</dt><dd>${value}</dd>`).join('')}
          </dl>
          <div class="summary-box">
            <strong>${escapeHtml(meta.focus || section.title)}</strong>
            <p>${escapeHtml(meta.subfocus || section.description)}</p>
            ${meta.extraLinks?.length ? `<p>${meta.extraLinks.map((link) => `<a href="${link.url}">${escapeHtml(link.label)}</a>`).join(' · ')}</p>` : ''}
          </div>
        </div>
      </section>

      ${related.length ? `
      <section class="panel section" aria-labelledby="related-title">
        <div class="section-head">
          <div>
            <h2 id="related-title">Related projects in this collection</h2>
          </div>
        </div>
        <ul class="related-list">
          ${related.map((item) => `<li><a href="${projectPath(item.full_name)}">${escapeHtml(item.name)}</a> — ${escapeHtml(descriptionText(item))}</li>`).join('')}
        </ul>
      </section>` : ''}
    </main>
    <footer>
      © ${new Date().getFullYear()} <a href="${MAIN_SITE_URL}">${escapeHtml(ORGANIZATION_NAME)}</a>
    </footer>
  </div>
</body>
</html>
`.replace(/[ \t]+$/gm, '').trimEnd() + '\n';
}

function buildSitemap() {
  const urls = [
    `${SITE_URL}/`,
    ...CURATED_REPOS.map((fullName) => projectUrl(fullName))
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url, index) => `  <url>\n    <loc>${url}</loc>\n    <changefreq>${index === 0 ? 'daily' : 'weekly'}</changefreq>\n    <priority>${index === 0 ? '1.0' : '0.8'}</priority>\n  </url>`).join('\n')}
</urlset>
`;
}

const snapshot = JSON.parse(readFileSync(dataPath, 'utf8'));
const lookup = new Map();
for (const account of snapshot.accounts || []) {
  for (const repo of account.repos || []) {
    lookup.set(repo.full_name, repo);
  }
}

rmSync(projectsRoot, { recursive: true, force: true });
mkdirSync(projectsRoot, { recursive: true });

for (const fullName of CURATED_REPOS) {
  const repo = lookup.get(fullName);
  if (!repo) {
    throw new Error(`Missing curated repo in snapshot: ${fullName}`);
  }
  const filepath = resolve(root, `.${projectPath(fullName)}`, 'index.html');
  mkdirSync(dirname(filepath), { recursive: true });
  writeFileSync(filepath, renderPage(repo, lookup));
}

writeFileSync(resolve(root, 'sitemap.xml'), buildSitemap());
console.log(`Built ${CURATED_REPOS.length} project pages and sitemap.`);
