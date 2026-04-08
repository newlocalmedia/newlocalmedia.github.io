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
const defaultOgImageUrl = `${SITE_URL}/assets/og-image.png`;
const iconUrl = `${SITE_URL}/assets/icon-512.png`;

function ownerPath(owner) {
  return `/projects/${encodeURIComponent(owner)}/`;
}

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
  const htmlOverride = PROJECT_META[repo.full_name]?.summaryHtml;
  if (htmlOverride) return htmlOverride;
  const override = PROJECT_META[repo.full_name]?.summary;
  return escapeHtml(override || repo.description || 'No description yet.');
}

function descriptionText(repo) {
  const plain = PROJECT_META[repo.full_name]?.summary;
  if (plain) return plain;
  return stripTags(summaryHtml(repo));
}

function displayTitle(repo) {
  return PROJECT_META[repo.full_name]?.displayTitle || repo.name;
}

function whyHeading(repo) {
  return PROJECT_META[repo.full_name]?.whyHeading || 'Why This Project Is Here';
}

function inlineCodeHtml(text) {
  return escapeHtml(text).replace(/`([^`]+)`/g, '<code>$1</code>');
}

function imageMimeType(url) {
  if (url.endsWith('.png')) return 'image/png';
  if (url.endsWith('.jpg') || url.endsWith('.jpeg')) return 'image/jpeg';
  if (url.endsWith('.webp')) return 'image/webp';
  if (url.endsWith('.svg')) return 'image/svg+xml';
  return null;
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
  const label = displayTitle(repo);
  const entity = {
    '@type': schemaType,
    '@id': `${pageUrl}#primary`,
    name: label,
    description: descriptionText(repo),
    url: pageUrl,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    author: { '@id': ownerEntity(repo)['@id'] },
    publisher: { '@id': `${MAIN_SITE_URL}#organization` },
    dateModified: repo.updated_at,
    codeRepository: repo.html_url,
    sameAs: [repo.html_url],
    keywords: [SECTION_META[sectionForRepo(repo.full_name)].title, repo.owner.login, label, repo.name]
  };

  if (repo.language) {
    entity.programmingLanguage = repo.language;
  }

  const homepage = repoHomepage(repo);
  if (homepage) {
    entity.targetProduct = {
      '@type': 'WebApplication',
      url: homepage,
      name: label
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
  const label = displayTitle(repo);
  const paragraphs = meta.narrativeHtml?.length
    ? meta.narrativeHtml.map((html) => ({ html }))
    : [{ text: meta.narrative || section.narrative }];
  if (!meta.omitGenericNarrative) {
    paragraphs.push({ text: `${label} is featured here as part of ${section.title.toLowerCase()}. ${descriptionText(repo)}` });
  }
  if (related.length && !meta.omitRelatedNarrative) {
    paragraphs.push({ text: `Related projects in this same part of the collection include ${related.map((item) => displayTitle(item)).join(', ')}.` });
  }
  return paragraphs;
}

function relatedRepos(fullName, lookup) {
  const meta = PROJECT_META[fullName] || {};
  // Explicit relatedProjects array (even empty) overrides section-pool auto-discovery.
  // relatedProjects: [] means "no related section".
  if (meta.relatedProjects !== undefined) {
    if (!meta.relatedProjects.length) return [];
    return meta.relatedProjects
      .map((item) => {
        const repo = lookup.get(item.fullName);
        if (!repo) return null;
        return {
          ...repo,
          relatedLabel: item.label || displayTitle(repo),
          relatedDescription: item.description || descriptionText(repo)
        };
      })
      .filter(Boolean);
  }
  const section = sectionForRepo(fullName);
  const pool = CURATED_REPOS.filter((name) => name !== fullName && sectionForRepo(name) === section);
  return pool
    .map((name) => lookup.get(name))
    .filter(Boolean)
    .map((repo) => ({
      ...repo,
      relatedLabel: displayTitle(repo),
      relatedDescription: descriptionText(repo)
    }));
}

function ownerDisplayName(owner) {
  return owner === 'newlocalmedia' ? ORGANIZATION_NAME : owner;
}

function ownerLink(owner) {
  return ownerPath(owner);
}

function projectPrimaryImage(repo) {
  return PROJECT_META[repo.full_name]?.primaryImage || null;
}

function detailItems(repo) {
  const meta = PROJECT_META[repo.full_name] || {};
  const items = [
    { term: 'Owner', value: `<a href="${ownerLink(repo.owner.login)}">@${escapeHtml(repo.owner.login)}</a>` },
    { term: 'Source', value: `<a href="${repo.html_url}">${escapeHtml(repo.full_name)}</a>` }
  ];

  if (meta.extraLinks?.length) {
    items.push({
      term: 'Apps',
      value: meta.extraLinks.map((link) => `<a href="${link.url}">${escapeHtml(link.label)}</a>`).join(' · ')
    });
  } else {
    const homepage = repoHomepage(repo);
    if (homepage) {
      items.push({ term: 'Homepage', value: `<a href="${homepage}">${escapeHtml(homepage)}</a>` });
    }
  }

  if (meta.version) {
    items.push({ term: 'Version', value: escapeHtml(meta.version) });
  }

  if (meta.release) {
    items.push({
      term: 'Latest release',
      value: meta.release.url
        ? `<a href="${meta.release.url}">${escapeHtml(meta.release.tag)}</a>`
        : escapeHtml(meta.release.tag)
    });
  }

  items.push({ term: 'CI', value: `<a href="${repo.html_url}/actions">GitHub Actions</a>` });

  if (meta.tests) {
    items.push({ term: 'Tests', value: escapeHtml(meta.tests) });
  }

  if (meta.license?.label) {
    items.push({
      term: 'License',
      value: meta.license.url
        ? `<a href="${meta.license.url}">${escapeHtml(meta.license.label)}</a>`
        : escapeHtml(meta.license.label)
    });
  }

  if (meta.playground) {
    items.push({ term: 'Try It! →', value: `<a href="${meta.playground}"><strong>🛝 WordPress Playground</strong></a>`, highlight: true });
  }

  items.push({ term: 'Last updated', value: `<time datetime="${escapeHtml(repo.updated_at)}">${escapeHtml(formatDate(repo.updated_at))}</time>` });

  if (repo.language) {
    items.push({ term: 'Primary language', value: escapeHtml(repo.language) });
  }

  items.push({ term: 'Stars', value: `<span class="star-icon" aria-hidden="true">★</span>${escapeHtml(String(repo.stargazers_count))}` });

  return items;
}

function iconForFormat(label) {
  const icons = {
    PDF:      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>',
    DOCX:     '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/><line x1="9" y1="9" x2="11" y2="9"/></svg>',
    EPUB:     '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    Markdown: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15V9l3 3 3-3v6"/><path d="M17 13l-2 2-2-2"/></svg>',
  };
  const svg = icons[label] || icons.Markdown;
  return `<span class="download-btn-icon">${svg}</span>`;
}

function renderPage(repo, lookup) {
  const pageUrl = projectUrl(repo.full_name);
  const section = SECTION_META[sectionForRepo(repo.full_name)];
  const meta = PROJECT_META[repo.full_name] || {};
  const label = displayTitle(repo);
  const homepage = repoHomepage(repo);
  const related = relatedRepos(repo.full_name, lookup);
  const title = `${label} | ${SITE_NAME}`;
  const description = descriptionText(repo);
  const primaryImage = projectPrimaryImage(repo);
  const ogImageUrl = primaryImage?.url || defaultOgImageUrl;
  const ogImageAlt = primaryImage?.alt || `${label} in Work in Progress by New Local Media.`;
  const ogImageType = imageMimeType(ogImageUrl);
  const ogImageWidth = primaryImage?.width || 1200;
  const ogImageHeight = primaryImage?.height || 630;
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
        name: label,
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
      width: ogImageWidth,
      height: ogImageHeight
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
  <meta name="theme-color" content="#0D1B2A">
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
  ${ogImageType ? `<meta property="og:image:type" content="${ogImageType}">` : ''}
  <meta property="og:image:width" content="${ogImageWidth}">
  <meta property="og:image:height" content="${ogImageHeight}">
  <meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${ogImageUrl}">
  <meta name="twitter:image:alt" content="${escapeHtml(ogImageAlt)}">
  <script type="application/ld+json">
${JSON.stringify(graph, null, 2)}
  </script>
  <style>
    :root {
      --primary: #29ABE0;
      --secondary: #ffffff;
      --foreground: #DCF0F9;
      --background: #0D1B2A;
      --tertiary: #071018;
      --surface: rgba(20, 45, 70, 0.88);
      --surface-2: rgba(13, 27, 42, 0.88);
      --line: rgba(255, 255, 255, 0.12);
      --star: #F5A623;
      --accent: #F5A623;
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
        radial-gradient(circle at top left, rgba(41,171,224,0.18), transparent 26%),
        radial-gradient(circle at top right, rgba(255, 255, 255, 0.06), transparent 22%),
        linear-gradient(180deg, #0F2035 0%, var(--background) 46%, var(--tertiary) 100%);
      line-height: 1.65;
    }
    a { color: inherit; text-underline-offset: 0.16em; text-decoration-thickness: 0.08em; }
    a:focus-visible, button:focus-visible { outline: 3px solid rgba(41,171,224,0.85); outline-offset: 3px; }
    .skip-link {
      position: absolute; left: 14px; top: -48px; z-index: 1000; padding: 10px 14px; border-radius: 12px;
      background: var(--secondary); color: var(--tertiary); font-weight: 700; text-decoration: none;
    }
    .skip-link:focus { top: 14px; }
    .shell { width: min(calc(100% - 28px), var(--max)); margin: 18px auto 40px; }
    .panel { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); backdrop-filter: blur(12px); }
    .topbar, .hero, .section { padding: 24px; }
    .topbar, .meta, .actions, .section-head { display: flex; gap: 12px; flex-wrap: wrap; }
    .topbar, .section-head { justify-content: space-between; align-items: center; }
    .hero-top-row { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
    .breadcrumbs { display: flex; gap: 8px; align-items: center; flex-shrink: 0; font-size: 0.82rem; }
    .brand { display: inline-flex; align-items: center; gap: 14px; text-decoration: none; }
    .brand img { width: 56px; height: 56px; border-radius: 18px; background: rgba(255,255,255,0.06); }
    .brand-copy { display: grid; gap: 2px; }
    .eyebrow { font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--foreground); }
    .muted, .lede, .breadcrumbs a, .breadcrumbs span, .section p, .detail-list dt { color: var(--foreground); }
    .stack { display: grid; gap: 18px; margin-top: 18px; }
    .button, .pill { display: inline-flex; align-items: center; height: 34px; padding: 0 14px; border-radius: 999px; border: 1px solid var(--line); background: rgba(13,27,42,0.55); text-decoration: none; font-weight: 600; white-space: nowrap; line-height: 1; }
    .button.primary { background: rgba(41,171,224,0.18); border-color: rgba(41,171,224,0.35); }
    .button.release-btn { background: rgba(245,166,35,0.14); border-color: rgba(245,166,35,0.40); }
    .button.demo-btn { background: rgba(72,198,150,0.14); border-color: rgba(72,198,150,0.40); }
    .topbar-btn-icon { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; margin-right: 5px; }
    .github-icon { width: 14px; height: 14px; fill: currentColor; flex-shrink: 0; margin-right: 5px; }
    .button-emoji { display: inline-flex; align-items: center; flex-shrink: 0; margin-right: 5px; }
    .repo-icon { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; margin-right: 5px; }
    .meta-sep { width: 1px; height: 22px; background: var(--line); align-self: center; margin: 0 2px; }
    h1, h2 { margin: 0; letter-spacing: -0.03em; }
    h1 { font-size: clamp(2.4rem, 6vw, 4rem); line-height: 0.98; }
    h2 { font-size: 1.35rem; }
    .lede { margin: 14px 0 0; font-size: 1.05rem; }
    .hero-copy { display: grid; gap: 14px; }
    .meta { margin-top: 18px; }
    .pill { color: var(--foreground); }
    .star-icon { color: var(--star); line-height: 1; }
    .details-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 18px; align-items: start; }
    .detail-list { display: grid; grid-template-columns: minmax(120px, 160px) 1fr; gap: 0 12px; margin: 16px 0 0; }
    .detail-list dt, .detail-list dd { margin: 0; padding: 10px 0; border-bottom: 1px solid rgba(7, 16, 24, 0.55); }
    .detail-list dt { font-weight: 700; }
    .detail-list dt.detail-highlight { color: var(--secondary); }
    .detail-list a, .section a, .breadcrumbs a, footer a { color: var(--accent); }
    .section a, footer a { text-decoration: underline; }
    .detail-list a { text-decoration: none; }
    .detail-list a:hover, .detail-list a:focus-visible, .section a:hover, .section a:focus-visible, .breadcrumbs a:hover, .breadcrumbs a:focus-visible, footer a:hover, footer a:focus-visible { color: var(--secondary); text-decoration: underline; }
    .related-list { display: grid; gap: 10px; padding-left: 1.2rem; margin: 0; }
    .summary-box { margin-top: -10px; padding: 18px; border: 1px solid var(--line); border-radius: 22px; background: rgba(255,255,255,0.04); }
    .summary-box-media { margin: 0 0 14px; }
    .image-trigger { display: block; width: 100%; padding: 0; border: 0; background: transparent; cursor: zoom-in; border-radius: 16px; }
    .summary-box-media img, .image-trigger img { display: block; width: 100%; height: auto; border-radius: 16px; border: 1px solid var(--line); background: rgba(13,27,42,0.5); }
    .image-modal[hidden] { display: none; }
    .image-modal { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 28px; background: rgba(6,10,18,0.82); backdrop-filter: blur(10px); }
    .modal-open { overflow: hidden; }
    .image-modal-dialog { position: relative; width: min(1100px, 100%); max-height: calc(100vh - 56px); outline: none; }
    .image-modal-close { position: absolute; top: -14px; right: -14px; width: 42px; height: 42px; border: 0; border-radius: 999px; cursor: pointer; font-size: 1.5rem; line-height: 1; color: var(--secondary); background: rgba(13,27,42,0.92); box-shadow: var(--shadow); }
    .image-modal img { display: block; width: 100%; height: auto; max-height: calc(100vh - 56px); object-fit: contain; border-radius: 18px; border: 1px solid var(--line); background: rgba(13,27,42,0.96); }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
    .summary-box strong { display: block; margin-bottom: 6px; }
    .pull-quote { margin: 22px 0 0; border-left: 3px solid var(--accent); padding-left: 22px; }
    .pull-quote p { margin: 0 0 10px; font-size: 1.1rem; font-style: italic; line-height: 1.7; color: var(--secondary); }
    .pull-quote cite { display: block; font-size: 0.88rem; font-style: normal; color: var(--foreground); }
    .pull-quote--poem p { font-style: normal; line-height: 1.85; font-size: 1.05rem; }
    .download-links { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 6px; }
    .download-btn { gap: 7px; font-size: 0.88rem; }
    .download-btn svg { width: 15px; height: 15px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
    .poem-block { margin-top: 32px; margin-bottom: 10px; display: flex; flex-direction: column; align-items: flex-start; padding-left: 10%; }
    .poem-cite { display: block; font-size: 0.88rem; font-style: normal; color: var(--foreground); margin-top: 12px; }
    .below-details-quote { margin-top: 18px; }
    .inline-example { display: block; margin: 10px 0 6px; padding: 10px 16px; background: rgba(0,0,0,0.22); border-radius: 10px; font-size: 0.94rem; }
    .interior-aside {
      float: right;
      width: min(390px, 100%);
      margin: 4px 0 20px 22px;
      padding: 18px 20px;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--line);
      border-radius: 18px;
    }
    .interior-aside p { margin: 0 0 12px; }
    .interior-aside p:last-child { margin-bottom: 0; }
    .section-copy::after { content: ""; display: block; clear: both; }
    .excerpt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px; }
    .excerpt-card { padding: 18px 20px; background: rgba(255,255,255,0.04); border: 1px solid var(--line); border-radius: 16px; }
    .excerpt-card-heading { font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--primary); margin: 0 0 10px; font-weight: 700; }
    .excerpt-card > p { margin: 0 0 10px; font-size: 0.92rem; }
    .excerpt-card ul { margin: 0; padding-left: 1.1rem; font-size: 0.92rem; line-height: 1.65; }
    .excerpt-card li { margin-bottom: 3px; color: var(--foreground); }
    @media (max-width: 580px) { .excerpt-grid { grid-template-columns: 1fr; } }
    .left-column-quote { margin-top: 24px; padding: 16px 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--line); border-radius: 16px; border-left: none; }
    .panel.hero { border-top: 3px solid var(--primary); }
    .hero .eyebrow { color: var(--primary); }
    .hero-cta-btn { font-size: 0.96rem; padding: 0 18px; }
    .downloads-inset { margin-top: 22px; padding-top: 20px; border-top: 1px solid var(--line); }
    .downloads-heading { margin: 0 0 12px; font-size: 1rem; font-weight: 600; letter-spacing: -0.01em; color: var(--foreground); }
    .download-links a.button { text-decoration: none; }
    .docs-table { width: 100%; border-collapse: collapse; margin-top: 6px; }
    .docs-table td { padding: 8px 12px; vertical-align: top; border-top: 1px solid var(--line); }
    .docs-table td:first-child { white-space: nowrap; padding-right: 20px; }
    .docs-table td:first-child a { color: var(--accent); text-decoration: none; font-weight: 600; }
    .docs-table td:first-child a:hover, .docs-table td:first-child a:focus-visible { color: var(--secondary); text-decoration: underline; }
    .docs-table td:last-child { color: var(--foreground); font-size: 0.93rem; }
    @media (max-width: 580px) { .docs-table tr { display: block; border-top: 1px solid var(--line); padding: 10px 0; } .docs-table td { display: block; padding: 4px 0; border-top: none; } .docs-table td:first-child { white-space: normal; } }
    footer { padding: 12px 4px 0; text-align: center; color: var(--foreground); }
    @media (prefers-contrast: more) {
      :root { --line: rgba(255, 255, 255, 0.28); --foreground: #ffffff; }
      .button, .pill, .summary-box, .panel { border-width: 2px; }
    }
    @media (max-width: 760px) {
      .topbar, .hero, .section { padding: 20px; }
      .details-grid { grid-template-columns: 1fr; }
      .shell { width: min(calc(100% - 18px), var(--max)); }
      .interior-aside {
        float: none;
        width: 100%;
        margin: 18px 0 0;
      }
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div class="shell" id="site-shell">
    <header class="panel topbar">
      <a class="brand" href="${SITE_URL}/">
        <img src="/assets/new-local-media-logo.png" alt="New Local Media logo">
        <span class="brand-copy">
          <span class="eyebrow">New Local Media</span>
          <strong>${escapeHtml(SITE_NAME)}</strong>
          <span class="muted">Open projects, products, and experiments.</span>
        </span>
      </a>
      <nav class="actions" aria-label="Primary links">
        <a class="button primary" href="${MAIN_SITE_URL}">Get in Touch</a>
        <a class="button" href="https://github.com/newlocalmedia"><svg class="github-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg> @newlocalmedia</a>
        <a class="button" href="https://github.com/dknauss"><svg class="github-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg> @dknauss</a>
      </nav>
    </header>
    <main id="main-content" class="stack">
      <article class="panel hero">
        <div class="hero-copy">
          <div class="hero-top-row">
            <div class="eyebrow">${escapeHtml(section.title)}</div>
            <nav class="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">${escapeHtml(SITE_NAME)}</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">${escapeHtml(label)}</span>
            </nav>
          </div>
          <h1>${escapeHtml(meta.pageTitle || label)}</h1>
          <p class="lede">${summaryHtml(repo)}</p>
          <div class="meta">
            <a class="pill" href="${ownerLink(repo.owner.login)}"><svg class="github-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>@${escapeHtml(repo.owner.login)}</a>
            <span class="pill"><span class="star-icon" aria-hidden="true">★</span>${escapeHtml(String(repo.stargazers_count))}</span>
            <span class="pill" title="Last updated ${escapeHtml(formatDate(repo.updated_at))}"><span aria-hidden="true">🔄</span>&nbsp;<span class="sr-only">Last updated </span>${escapeHtml(formatDate(repo.updated_at))}</span>
            <span class="meta-sep" aria-hidden="true"></span>
            <a class="button primary" href="${repo.html_url}"><svg class="github-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>View on GitHub</a>
            ${homepage ? `<a class="button" href="${homepage}">Visit homepage</a>` : ''}
            ${meta.release && !meta.downloadCta ? `<a class="button release-btn" href="${meta.release.url}"><span class="button-emoji" aria-hidden="true">⬇️</span>Download ${escapeHtml(meta.release.tag)}</a>` : ''}
            ${meta.playground ? `<a class="button demo-btn" href="${meta.playground}"><span class="button-emoji" aria-hidden="true">🛝</span>Demo</a>` : ''}
            ${meta.downloadCta ? `<a class="button primary hero-cta-btn" href="#downloads-title">${escapeHtml(meta.downloadCta)}</a>` : ''}
          </div>
        </div>
      </article>

      <section class="panel section" aria-labelledby="why-title">
        <div class="section-head">
          <div>
            <h2 id="why-title">${escapeHtml(whyHeading(repo))}</h2>
          </div>
        </div>
        <div class="section-copy">
        ${meta.whyInsetFirst && meta.whyInsetHtml?.length ? `<aside class="interior-aside">${meta.whyInsetHtml.join('')}</aside>` : ''}
        ${paragraphs.map((paragraph) => `<p>${paragraph.html || inlineCodeHtml(paragraph.text)}</p>`).join('\n        ')}
        ${!meta.whyInsetFirst && meta.whyInsetHtml?.length ? `<aside class="interior-aside">${meta.whyInsetHtml.join('')}</aside>` : ''}
        </div>
        ${meta.docExcerpts?.length ? `<div class="excerpt-grid">${meta.docExcerpts.map((ex) => `<div class="excerpt-card"><h3 class="excerpt-card-heading">${escapeHtml(ex.heading)}</h3>${ex.intro ? `<p>${escapeHtml(ex.intro)}</p>` : ''}${ex.bullets?.length ? `<ul>${ex.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>` : ''}</div>`).join('')}</div>` : ''}
      </section>

      <section class="panel section" aria-labelledby="details-title">
        <div class="section-head">
          <div>
            <h2 id="details-title">Repository Details</h2>
          </div>
        </div>
        <div class="details-grid">
          <div>
            <dl class="detail-list">
              ${details.map((item) => `<dt${item.highlight ? ' class="detail-highlight"' : ''}>${escapeHtml(item.term)}</dt><dd>${item.value}</dd>`).join('')}
            </dl>
            ${meta.quote?.poem ? (() => {
              const q = meta.quote;
              const textHtml = q.html || (q.noMarks ? escapeHtml(q.text) : `\u201C${escapeHtml(q.text)}\u201D`);
              const citeHtml = q.attributionHtml || `\u2014 ${escapeHtml(q.attribution)}`;
              return `<div class="poem-block"><blockquote class="pull-quote pull-quote--poem"><p>${textHtml}</p></blockquote><cite class="poem-cite">${citeHtml}</cite></div>`;
            })() : ''}
            ${meta.quote?.leftColumn ? (() => {
              const q = meta.quote;
              const textHtml = q.html || (q.noMarks ? escapeHtml(q.text) : `\u201C${escapeHtml(q.text)}\u201D`);
              const citeHtml = q.attributionHtml || `\u2014 ${escapeHtml(q.attribution)}`;
              return `<blockquote class="pull-quote left-column-quote"><p>${textHtml}</p><cite>${citeHtml}</cite></blockquote>`;
            })() : ''}
          </div>
          <div class="summary-box">
            ${primaryImage ? `<figure class="summary-box-media"><button class="image-trigger" type="button" data-modal-image="${primaryImage.url}" data-modal-alt="${escapeHtml(primaryImage.alt || `${label} preview image.`)}" aria-label="Open larger image for ${escapeHtml(label)}"><img src="${primaryImage.url}" alt="${escapeHtml(primaryImage.alt || `${label} preview image.`)}" loading="eager" decoding="async"></button></figure>` : ''}
            <strong>${escapeHtml(meta.focus || section.title)}</strong>
            <p>${meta.subfocusHtml || escapeHtml(meta.subfocus || section.description)}</p>
            ${meta.extraLinks?.length && !meta.omitSummaryBoxLinks ? `<p>${meta.extraLinks.map((link) => `<a href="${link.url}">${escapeHtml(link.label)}</a>`).join(' · ')}</p>` : ''}
            ${meta.quote && !meta.quote.poem && !meta.quote.leftColumn && !meta.quote.belowDetails ? (() => {
              const q = meta.quote;
              const textHtml = q.html || (q.noMarks ? escapeHtml(q.text) : `\u201C${escapeHtml(q.text)}\u201D`);
              const citeHtml = q.attributionHtml || `\u2014 ${escapeHtml(q.attribution)}`;
              return `<blockquote class="pull-quote"><p>${textHtml}</p><cite>${citeHtml}</cite></blockquote>`;
            })() : ''}
          </div>
        </div>
        ${meta.quote?.belowDetails ? (() => {
          const q = meta.quote;
          const textHtml = q.html || (q.noMarks ? escapeHtml(q.text) : `\u201C${escapeHtml(q.text)}\u201D`);
          const citeHtml = q.attributionHtml || `\u2014 ${escapeHtml(q.attribution)}`;
          return `<blockquote class="pull-quote below-details-quote"><p>${textHtml}</p><cite>${citeHtml}</cite></blockquote>`;
        })() : ''}
        ${meta.downloads?.length ? `<div class="downloads-inset"><h3 id="downloads-title" class="downloads-heading">Get the Latest Edition</h3><div class="download-links">${meta.downloads.map((d) => { const isPdf = d.label === 'PDF'; const cls = isPdf ? 'button primary download-btn' : 'button download-btn'; const dlabel = ({ PDF: '.pdf', DOCX: '.docx', EPUB: '.epub', Markdown: '.md' }[d.label] || `.${d.label.toLowerCase()}`); const behavior = isPdf ? '' : ' download'; return `<a class="${cls}" href="${d.url}"${behavior}>${iconForFormat(d.label)}${escapeHtml(dlabel)}</a>`; }).join('')}</div></div>` : ''}
      </section>

      ${meta.docs?.length ? `
      <section class="panel section" aria-labelledby="docs-title">
        <div class="section-head"><div><h2 id="docs-title">Documentation</h2></div></div>
        <table class="docs-table">
          <tbody>
            ${meta.docs.map((d) => `<tr><td><a href="${d.url}">${escapeHtml(d.label)}</a></td><td>${escapeHtml(d.description)}</td></tr>`).join('\n            ')}
          </tbody>
        </table>
      </section>` : ''}

      ${related.length ? `
      <section class="panel section" aria-labelledby="related-title">
        <div class="section-head">
          <div>
            <h2 id="related-title">Related Projects in This Collection</h2>
          </div>
        </div>
        <ul class="related-list">
          ${related.map((item) => `<li><a href="${projectPath(item.full_name)}">${escapeHtml(item.relatedLabel || displayTitle(item))}</a> — ${escapeHtml(item.relatedDescription || descriptionText(item))}</li>`).join('')}
        </ul>
      </section>` : ''}
    </main>
    <footer>
      © ${new Date().getFullYear()} <a href="${MAIN_SITE_URL}">${escapeHtml(ORGANIZATION_NAME)}</a>
    </footer>
  </div>
  <div class="image-modal" id="image-modal" hidden>
    <div class="image-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="image-modal-title" aria-describedby="image-modal-description" tabindex="-1">
      <h2 class="sr-only" id="image-modal-title">Expanded image view</h2>
      <p class="sr-only" id="image-modal-description">Press Escape to close this dialog and return to the previous control.</p>
      <button class="image-modal-close" type="button" aria-label="Close image">×</button>
      <img id="image-modal-img" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="">
    </div>
  </div>
  <script>
    (() => {
      const modal = document.getElementById('image-modal');
      const siteShell = document.getElementById('site-shell');
      const dialog = modal?.querySelector('.image-modal-dialog');
      const modalImage = document.getElementById('image-modal-img');
      const closeButton = modal?.querySelector('.image-modal-close');
      if (!modal || !modalImage || !closeButton || !dialog || !siteShell) return;

      let lastTrigger = null;
      const focusableSelector = ['a[href]','button:not([disabled])','input:not([disabled])','select:not([disabled])','textarea:not([disabled])','[tabindex]:not([tabindex="-1"])'].join(',');

      function trapFocus(event) {
        if (event.key !== 'Tab' || modal.hidden) return;
        const focusable = [...dialog.querySelectorAll(focusableSelector)].filter((element) => !element.hidden);
        if (!focusable.length) {
          event.preventDefault();
          dialog.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }

      function closeModal() {
        modal.hidden = true;
        modalImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
        modalImage.alt = '';
        document.body.classList.remove('modal-open');
        siteShell.inert = false;
        siteShell.removeAttribute('aria-hidden');
        document.removeEventListener('keydown', trapFocus);
        lastTrigger?.focus?.();
      }

      document.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-modal-image]');
        if (trigger) {
          lastTrigger = trigger;
          modalImage.src = trigger.getAttribute('data-modal-image') || '';
          modalImage.alt = trigger.getAttribute('data-modal-alt') || '';
          modal.hidden = false;
          document.body.classList.add('modal-open');
          siteShell.inert = true;
          siteShell.setAttribute('aria-hidden', 'true');
          document.addEventListener('keydown', trapFocus);
          dialog.focus();
          return;
        }

        if (event.target === modal || event.target === closeButton) {
          closeModal();
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.hidden) {
          closeModal();
        }
      });
    })();
  </script>
