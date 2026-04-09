import { mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  ACCOUNT_ORDER,
  AI_DOCS_GROUP,
  BLOCKS_SHOWCASE,
  CURATED_REPOS,
  LEAD_REPO,
  PROJECT_META,
  PROJECTS_INDEX_DESCRIPTION,
  SELECTED,
  SECTION_META,
  SITE_URL,
  SPOTLIGHT,
  MAIN_SITE_URL,
  SITE_NAME,
  ORGANIZATION_NAME,
  ownerArchiveDescription,
  sectionForRepo,
  projectPath,
  projectUrl,
  escapeHtml,
} from './site-config.mjs';

const root = process.cwd();
const dataPath = resolve(root, 'data/repos.json');
const projectsRoot = resolve(root, 'projects');
const defaultOgImageUrl = `${SITE_URL}/assets/og-image.png`;
const iconUrl = `${SITE_URL}/assets/icon-512.png`;
const REPO_ICON_SVGS = {
  'dknauss/wp-sudo': '<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.5-2.8 8.3-7 10-4.2-1.7-7-5.5-7-10V6z"/><path d="M9.5 12l1.7 1.7L15.5 9.5"/></svg>',
  'dknauss/ai-assisted-docs': '<svg viewBox="0 0 24 24"><path d="M7 4h7l5 5v11H7z"/><path d="M14 4v5h5"/><path d="M10 13h6"/><path d="M10 17h4"/></svg>',
  'dknauss/wordpress-runbook-template': '<svg viewBox="0 0 24 24"><path d="M6 5.5A2.5 2.5 0 0 1 8.5 3H19v16H8.5A2.5 2.5 0 0 0 6 21z"/><path d="M6 5.5V21"/><path d="M10 8h5"/><path d="M10 11h4"/><path d="M13.5 15.5l3-3"/><path d="M15 14l1.5 1.5"/><path d="M12.5 16.5l-1 2 2-1"/></svg>',
  'dknauss/wp-security-hardening-guide': '<svg viewBox="0 0 24 24"><rect x="6" y="11" width="12" height="9" rx="2"/><path d="M9 11V8a3 3 0 1 1 6 0v3"/><path d="M12 15h.01"/></svg>',
  'dknauss/wp-security-benchmark': '<svg viewBox="0 0 24 24"><path d="M5 19h14"/><path d="M8 16v-4"/><path d="M12 16V9"/><path d="M16 16v-6"/></svg>',
  'dknauss/wp-security-style-guide': '<svg viewBox="0 0 24 24"><path d="M4 20h16"/><path d="M7 16l6-6 3 3-6 6H7z"/><path d="M14 9l2-2 3 3-2 2"/></svg>',
  'newlocalmedia/capm-for-agencies': '<svg viewBox="0 0 24 24"><path d="M4 19h16"/><path d="M6 15l4-4 3 2 5-6"/><path d="M18 7h-3"/><path d="M18 7v3"/></svg>',
  'dknauss/author-identity': '<svg viewBox="0 0 24 24"><path d="M5 5h14v14H5z"/><path d="M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/><path d="M8 17c1-1.5 2.3-2.2 4-2.2s3 .7 4 2.2"/></svg>',
  'dknauss/fedibots': '<svg viewBox="0 0 24 24"><rect x="7" y="8" width="10" height="9" rx="2"/><path d="M10 8V6"/><path d="M14 8V6"/><path d="M10 12h.01"/><path d="M14 12h.01"/><path d="M5 11H3"/><path d="M21 11h-2"/></svg>',
  'dknauss/wordpress-2fa-ecosystem': '<svg viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="10" rx="2"/><path d="M8 12h.01"/><path d="M11 12h.01"/><path d="M14 12h.01"/><path d="M17 12h.01"/><path d="M9 17v2"/><path d="M15 17v2"/></svg>',
  'dknauss/the-drafting-table': '<svg viewBox="0 0 24 24"><path d="M4 20h16"/><path d="M7 16l8-8 2 2-8 8H7z"/><path d="M14 7l2 2"/></svg>',
  'dknauss/wp-bibliography-block': '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M8 9h8"/><path d="M8 12h8"/><path d="M8 15h5"/><path d="M4 4v16"/><path d="M7 4v16"/></svg>'
};
const DEFAULT_REPO_ICON_SVG = '<svg viewBox="0 0 24 24"><path d="M12 5v14"/><path d="M5 12h14"/></svg>';
const UI_ICON_SVGS = {
  docs: '<svg viewBox="0 0 24 24"><path d="M7 4h7l5 5v11H7z"/><path d="M14 4v5h5"/><path d="M10 13h6"/><path d="M10 17h4"/></svg>',
  project: '<svg viewBox="0 0 24 24"><path d="M7 4h7l5 5v11H7z"/><path d="M14 4v5h5"/><path d="M10 14h6"/><path d="M13 11l3 3-3 3"/></svg>',
  github: '<svg viewBox="0 0 98 96"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/></svg>',
  history: '<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 7v5l3 2"/></svg>',
  forks: '<svg viewBox="0 0 24 24"><path d="M7 6a2 2 0 1 0 0 .01"/><path d="M17 18a2 2 0 1 0 0 .01"/><path d="M17 6a2 2 0 1 0 0 .01"/><path d="M9 6h6"/><path d="M17 8v4"/><path d="M17 12c0 3-2 6-6 6h-2"/></svg>'
};