</body>
</html>
`.replace(/[ \t]+$/gm, '').trimEnd() + '\n';
}

function renderOwnerPage(owner, repos) {
  const pageUrl = `${SITE_URL}${ownerPath(owner)}`;
  const ownerLabel = ownerDisplayName(owner);
  const title = `${ownerLabel} projects | ${SITE_NAME}`;
  const description = `Projects in this collection from ${ownerLabel}.`;
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
        name: ownerLabel,
        item: pageUrl
      }
    ]
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
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        publisher: { '@id': `${MAIN_SITE_URL}#organization` }
      },
      breadcrumb,
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: defaultOgImageUrl,
          width: 1200,
          height: 630
        }
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="author" content="${escapeHtml(ownerLabel)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="color-scheme" content="dark">
  <meta name="theme-color" content="#0D1B2A">
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
  <meta property="og:image" content="${defaultOgImageUrl}">
  <meta property="og:image:secure_url" content="${defaultOgImageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapeHtml(ownerLabel)} projects in Work in Progress by New Local Media.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${defaultOgImageUrl}">
  <meta name="twitter:image:alt" content="${escapeHtml(ownerLabel)} projects in Work in Progress by New Local Media.">
  <script type="application/ld+json">
${JSON.stringify(graph, null, 2)}
  </script>
  <style>
    :root {
      --primary: #29ABE0;
      --secondary: #ffffff;
      --foreground: #DCF0F9;
      --background: #0D1B2A;
      --tertiary: #071018;
      --surface: rgba(20, 45, 70, 0.88);
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
        radial-gradient(circle at top left, rgba(41,171,224,0.18), transparent 26%),
        radial-gradient(circle at top right, rgba(255, 255, 255, 0.06), transparent 22%),
        linear-gradient(180deg, #0F2035 0%, var(--background) 46%, var(--tertiary) 100%);
      line-height: 1.65;
    }
    a { color: inherit; text-underline-offset: 0.16em; text-decoration-thickness: 0.08em; }
    a:focus-visible { outline: 3px solid rgba(41,171,224,0.85); outline-offset: 3px; }
    .skip-link { position: absolute; left: 14px; top: -48px; z-index: 1000; padding: 10px 14px; border-radius: 12px; background: var(--secondary); color: var(--tertiary); font-weight: 700; text-decoration: none; }
    .skip-link:focus { top: 14px; }
    .shell { width: min(calc(100% - 28px), var(--max)); margin: 18px auto 40px; }
    .panel { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); backdrop-filter: blur(12px); }
    .topbar, .hero, .section { padding: 24px; }
    .topbar, .breadcrumbs { display: flex; gap: 12px; flex-wrap: wrap; }
    .topbar { justify-content: space-between; align-items: center; }
    .brand { display: inline-flex; align-items: center; gap: 14px; text-decoration: none; }
    .brand img { width: 56px; height: 56px; border-radius: 18px; background: rgba(255,255,255,0.06); }
    .brand-copy { display: grid; gap: 2px; }
    .eyebrow { font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--foreground); }
    .muted, .breadcrumbs a, .breadcrumbs span, .lede { color: var(--foreground); }
    .stack { display: grid; gap: 18px; margin-top: 18px; }
    .button { display: inline-flex; align-items: center; min-height: 34px; padding: 0 12px; border-radius: 999px; border: 1px solid var(--line); background: rgba(13,27,42,0.55); text-decoration: none; font-weight: 700; }
    h1, h2 { margin: 0; letter-spacing: -0.03em; }
    h1 { font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.02; }
    h2 { font-size: 1.35rem; }
    .lede { margin: 14px 0 0; font-size: 1.05rem; }
    .owner-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 14px; }
    .owner-list li { padding: 18px; border: 1px solid var(--line); border-radius: 22px; background: rgba(255,255,255,0.04); }
    .owner-list a, footer a, .breadcrumbs a { color: var(--accent); }
    .owner-list a, footer a { text-decoration: underline; font-weight: 700; }
    .owner-list a:hover, .owner-list a:focus-visible, .breadcrumbs a:hover, .breadcrumbs a:focus-visible, footer a:hover, footer a:focus-visible { color: var(--secondary); text-decoration: underline; }
    .repo-meta { margin-top: 8px; color: var(--foreground); font-size: 0.95rem; }
    footer { padding: 12px 4px 0; text-align: center; color: var(--foreground); }
    @media (prefers-contrast: more) {
      :root { --line: rgba(255, 255, 255, 0.28); --foreground: #ffffff; }
      .button, .owner-list li, .panel { border-width: 2px; }
    }
    @media (max-width: 760px) {
      .topbar, .hero, .section { padding: 20px; }
      .shell { width: min(calc(100% - 18px), var(--max)); }
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div class="shell">
    <header class="panel topbar">
      <a class="brand" href="${SITE_URL}/">
        <img src="/assets/new-local-media-logo.png" alt="New Local Media logo">
        <span class="brand-copy">
          <span class="eyebrow">New Local Media</span>
          <strong>${escapeHtml(SITE_NAME)}</strong>
          <span class="muted">Open projects, products, and experiments.</span>
        </span>
      </a>
      <div>
        <a class="button" href="/">Back to collection</a>
      </div>
    </header>
    <main id="main-content" class="stack">
      <nav class="panel section breadcrumbs" aria-label="Breadcrumb">
        <a href="/">${escapeHtml(SITE_NAME)}</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">${escapeHtml(ownerLabel)}</span>
      </nav>

      <section class="panel hero">
        <div class="eyebrow">Owner projects</div>
        <h1>${escapeHtml(ownerLabel)}</h1>
        <p class="lede">A small project list for ${escapeHtml(ownerLabel)} in this collection.</p>
      </section>

      <section class="panel section" aria-labelledby="owner-projects-title">
        <h2 id="owner-projects-title">Projects</h2>
        <ul class="owner-list">
          ${repos.map((repo) => `<li><a href="${projectPath(repo.full_name)}">${escapeHtml(displayTitle(repo))}</a><div class="repo-meta">${escapeHtml(descriptionText(repo))}</div></li>`).join('')}
        </ul>
      </section>
    </main>
    <footer>
      © ${new Date().getFullYear()} <a href="${MAIN_SITE_URL}">${escapeHtml(ORGANIZATION_NAME)}</a>
    </footer>
  </div>
</body>
</html>
`.replace(/[ \t]+$/gm, '').trimEnd() + '\n';
}

function renderProjectsIndex(reposByOwner) {
  const pageUrl = `${SITE_URL}/projects/`;
  const title = `Projects | ${SITE_NAME}`;
  const description = 'Browse owner groups and project pages in the Work in Progress collection.';
  const owners = [...reposByOwner.entries()].sort(([a], [b]) => a.localeCompare(b));
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
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        publisher: { '@id': `${MAIN_SITE_URL}#organization` }
      },
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: defaultOgImageUrl,
          width: 1200,
          height: 630
        }
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="author" content="${escapeHtml(ORGANIZATION_NAME)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="color-scheme" content="dark">
  <meta name="theme-color" content="#0D1B2A">
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
  <meta property="og:image" content="${defaultOgImageUrl}">
  <meta property="og:image:secure_url" content="${defaultOgImageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Projects in Work in Progress by New Local Media.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${defaultOgImageUrl}">
  <meta name="twitter:image:alt" content="Projects in Work in Progress by New Local Media.">
  <script type="application/ld+json">
${JSON.stringify(graph, null, 2)}
  </script>
  <style>
    :root {
      --primary: #29ABE0;
      --secondary: #ffffff;
      --foreground: #DCF0F9;
      --background: #0D1B2A;
      --tertiary: #071018;
      --surface: rgba(20, 45, 70, 0.88);
      --line: rgba(255, 255, 255, 0.12);
      --shadow: 0 32px 90px rgba(0, 0, 0, 0.35);
      --radius: 28px;
      --max: 980px;
    }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: var(--secondary); background: radial-gradient(circle at top left, rgba(41,171,224,0.18), transparent 26%), radial-gradient(circle at top right, rgba(255, 255, 255, 0.06), transparent 22%), linear-gradient(180deg, #0F2035 0%, var(--background) 46%, var(--tertiary) 100%); line-height: 1.65; }
    a { color: inherit; text-underline-offset: 0.16em; text-decoration-thickness: 0.08em; }
    a:focus-visible { outline: 3px solid rgba(41,171,224,0.85); outline-offset: 3px; }
    .skip-link { position: absolute; left: 14px; top: -48px; z-index: 1000; padding: 10px 14px; border-radius: 12px; background: var(--secondary); color: var(--tertiary); font-weight: 700; text-decoration: none; }
    .skip-link:focus { top: 14px; }
    .shell { width: min(calc(100% - 28px), var(--max)); margin: 18px auto 40px; }
    .panel { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); backdrop-filter: blur(12px); }
    .topbar, .hero, .section { padding: 24px; }
    .topbar { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
    .brand { display: inline-flex; align-items: center; gap: 14px; text-decoration: none; }
    .brand img { width: 56px; height: 56px; border-radius: 18px; background: rgba(255,255,255,0.06); }
    .brand-copy { display: grid; gap: 2px; }
    .eyebrow { font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--foreground); }
    .muted, .lede { color: var(--foreground); }
    .stack { display: grid; gap: 18px; margin-top: 18px; }
    .button { display: inline-flex; align-items: center; min-height: 34px; padding: 0 12px; border-radius: 999px; border: 1px solid var(--line); background: rgba(13,27,42,0.55); text-decoration: none; font-weight: 700; }
    h1, h2 { margin: 0; letter-spacing: -0.03em; }
    h1 { font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.02; }
    h2 { font-size: 1.35rem; }
    .lede { margin: 14px 0 0; font-size: 1.05rem; }
    .owner-groups { display: grid; gap: 18px; }
    .owner-card { padding: 18px; border: 1px solid var(--line); border-radius: 22px; background: rgba(255,255,255,0.04); }
    .owner-card a, footer a { color: var(--accent); text-decoration: underline; font-weight: 700; }
    .owner-card a:hover, .owner-card a:focus-visible, footer a:hover, footer a:focus-visible { color: var(--secondary); text-decoration: underline; }
    .owner-card ul { margin: 10px 0 0; padding-left: 1.2rem; color: var(--foreground); }
    footer { padding: 12px 4px 0; text-align: center; color: var(--foreground); }
    @media (prefers-contrast: more) {
      :root { --line: rgba(255, 255, 255, 0.28); --foreground: #ffffff; }
      .button, .owner-card, .panel { border-width: 2px; }
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div class="shell">
    <header class="panel topbar">
      <a class="brand" href="${SITE_URL}/">
        <img src="/assets/new-local-media-logo.png" alt="New Local Media logo">
        <span class="brand-copy">
          <span class="eyebrow">New Local Media</span>
          <strong>${escapeHtml(SITE_NAME)}</strong>
          <span class="muted">Open projects, products, and experiments.</span>
        </span>
      </a>
      <a class="button" href="/">Back to collection</a>
    </header>
    <main id="main-content" class="stack">
      <section class="panel hero">
        <div class="eyebrow">Project directories</div>
        <h1>Projects</h1>
        <p class="lede">Browse the owner groups and project pages in this collection.</p>
      </section>
      <section class="panel section" aria-labelledby="owner-groups-title">
        <h2 id="owner-groups-title">Owner Groups</h2>
        <div class="owner-groups">
          ${owners.map(([owner, repos]) => `<div class="owner-card"><a href="${ownerPath(owner)}">${escapeHtml(ownerDisplayName(owner))}</a><ul>${repos.map((repo) => `<li><a href="${projectPath(repo.full_name)}">${escapeHtml(displayTitle(repo))}</a></li>`).join('')}</ul></div>`).join('')}
        </div>
      </section>
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
  const owners = [...new Set(CURATED_REPOS.map((fullName) => fullName.split('/')[0]))];
  const urls = [
    `${SITE_URL}/`,
    `${SITE_URL}/projects/`,
    ...owners.map((owner) => `${SITE_URL}${ownerPath(owner)}`),
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

const reposByOwner = new Map();
for (const fullName of CURATED_REPOS) {
  const repo = lookup.get(fullName);
  if (!repo) continue;
  const owner = repo.owner.login;
  if (!reposByOwner.has(owner)) reposByOwner.set(owner, []);
  reposByOwner.get(owner).push(repo);
}

for (const [owner, repos] of reposByOwner) {
  const filepath = resolve(root, `.${ownerPath(owner)}`, 'index.html');
  mkdirSync(dirname(filepath), { recursive: true });
  writeFileSync(filepath, renderOwnerPage(owner, repos));
}

writeFileSync(resolve(root, './projects/index.html'), renderProjectsIndex(reposByOwner));

writeFileSync(resolve(root, 'sitemap.xml'), buildSitemap());
console.log(`Built ${CURATED_REPOS.length} project pages and sitemap.`);