function ownerPath(owner) {
  return `/projects/${encodeURIComponent(owner)}/`;
}

function pictureMarkup(url, alt, { loading = 'lazy' } = {}) {
  const isLocalPng = url.startsWith(SITE_URL + '/assets/') && url.endsWith('.png');
  const img = `<img src="${url}" alt="${alt}" loading="${loading}" decoding="async">`;
  if (!isLocalPng) return img;
  return `<picture><source srcset="${url.replace(/\.png$/, '.webp')}" type="image/webp">${img}</picture>`;
}

function stripTags(value) {
  return String(value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
  }).format(new Date(value));
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-CA').format(value);
}

function formatSnapshotTimestamp(value) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  }).formatToParts(new Date(value));
  const get = (type) => parts.find((part) => part.type === type)?.value ?? '';
  return `${get('day')}-${get('month')}-${get('year')} ${get('hour')}:${get('minute')}`;
}

function repoHomepage(repo) {
  const meta = PROJECT_META[repo.full_name] || {};
  if (meta.extraLinks?.length) {
    return meta.extraLinks[0].url || null;
  }
  if (Object.prototype.hasOwnProperty.call(meta, 'homepage')) {
    const h = meta.homepage;
    return h && h.trim() && h.trim() !== repo.html_url ? h.trim() : null;
  }
  const homepage = repo.homepage;
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

function metaDescription(repo) {
  const override = PROJECT_META[repo.full_name]?.seoDescription;
  return override || descriptionText(repo);
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

function homeDescriptionHtml(repo) {
  const meta = PROJECT_META[repo.full_name] || {};
  if (meta.homeDescriptionHtml) return meta.homeDescriptionHtml;
  if (meta.summaryHtml) return meta.summaryHtml;
  return escapeHtml(meta.summary || repo.description || 'No description yet.');
}

function homepageLabel(repo) {
  return PROJECT_META[repo.full_name]?.homepageLabel || 'Homepage';
}

function homeRuntimeConfig() {
  const repoOverrides = Object.fromEntries(
    CURATED_REPOS.map((fullName) => {
      const meta = PROJECT_META[fullName] || {};
      const override = {};
      if (meta.displayTitle) override.displayTitle = meta.displayTitle;
      if (meta.homeDescriptionHtml) {
        override.descriptionHtml = meta.homeDescriptionHtml;
      } else if (meta.summaryHtml) {
        override.descriptionHtml = meta.summaryHtml;
      }
      if (Object.prototype.hasOwnProperty.call(meta, 'homepage')) {
        override.homepage = meta.homepage;
      }
      if (meta.homepageLabel) override.homepageLabel = meta.homepageLabel;
      if (meta.primaryImage) override.primaryImage = meta.primaryImage;
      return Object.keys(override).length ? [fullName.toLowerCase(), override] : null;
    }).filter(Boolean)
  );

  return {
    accountOrder: ACCOUNT_ORDER,
    leadRepo: LEAD_REPO,
    aiDocsGroup: AI_DOCS_GROUP,
    spotlight: SPOTLIGHT,
    selected: SELECTED,
    blocksShowcase: BLOCKS_SHOWCASE,
    repoOverrides,
    repoIcons: REPO_ICON_SVGS,
    uiIcons: UI_ICON_SVGS,
    forksCardHtml: renderForksCard()
  };
}

function iconSvg(fullName) {
  return REPO_ICON_SVGS[fullName] || DEFAULT_REPO_ICON_SVG;
}

function uiIconSvg(name) {
  return UI_ICON_SVGS[name] || UI_ICON_SVGS.docs;
}

function titleMarkup(repo) {
  return `<span class="title-with-icon"><span class="title-icon" aria-hidden="true">${iconSvg(repo.full_name)}</span><span>${escapeHtml(displayTitle(repo))}</span></span>`;
}

function titleLinkMarkup(repo) {
  return `<a class="title-link" href="${projectPath(repo.full_name)}">${titleMarkup(repo)}</a>`;
}

function updatedPillMarkup(value) {
  const formatted = formatDate(value);
  return `<span class="pill" title="Last updated ${escapeHtml(formatted)}"><span class="sr-only">Last updated </span><time datetime="${escapeHtml(value)}">${escapeHtml(formatted)}</time></span>`;
}

function projectLinkMarkup(href, label = 'Project', showIcon = true) {
  const withIcon = showIcon && label !== 'Docs';
  return `<a class="repo-link primary" href="${href}"><span>${escapeHtml(label)}</span></a>`;
}

function githubLinkMarkup(href) {
  return `<a class="repo-link" href="${href}">GitHub →</a>`;
}

function repoMetaMarkup(repo, extraClass = '') {
  return `<div class="meta${extraClass ? ` ${extraClass}` : ''}"><span class="pill"><span class="star-icon" aria-hidden="true">★</span>${formatNumber(repo.stargazers_count)}</span>${updatedPillMarkup(repo.updated_at)}</div>`;
}

function repoActionsMarkup(repo, options = {}) {
  const {
    label = 'Project',
    showProjectIcon = true,
    includeGithub = true,
    includeHomepage = true
  } = options;
  const homepage = includeHomepage ? repoHomepage(repo) : null;
  return `<div class="repo-actions">${projectLinkMarkup(projectPath(repo.full_name), label, showProjectIcon)}${includeGithub ? githubLinkMarkup(repo.html_url) : ''}${homepage ? `<a class="repo-link alt" href="${homepage}">${escapeHtml(homepageLabel(repo))} →</a>` : ''}</div>`;
}

function homeRepoCard(repo, badgeLabel = '') {
  return `
      <article class="repo-card repo-card--${repo.full_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">
        <div class="repo-top">
          <div>
            <h3>${titleLinkMarkup(repo)}</h3>
          </div>${badgeLabel ? `
          <span class="pill featured"><span class="pill-icon" aria-hidden="true">${uiIconSvg('docs')}</span><span>${escapeHtml(badgeLabel)}</span></span>` : ''}
        </div>
        <p class="repo-desc">${homeDescriptionHtml(repo)}</p>
        ${repoMetaMarkup(repo)}
        ${repoActionsMarkup(repo, { label: badgeLabel === 'Docs' ? 'Docs' : 'Project', showProjectIcon: badgeLabel !== 'Docs' })}
      </article>
    `.trim();
}

function homeSpotlightCard(repo) {
  const primaryImage = projectPrimaryImage(repo);
  const imageAlt = escapeHtml(primaryImage?.alt || `${displayTitle(repo)} preview image.`);
  return `
      <article class="spotlight-card">
        ${primaryImage ? `<figure class="spotlight-media"><button class="image-trigger" type="button" data-modal-image="${primaryImage.url}" data-modal-alt="${imageAlt}" aria-label="Open larger image for ${escapeHtml(displayTitle(repo))}">${pictureMarkup(primaryImage.url, imageAlt)}</button></figure>` : ''}
        <div class="repo-top">
          <div>
            <h3>${titleLinkMarkup(repo)}</h3>
          </div>
          <span class="feature-label">Spotlight</span>
        </div>
        <p class="repo-desc">${homeDescriptionHtml(repo)}</p>
        ${repoMetaMarkup(repo)}
        ${repoActionsMarkup(repo)}
      </article>
    `.trim();
}

function homeLeadMarkup(repo) {
  const primaryImage = projectPrimaryImage(repo);
  const imageAlt = escapeHtml(primaryImage?.alt || `${displayTitle(repo)} preview image.`);
  return `
      <div class="feature-main">
        <span class="feature-label">Featured Repo</span>
        <div class="feature-kicker"><strong>What if WordPress had a Linux-like sudo mode?</strong></div>
        <h2 id="lead-feature-title">${titleLinkMarkup(repo)}</h2>
        <p class="feature-summary">${homeDescriptionHtml(repo)}</p>
        <div class="meta feature-meta">
          <span class="pill"><span class="star-icon" aria-hidden="true">★</span>${formatNumber(repo.stargazers_count)}</span>
          ${updatedPillMarkup(repo.updated_at)}
          ${projectLinkMarkup(projectPath(repo.full_name))}
          ${githubLinkMarkup(repo.html_url)}
        </div>
      </div>
      <aside class="feature-side" aria-label="${escapeHtml(displayTitle(repo))} details">
        ${primaryImage ? `<figure class="feature-media"><button class="image-trigger" type="button" data-modal-image="${primaryImage.url}" data-modal-alt="${imageAlt}" aria-label="Open larger image for ${escapeHtml(displayTitle(repo))}">${pictureMarkup(primaryImage.url, imageAlt)}</button></figure>` : ''}
        <p class="feature-note"><strong>Gate &amp; Log Dangerous Actions</strong> When a user attempts a gated action, Sudo intercepts the request at <code>admin_init</code>.</p>
        <p class="feature-note"><strong>Protects Every Surface</strong> WordPress reauthentication and risky-action gating with support across REST, WP-CLI, Cron, WPGraphQL, and XML-RPC.</p>
      </aside>
    `.trim();
}

function accountCardMarkup(account) {
  const latest = account.latest_repo;
  const avatar = account.repos?.[0]?.owner?.avatar_url || `https://github.com/${account.user}.png?size=108`;
  return `
      <article class="account-card">
        <div class="account-top">
          <img class="account-avatar" src="${avatar}" alt="${account.user} avatar" width="54" height="54" loading="lazy" decoding="async">
          <div>
            <h3><a class="title-link" href="https://github.com/${encodeURIComponent(account.user)}">${escapeHtml(account.user)}</a></h3>
            <div class="muted">${formatNumber(account.total_repos)} public non-fork repos</div>
          </div>
        </div>
        <div class="meta">
          <span class="pill"><span class="star-icon" aria-hidden="true">★</span>${formatNumber(account.total_stars)} total stars</span>
          ${latest ? `<span class="pill">Latest: ${escapeHtml(latest.name)}</span>` : ''}
        </div>
        <div class="account-actions">
          <a class="repo-link" href="https://github.com/${account.user}?tab=repositories">Browse repos →</a>
        </div>
      </article>
    `.trim();
}

function renderForksCard() {
  return `
      <article class="repo-card forks-card">
        <h3><span class="title-with-icon"><span class="title-icon" aria-hidden="true">${uiIconSvg('forks')}</span><span>Forks</span></span></h3>
        <div class="prose-block">
          <p>There are a few oldies but goodies among the community and canonical plugins for WordPress that I&rsquo;m exploring to scratch some old itches.</p>
          <p><a href="https://github.com/dknauss/authorship">Authorship</a> has a well-architected approach to multi-author attribution. I&rsquo;m modernizing it and adding an adapter layer for it in <a href="https://github.com/dknauss/author-identity/tree/main/byline-feed">Byline Feeds</a> so every author has and is included in semantically rich metadata.</p>
          <p><a href="https://github.com/dknauss/comment-popularity">Comment Popularity</a> is a simple plugin that lets users rate comments. I&rsquo;ve added a simple, tried, and true method using those ratings predictively to automate which comments get promoted or moderated.</p>
          <p><a href="https://github.com/dknauss/two-factor">Two-Factor</a> is vital to WordPress core and my <a href="https://github.com/dknauss/wp-sudo">Sudo</a> plugin, so I have been studying it and trying to contribute where I can. There are a lot of good docs in my security repos, including the most current and comprehensive overview of <a href="https://github.com/dknauss/wp-sudo/blob/main/docs/wordpress-core-authentication.md">how user sessions and authentication work today in WordPress</a>.</p>
          <p>Agentic tools are part of my research, development, and writing/editing workflows, thanks to others&rsquo; efforts I&rsquo;ve built on and shared: <a href="https://github.com/dknauss/agent-skills">agent-skills</a>, <a href="https://github.com/dknauss/claude-wordpress-skills">Claude WordPress skills</a>, and <a href="https://github.com/dknauss/skills">general skills</a>. I&rsquo;ve used some of these sources within and alongside my own agent and skill files. For example, check out my <a href="https://github.com/dknauss/ai-assisted-docs">AI-assisted docs</a> project for writing and maintaining technical documentation.</p>
          <p>You&rsquo;ll also see some learning-oriented projects in my forked repos for workshops with the Edmonton WordPress Meetup, including a <a href="https://github.com/dknauss/Headless-WordPress-SvelteKit-Site">Headless WordPress SvelteKit Site</a>. These are open for anyone to fork, use, and improve.</p>
        </div>
      </article>
    `.trim();
}

function replaceGeneratedRegion(html, marker, content) {
  const pattern = new RegExp(`(<!-- GENERATED:${marker}_START -->)([\\s\\S]*?)(<!-- GENERATED:${marker}_END -->)`);
  if (!pattern.test(html)) {
    throw new Error(`Missing generated region marker: ${marker}`);
  }
  return html.replace(pattern, `$1${content}$3`);
}

function renderHomePage(snapshot, lookup) {
  const homePath = resolve(root, 'index.html');
  let html = readFileSync(homePath, 'utf8');
  const repos = CURATED_REPOS.map((fullName) => lookup.get(fullName)).filter(Boolean);
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const accountsByUser = new Map((snapshot.accounts || []).map((account) => [account.user, account]));
  html = replaceGeneratedRegion(html, 'SELECTED_COUNT', String(CURATED_REPOS.length));
  html = replaceGeneratedRegion(html, 'SELECTED_STARS', formatNumber(totalStars));
  html = replaceGeneratedRegion(html, 'LAST_REFRESH', formatSnapshotTimestamp(snapshot.generated_at));
  html = replaceGeneratedRegion(html, 'HOME_CONFIG', `\n${JSON.stringify(homeRuntimeConfig(), null, 2)}\n`);
  html = replaceGeneratedRegion(html, 'LEAD_FEATURE', `\n${homeLeadMarkup(lookup.get(LEAD_REPO))}\n        `);
  html = replaceGeneratedRegion(html, 'AI_DOCS', `\n${AI_DOCS_GROUP.map((fullName) => homeRepoCard(lookup.get(fullName), 'Docs')).join('\n')}\n${renderForksCard()}\n        `);
  html = replaceGeneratedRegion(html, 'SPOTLIGHT', `\n${SPOTLIGHT.map((fullName) => homeSpotlightCard(lookup.get(fullName))).join('\n')}\n        `);
  html = replaceGeneratedRegion(html, 'BLOCKS', `\n${BLOCKS_SHOWCASE.map((fullName) => homeSpotlightCard(lookup.get(fullName))).join('\n')}\n        `);
  html = replaceGeneratedRegion(html, 'SELECTED', `\n${SELECTED.map((fullName) => homeRepoCard(lookup.get(fullName))).join('\n')}\n        `);
  html = replaceGeneratedRegion(html, 'ACCOUNTS', `\n${ACCOUNT_ORDER.map((user) => accountsByUser.get(user)).filter(Boolean).map((account) => accountCardMarkup(account)).join('\n')}\n        `);
  return html;
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

function renderWhyCards(cards = []) {
  if (!cards.length) return '';
  return `<div class="why-card-grid">${cards.map((card) => `<div class="why-card"><div class="why-card-head"><h3 class="why-card-title">${escapeHtml(card.title)}</h3>${card.logo ? `<img class="why-card-logo" src="${card.logo.src}" alt="${escapeHtml(card.logo.alt || '')}" loading="lazy" decoding="async">` : ''}</div><p>${card.html || escapeHtml(card.text)}</p></div>`).join('')}</div>`;
}

function renderScreenshotGallery(screenshots = [], label = 'this project') {
  if (!screenshots.length) return '';
  return `
      <section class="panel section" aria-labelledby="screenshots-title">
        <div class="section-head">
          <div>
            <h2 id="screenshots-title">Screenshot Gallery</h2>
            <p>Selected screenshots from ${escapeHtml(label)}. Click any image to enlarge it.</p>
          </div>
        </div>
        <div class="screenshot-grid">
          ${screenshots.map((shot, index) => { const alt = escapeHtml(shot.alt || shot.caption || `${label} screenshot ${index + 1}`); return `<figure class="screenshot-card"><button class="image-trigger" type="button" data-modal-image="${shot.url}" data-modal-alt="${alt}" aria-label="Open larger image for ${escapeHtml(shot.caption || `${label} screenshot ${index + 1}`)}">${pictureMarkup(shot.url, alt)}</button>${shot.caption ? `<figcaption>${escapeHtml(shot.caption)}</figcaption>` : ''}</figure>`; }).join('')}
        </div>
      </section>`;
}

function renderDocsTable(docs = [], label = 'this project') {
  if (!docs.length) return '';
  return `
      <section class="panel section" aria-labelledby="docs-title">
        <div class="section-head"><div><h2 id="docs-title">Documentation</h2></div></div>
        <table class="docs-table">
          <caption class="sr-only">Documentation links and descriptions for ${escapeHtml(label)}.</caption>
          <thead class="sr-only">
            <tr>
              <th scope="col">Document</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            ${docs.map((d) => `<tr><th scope="row"><a href="${d.url}">${escapeHtml(d.label)}</a></th><td>${escapeHtml(d.description)}</td></tr>`).join('\n            ')}
          </tbody>
        </table>
      </section>`;
}

function renderPage(repo, lookup) {
  const pageUrl = projectUrl(repo.full_name);
  const section = SECTION_META[sectionForRepo(repo.full_name)];
  const meta = PROJECT_META[repo.full_name] || {};
  const label = displayTitle(repo);
  const homepage = repoHomepage(repo);
  const related = relatedRepos(repo.full_name, lookup);
  const title = `${label} | ${SITE_NAME}`;
  const description = metaDescription(repo);
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
      --primary: #5FD3FF;
      --secondary: #ffffff;
      --foreground: #F2F8FF;
      --background: #0D1B2A;
      --tertiary: #071018;
      --surface: rgba(20, 45, 70, 0.96);
      --surface-2: rgba(13, 27, 42, 0.96);
      --line: rgba(255, 255, 255, 0.18);
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
    .shell { width: min(calc(100% - 28px), var(--max)); margin: 6px auto 40px; }
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
    .button, .pill { display: inline-flex; align-items: center; height: 34px; padding: 0 14px; border-radius: 999px; border: 1px solid var(--line); background: rgba(13,27,42,0.78); text-decoration: none; font-weight: 600; white-space: nowrap; line-height: 1; }
    .button.primary { background: rgba(95,211,255,0.24); border-color: rgba(95,211,255,0.5); }
    .button.release-btn { background: rgba(245,166,35,0.18); border-color: rgba(245,166,35,0.45); }
    .button.demo-btn { background: rgba(72,198,150,0.22); border-color: rgba(72,198,150,0.45); }
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
    .summary-box { margin-top: -10px; padding: 18px; border: 1px solid var(--line); border-radius: 22px; background: rgba(255,255,255,0.08); }
    .summary-box-media { margin: 0 0 14px; }
    .image-trigger { display: block; width: 100%; padding: 0; border: 0; background: transparent; cursor: zoom-in; border-radius: 16px; }
    .summary-box-media img, .image-trigger img { display: block; width: 100%; height: auto; border-radius: 16px; border: 1px solid var(--line); background: rgba(13,27,42,0.5); }
    .screenshot-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
    .screenshot-card { margin: 0; display: grid; gap: 10px; }
    .screenshot-card img { aspect-ratio: 1200 / 630; object-fit: cover; }
    .screenshot-card figcaption { color: var(--foreground); font-size: 0.92rem; line-height: 1.5; }
    .image-modal[hidden] { display: none; }
    .image-modal { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 28px; background: rgba(6,10,18,0.82); backdrop-filter: blur(10px); }
    .modal-open { overflow: hidden; }
    .image-modal-dialog { position: relative; width: min(1100px, 100%); max-height: calc(100vh - 56px); outline: none; }
    .image-modal-close { position: absolute; top: -14px; right: -14px; width: 42px; height: 42px; border: 0; border-radius: 999px; cursor: pointer; font-size: 1.5rem; line-height: 1; color: var(--secondary); background: rgba(13,27,42,0.92); box-shadow: var(--shadow); }
    .image-modal img { display: block; width: 100%; height: auto; max-height: calc(100vh - 56px); object-fit: contain; border-radius: 18px; border: 1px solid var(--line); background: rgba(13,27,42,0.96); }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; word-wrap: normal !important; }
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
    .section-copy--split { display: grid; grid-template-columns: minmax(0, 1fr) minmax(300px, 390px); gap: 22px; align-items: start; }
    .section-copy-main > p:first-child { margin-top: 0; }
    .section-copy-main > p:last-child { margin-bottom: 0; }
    .interior-aside {
      position: relative;
      overflow: hidden;
      width: 100%;
      margin: 0;
      padding: 18px 20px;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--line);
      border-radius: 18px;
    }
    .interior-aside.break-glass-aside {
      background:
        radial-gradient(circle at 81.8% 18.4%, rgba(255,255,255,0.06), transparent 0 16px),
        linear-gradient(180deg, rgba(4,8,12,0.99), rgba(7,13,20,0.985));
      border-color: rgba(220,240,249,0.12);
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.03),
        0 10px 24px rgba(0,0,0,0.14);
    }
    .interior-aside.break-glass-aside::before,
    .interior-aside.break-glass-aside::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .interior-aside.break-glass-aside::before {
      opacity: 0.58;
      background:
        linear-gradient(115deg, transparent 0 47.9%, rgba(235,247,252,0.48) 48.4%, transparent 49%) 81.8% 18.4% / 72% 72% no-repeat,
        linear-gradient(144deg, transparent 0 48.3%, rgba(220,240,249,0.34) 48.8%, transparent 49.4%) 81.8% 18.4% / 58% 56% no-repeat,
        linear-gradient(87deg, transparent 0 49.1%, rgba(220,240,249,0.26) 49.6%, transparent 50.2%) 81.8% 18.4% / 42% 84% no-repeat,
        linear-gradient(28deg, transparent 0 48.9%, rgba(220,240,249,0.24) 49.4%, transparent 50%) 81.8% 18.4% / 64% 40% no-repeat,
        linear-gradient(171deg, transparent 0 48.9%, rgba(220,240,249,0.2) 49.3%, transparent 49.9%) 81.8% 18.4% / 36% 68% no-repeat,
        linear-gradient(58deg, transparent 0 49%, rgba(220,240,249,0.16) 49.4%, transparent 50%) 81.8% 18.4% / 32% 54% no-repeat;
    }
    .interior-aside.break-glass-aside::after {
      opacity: 0.68;
      background:
        radial-gradient(circle at 81.8% 18.3%, rgba(255,255,255,0.72) 0 2px, transparent 3px),
        radial-gradient(circle at 82.1% 18%, rgba(235,247,252,0.16) 0 9px, transparent 11px),
        radial-gradient(circle at 81.6% 18.5%, transparent 0 16px, rgba(235,247,252,0.18) 17px 18px, transparent 20px),
        radial-gradient(circle at 81.1% 19%, transparent 0 28px, rgba(220,240,249,0.14) 29px 30px, transparent 32px),
        radial-gradient(circle at 82.5% 17.2%, transparent 0 39px, rgba(220,240,249,0.12) 40px 41px, transparent 43px),
        radial-gradient(circle at 80.4% 19.8%, transparent 0 8px, rgba(220,240,249,0.12) 9px 10px, transparent 12px),
        conic-gradient(from 18deg at 81.8% 18.4%, transparent 0 24deg, rgba(235,247,252,0.14) 24deg 56deg, transparent 56deg 118deg, rgba(220,240,249,0.1) 118deg 146deg, transparent 146deg 220deg, rgba(220,240,249,0.08) 220deg 242deg, transparent 242deg 360deg),
        conic-gradient(from 210deg at 81.4% 18.8%, transparent 0 40deg, rgba(220,240,249,0.08) 40deg 62deg, transparent 62deg 360deg);
    }
    .interior-aside-heading { margin: 0 0 12px; font-size: 1rem; line-height: 1.3; letter-spacing: -0.01em; }
    .interior-aside > * { position: relative; z-index: 1; }
    .interior-aside p { margin: 0 0 12px; }
    .interior-aside p:last-child { margin-bottom: 0; }
    .interior-aside .pull-quote { margin: 0; }
    .why-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px; }
    .why-card { display: flex; flex-direction: column; padding: 18px 20px; background: rgba(255,255,255,0.04); border: 1px solid var(--line); border-radius: 16px; }
    .why-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; min-height: 2.75rem; margin-bottom: 5px; }
    .why-card-title { margin: 0; font-size: 0.98rem; line-height: 1.35; letter-spacing: -0.01em; color: var(--secondary); }
    .why-card-logo { display: block; height: 22px; width: auto; max-width: 108px; margin-top: 2px; opacity: 0.88; }
    .why-card p { margin: 0; color: var(--foreground); font-size: 0.95rem; }
    .excerpt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px; }
    .excerpt-card { padding: 18px 20px; background: rgba(255,255,255,0.04); border: 1px solid var(--line); border-radius: 16px; }
    .excerpt-card-heading { font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--primary); margin: 0 0 10px; font-weight: 700; }
    .excerpt-card > p { margin: 0 0 10px; font-size: 0.92rem; }
    .excerpt-card ul { margin: 0; padding-left: 1.1rem; font-size: 0.92rem; line-height: 1.65; }
    .excerpt-card li { margin-bottom: 3px; color: var(--foreground); }
    @media (max-width: 580px) { .excerpt-grid, .why-card-grid { grid-template-columns: 1fr; } }
    .left-column-quote { margin-top: 24px; padding: 16px 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--line); border-radius: 16px; border-left: none; }
    .panel.hero { border-top: 3px solid var(--primary); }
    .hero .eyebrow { color: var(--primary); }
    .hero-cta-btn { font-size: 0.96rem; padding: 0 18px; }
    .downloads-inset { margin-top: 22px; padding-top: 20px; border-top: 1px solid var(--line); }
    .downloads-heading { margin: 0 0 12px; font-size: 1rem; font-weight: 600; letter-spacing: -0.01em; color: var(--foreground); }
    .download-links a.button { text-decoration: none; }
    .docs-table { width: 100%; border-collapse: collapse; margin-top: 6px; }
    .docs-table th, .docs-table td { padding: 8px 12px; vertical-align: top; border-top: 1px solid var(--line); text-align: left; }
    .docs-table tbody th { white-space: nowrap; padding-right: 20px; font-weight: 600; }
    .docs-table tbody th a { color: var(--accent); text-decoration: none; font-weight: 600; }
    .docs-table tbody th a:hover, .docs-table tbody th a:focus-visible { color: var(--secondary); text-decoration: underline; }
    .docs-table td { color: var(--foreground); font-size: 0.93rem; }
    @media (max-width: 580px) { .docs-table tr { display: block; border-top: 1px solid var(--line); padding: 10px 0; } .docs-table th, .docs-table td { display: block; padding: 4px 0; border-top: none; } .docs-table tbody th { white-space: normal; } }
    footer { padding: 12px 4px 0; text-align: center; color: var(--foreground); }
    @media (prefers-contrast: more) {
      :root { --line: rgba(255, 255, 255, 0.32); --foreground: #ffffff; }
      .button, .pill, .summary-box, .panel { border-width: 2px; }
    }
    @media (max-width: 760px) {
      .topbar, .hero, .section { padding: 20px; }
      .details-grid, .section-copy--split { grid-template-columns: 1fr; }
      .screenshot-grid { grid-template-columns: 1fr; }
      .shell { width: min(calc(100% - 18px), var(--max)); }
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div class="shell" id="site-shell">
    <header class="panel topbar">
      <a class="brand" href="${SITE_URL}/">
        <img src="/assets/new-local-media-logo.svg" alt="New Local Media logo" width="200" height="200">
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
            <span class="pill"><span class="star-icon" aria-hidden="true">★</span>${escapeHtml(String(repo.stargazers_count))}</span>
            <span class="pill" title="Last updated ${escapeHtml(formatDate(repo.updated_at))}"><span class="sr-only">Last updated </span>${escapeHtml(formatDate(repo.updated_at))}</span>
            <span class="meta-sep" aria-hidden="true"></span>
            <a class="button primary" href="${repo.html_url}"><svg class="github-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>View Source</a>
            ${homepage ? `<a class="button" href="${homepage}">Visit homepage</a>` : ''}
            ${meta.release && !meta.downloadCta ? `<a class="button release-btn" href="${meta.release.url}">Download ${escapeHtml(meta.release.tag)}</a>` : ''}
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
        <div class="section-copy${meta.whyInsetHtml?.length ? ' section-copy--split' : ''}">
          <div class="section-copy-main">
        ${paragraphs.map((paragraph) => `<p>${paragraph.html || inlineCodeHtml(paragraph.text)}</p>`).join('\n        ')}
          </div>
        ${meta.whyInsetHtml?.length ? `<aside class="interior-aside${meta.whyInsetClass ? ` ${escapeHtml(meta.whyInsetClass)}` : ''}">${meta.whyInsetHtml.join('')}</aside>` : ''}
        </div>
        ${renderWhyCards(meta.whyCards)}
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
            ${primaryImage ? `<figure class="summary-box-media"><button class="image-trigger" type="button" data-modal-image="${primaryImage.url}" data-modal-alt="${escapeHtml(primaryImage.alt || `${label} preview image.`)}" aria-label="Open larger image for ${escapeHtml(label)}">${pictureMarkup(primaryImage.url, escapeHtml(primaryImage.alt || `${label} preview image.`), { loading: 'eager' })}</button></figure>` : ''}
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

      ${renderScreenshotGallery(meta.screenshots, label)}

      ${renderDocsTable(meta.docs, label)}

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
  const title = `${ownerLabel} Projects | ${SITE_NAME}`;
  const description = ownerArchiveDescription(owner);
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
      --primary: #5FD3FF;
      --secondary: #ffffff;
      --foreground: #F2F8FF;
      --background: #0D1B2A;
      --tertiary: #071018;
      --surface: rgba(20, 45, 70, 0.96);
      --line: rgba(255, 255, 255, 0.18);
      --accent: #5FD3FF;
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
    .shell { width: min(calc(100% - 28px), var(--max)); margin: 6px auto 40px; }
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
    .button { display: inline-flex; align-items: center; min-height: 34px; padding: 0 12px; border-radius: 999px; border: 1px solid var(--line); background: rgba(13,27,42,0.78); text-decoration: none; font-weight: 700; }
    h1, h2 { margin: 0; letter-spacing: -0.03em; }
    h1 { font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.02; }
    h2 { font-size: 1.35rem; }
    .lede { margin: 14px 0 0; font-size: 1.05rem; }
    .owner-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 14px; }
    .owner-list li { padding: 18px; border: 1px solid var(--line); border-radius: 22px; background: rgba(255,255,255,0.08); }
    .owner-list a, footer a, .breadcrumbs a { color: var(--accent); }
    .owner-list a, footer a { text-decoration: underline; font-weight: 700; }
    .owner-list a:hover, .owner-list a:focus-visible, .breadcrumbs a:hover, .breadcrumbs a:focus-visible, footer a:hover, footer a:focus-visible { color: var(--secondary); text-decoration: underline; }
    .repo-meta { margin-top: 8px; color: var(--foreground); font-size: 0.95rem; }
    footer { padding: 12px 4px 0; text-align: center; color: var(--foreground); }
    @media (prefers-contrast: more) {
      :root { --line: rgba(255, 255, 255, 0.32); --foreground: #ffffff; }
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
        <img src="/assets/new-local-media-logo.svg" alt="New Local Media logo" width="200" height="200">
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
        <p class="lede">${escapeHtml(description)}</p>
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
  const description = PROJECTS_INDEX_DESCRIPTION;
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
      --primary: #5FD3FF;
      --secondary: #ffffff;
      --foreground: #F2F8FF;
      --background: #0D1B2A;
      --tertiary: #071018;
      --surface: rgba(20, 45, 70, 0.96);
      --line: rgba(255, 255, 255, 0.18);
      --accent: #5FD3FF;
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
    .shell { width: min(calc(100% - 28px), var(--max)); margin: 6px auto 40px; }
    .panel { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); backdrop-filter: blur(12px); }
    .topbar, .hero, .section { padding: 24px; }
    .topbar { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
    .brand { display: inline-flex; align-items: center; gap: 14px; text-decoration: none; }
    .brand img { width: 56px; height: 56px; border-radius: 18px; background: rgba(255,255,255,0.06); }
    .brand-copy { display: grid; gap: 2px; }
    .eyebrow { font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--foreground); }
    .muted, .lede { color: var(--foreground); }
    .stack { display: grid; gap: 18px; margin-top: 18px; }
    .button { display: inline-flex; align-items: center; min-height: 34px; padding: 0 12px; border-radius: 999px; border: 1px solid var(--line); background: rgba(13,27,42,0.78); text-decoration: none; font-weight: 700; }
    h1, h2 { margin: 0; letter-spacing: -0.03em; }
    h1 { font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.02; }
    h2 { font-size: 1.35rem; }
    .lede { margin: 14px 0 0; font-size: 1.05rem; }
    .owner-groups { display: grid; gap: 18px; }
    .owner-card { padding: 18px; border: 1px solid var(--line); border-radius: 22px; background: rgba(255,255,255,0.08); }
    .owner-card a, footer a { color: var(--accent); text-decoration: underline; font-weight: 700; }
    .owner-card a:hover, .owner-card a:focus-visible, footer a:hover, footer a:focus-visible { color: var(--secondary); text-decoration: underline; }
    .owner-card ul { margin: 10px 0 0; padding-left: 1.2rem; color: var(--foreground); }
    footer { padding: 12px 4px 0; text-align: center; color: var(--foreground); }
    @media (prefers-contrast: more) {
      :root { --line: rgba(255, 255, 255, 0.32); --foreground: #ffffff; }
      .button, .owner-card, .panel { border-width: 2px; }
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div class="shell">
    <header class="panel topbar">
      <a class="brand" href="${SITE_URL}/">
        <img src="/assets/new-local-media-logo.svg" alt="New Local Media logo" width="200" height="200">
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
        <p class="lede">${escapeHtml(description)}</p>
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

function buildSitemap(lookup, snapshot) {
  const owners = [...new Set(CURATED_REPOS.map((fullName) => fullName.split('/')[0]))];
  const ownerLastmod = new Map(owners.map((owner) => {
    const dates = CURATED_REPOS.filter((fullName) => fullName.startsWith(`${owner}/`)).map((fullName) => lookup.get(fullName)?.updated_at).filter(Boolean);
    return [owner, dates.sort().at(-1) || snapshot.generated_at];
  }));
  const allProjectDates = CURATED_REPOS.map((fullName) => lookup.get(fullName)?.updated_at).filter(Boolean).sort();
  const urls = [
    { loc: `${SITE_URL}/`, lastmod: snapshot.generated_at, changefreq: 'daily', priority: '1.0' },
    { loc: `${SITE_URL}/projects/`, lastmod: allProjectDates.at(-1) || snapshot.generated_at, changefreq: 'weekly', priority: '0.8' },
    ...owners.map((owner) => ({ loc: `${SITE_URL}${ownerPath(owner)}`, lastmod: ownerLastmod.get(owner), changefreq: 'weekly', priority: '0.8' })),
    ...CURATED_REPOS.map((fullName) => ({ loc: projectUrl(fullName), lastmod: lookup.get(fullName)?.updated_at || snapshot.generated_at, changefreq: 'weekly', priority: '0.8' }))
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((entry) => `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`).join('\n')}
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

writeFileSync(resolve(root, 'index.html'), renderHomePage(snapshot, lookup));
writeFileSync(resolve(root, 'sitemap.xml'), buildSitemap(lookup, snapshot));
console.log(`Built homepage, ${CURATED_REPOS.length} project pages, archive pages, and sitemap.`);
