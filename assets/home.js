const rawHomeConfig = document.getElementById('home-config')?.textContent || '{}';
  const HOME_CONFIG = JSON.parse(
    rawHomeConfig.replace(/<!-- GENERATED:[A-Z_]+_(?:START|END) -->/g, '').trim() || '{}'
  );
  const ACCOUNT_ORDER = HOME_CONFIG.accountOrder || [];
  const LEAD_REPO = HOME_CONFIG.leadRepo || '';
  const AI_DOCS_GROUP = HOME_CONFIG.aiDocsGroup || [];
  const SPOTLIGHT = HOME_CONFIG.spotlight || [];
  const SELECTED = HOME_CONFIG.selected || [];
  const BLOCKS_SHOWCASE = HOME_CONFIG.blocksShowcase || [];
  const PROJECT_PAGE_SET = new Set([
    LEAD_REPO,
    ...AI_DOCS_GROUP,
    ...SPOTLIGHT,
    ...SELECTED,
    ...BLOCKS_SHOWCASE
  ].map((name) => name.toLowerCase()));
  const REPO_OVERRIDES = HOME_CONFIG.repoOverrides || {};
  const REPO_ICONS = HOME_CONFIG.repoIcons || {};
  const UI_ICONS = HOME_CONFIG.uiIcons || {};
  const FORKS_CARD_HTML = HOME_CONFIG.forksCardHtml || '';
  const DEFAULT_REPO_ICON_SVG = '<svg viewBox="0 0 24 24"><path d="M12 5v14"/><path d="M5 12h14"/></svg>';
  const BUSY_TARGET_IDS = [
    'lead-feature-shell',
    'account-grid',
    'ai-docs-grid',
    'spotlight-grid',
    'blocks-grid',
    'selected-grid'
  ];

  const totals = { selectedCount: 0, selectedStars: 0 };
  const state = new Map();
  const counted = new Set();

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function pictureMarkup(url, alt) {
    const isLocalPng = url.includes('/assets/') && url.endsWith('.png');
    if (!isLocalPng) return `<img src="${url}" alt="${alt}" loading="lazy" decoding="async">`;
    const webpUrl = url.replace(/\.png$/, '.webp');
    return `<picture><source srcset="${webpUrl}" type="image/webp"><img src="${url}" alt="${alt}" loading="lazy" decoding="async"></picture>`;
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat('en-CA', {
      year: 'numeric', month: 'short', day: 'numeric'
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
      hour12: false
    }).formatToParts(new Date(value));
    const get = (type) => parts.find((part) => part.type === type)?.value ?? '';
    return `${get('day')}-${get('month')}-${get('year')} ${get('hour')}:${get('minute')}`;
  }

  function countRepo(repo) {
    const key = repo.full_name.toLowerCase();
    if (counted.has(key)) return;
    counted.add(key);
    totals.selectedCount += 1;
    totals.selectedStars += repo.stargazers_count;
  }

  function storeSnapshot(snapshot) {
    for (const account of snapshot.accounts || []) {
      for (const repo of account.repos || []) {
        state.set(repo.full_name.toLowerCase(), repo);
      }
    }
  }

  async function loadSnapshot() {
    const response = await fetch('data/repos.json', { cache: 'default' });
    if (!response.ok) {
      throw new Error(`Snapshot request failed with ${response.status}`);
    }
    return response.json();
  }

  function repoOverride(repo) {
    return REPO_OVERRIDES[repo.full_name.toLowerCase()] || null;
  }

  function reposFor(fullNames) {
    return fullNames.map((fullName) => state.get(fullName.toLowerCase())).filter(Boolean);
  }

  function setBusyState(targetId, isBusy) {
    document.getElementById(targetId)?.setAttribute('aria-busy', String(isBusy));
  }

  function resetBusyStates(targetIds = BUSY_TARGET_IDS) {
    targetIds.forEach((targetId) => setBusyState(targetId, false));
  }

  function repoHomepage(repo) {
    const override = repoOverride(repo);
    // Explicit null/empty in the override means "suppress homepage button".
    // Only fall through to repo.homepage when override has no homepage key.
    const homepage = (override && 'homepage' in override) ? override.homepage : repo.homepage;
    return homepage && homepage.trim() && homepage.trim() !== repo.html_url
      ? homepage.trim()
      : null;
  }

  function repoHomepageLabel(repo) {
    return repoOverride(repo)?.homepageLabel || 'Homepage';
  }

  function repoDescriptionHtml(repo) {
    const override = repoOverride(repo);
    return override?.descriptionHtml || escapeHtml(repo.description || 'No description yet.');
  }

  function repoPrimaryImage(repo) {
    return repoOverride(repo)?.primaryImage || null;
  }

  function repoDisplayTitle(repo) {
    return repoOverride(repo)?.displayTitle || repo.name;
  }

  function iconSvg(name) {
    return REPO_ICONS[name] || DEFAULT_REPO_ICON_SVG;
  }

  function titleMarkup(label, fullName) {
    return `<span class="title-with-icon"><span class="title-icon" aria-hidden="true">${iconSvg(fullName)}</span><span>${escapeHtml(label)}</span></span>`;
  }

  function projectPageUrl(repo) {
    const key = repo.full_name.toLowerCase();
    if (!PROJECT_PAGE_SET.has(key)) {
      return null;
    }
    return `projects/${encodeURIComponent(repo.owner.login)}/${encodeURIComponent(repo.name)}/`;
  }

  function titleLinkMarkup(repo) {
    return `<a class="title-link" href="${projectPageUrl(repo) || repo.html_url}">${titleMarkup(repoDisplayTitle(repo), repo.full_name)}</a>`;
  }

  function uiIconSvg(name) {
    return UI_ICONS[name] || UI_ICONS.docs || '';
  }

  function iconMarkup(name, className = 'ui-icon') {
    const extra = name === 'github' ? ' github' : '';
    return `<span class="${className}${extra}" aria-hidden="true">${uiIconSvg(name)}</span>`;
  }

  function updatedPill(value) {
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

  function statusMarkup(message, className = 'empty') {
    return `<p class="${className}" role="status">${escapeHtml(message)}</p>`;
  }

  function repoMetaMarkup(repo, extraClass = '') {
    return `
      <div class="meta${extraClass ? ` ${extraClass}` : ''}">
        <span class="pill"><span class="star-icon" aria-hidden="true">★</span>${formatNumber(repo.stargazers_count)}</span>
        ${updatedPill(repo.updated_at)}
      </div>
    `;
  }

  function repoActionsMarkup(repo, options = {}) {
    const {
      label = 'Project',
      showProjectIcon = true,
      includeGithub = true,
      includeHomepage = true
    } = options;
    const homepage = includeHomepage ? repoHomepage(repo) : null;
    const details = projectPageUrl(repo);
    return `
      <div class="repo-actions">
        ${details ? projectLinkMarkup(details, label, showProjectIcon) : ''}
        ${includeGithub ? githubLinkMarkup(repo.html_url) : ''}
        ${homepage ? `<a class="repo-link alt" href="${homepage}">${escapeHtml(repoHomepageLabel(repo))} →</a>` : ''}
      </div>
    `;
  }

  function repoCardClassName(repo) {
    return `repo-card repo-card--${repo.full_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  }

  function repoCard(repo, badgeLabel = '') {
    return `
      <article class="${repoCardClassName(repo)}">
        <div class="repo-top">
          <div>
            <h3>${titleLinkMarkup(repo)}</h3>
          </div>
          ${badgeLabel ? `<span class="pill featured">${iconMarkup('docs', 'pill-icon')}<span>${escapeHtml(badgeLabel)}</span></span>` : ''}
        </div>
        <p class="repo-desc">${repoDescriptionHtml(repo)}</p>
        ${repoMetaMarkup(repo)}
        ${repoActionsMarkup(repo, {
          label: badgeLabel === 'Docs' ? 'Docs' : 'Project',
          showProjectIcon: badgeLabel !== 'Docs'
        })}
      </article>
    `;
  }

  function renderSpotlightCard(repo) {
    const primaryImage = repoPrimaryImage(repo);
    const imageAlt = escapeHtml(primaryImage?.alt || `${repoDisplayTitle(repo)} preview image.`);
    return `
      <article class="spotlight-card">
        ${primaryImage ? `<figure class="spotlight-media"><button class="image-trigger" type="button" data-modal-image="${primaryImage.url}" data-modal-alt="${imageAlt}" aria-label="Open larger image for ${escapeHtml(repoDisplayTitle(repo))}">${pictureMarkup(primaryImage.url, imageAlt)}</button></figure>` : ''}
        <div class="repo-top">
          <div>
            <h3>${titleLinkMarkup(repo)}</h3>
          </div>
          <span class="feature-label">Spotlight</span>
        </div>
        <p class="repo-desc">${repoDescriptionHtml(repo)}</p>
        ${repoMetaMarkup(repo)}
        ${repoActionsMarkup(repo)}
      </article>
    `;
  }

  function renderLead(repo) {
    const target = document.getElementById('lead-feature-shell');
    if (!repo) {
      target.innerHTML = statusMarkup('Could not load the lead feature right now.');
      setBusyState('lead-feature-shell', false);
      return;
    }
    const details = projectPageUrl(repo);
    const primaryImage = repoPrimaryImage(repo);
    const imageAlt = escapeHtml(primaryImage?.alt || `${repoDisplayTitle(repo)} preview image.`);
    countRepo(repo);
    target.innerHTML = `
      <div class="feature-main">
        <span class="feature-label">Featured Repo</span>
        <div class="feature-kicker"><strong>What if WordPress had a Linux-like sudo mode?</strong></div>
        <h2 id="lead-feature-title">${titleLinkMarkup(repo)}</h2>
        <p class="feature-summary">${repoDescriptionHtml(repo)}</p>
        <div class="meta feature-meta">
          <span class="pill"><span class="star-icon" aria-hidden="true">★</span>${formatNumber(repo.stargazers_count)}</span>
          ${updatedPill(repo.updated_at)}
          ${details ? projectLinkMarkup(details) : ''}
          ${githubLinkMarkup(repo.html_url)}
        </div>
      </div>
      <aside class="feature-side" aria-label="${escapeHtml(repoDisplayTitle(repo))} details">
        ${primaryImage ? `<figure class="feature-media"><button class="image-trigger" type="button" data-modal-image="${primaryImage.url}" data-modal-alt="${imageAlt}" aria-label="Open larger image for ${escapeHtml(repoDisplayTitle(repo))}">${pictureMarkup(primaryImage.url, imageAlt)}</button></figure>` : ''}
        <p class="feature-note"><strong>Gate &amp; Log Dangerous Actions</strong> When a user attempts a gated action, Sudo intercepts the request at <code>admin_init</code>.</p>
        <p class="feature-note"><strong>Protects Every Surface</strong> WordPress reauthentication and risky-action gating with support across REST, WP-CLI, Cron, WPGraphQL, and XML-RPC.</p>
      </aside>
    `;
    setBusyState('lead-feature-shell', false);
    updateStats();
  }

  function renderAccountCard(account) {
    const latest = account.latest_repo;
    const avatar = account.repos?.[0]?.owner?.avatar_url || `https://github.com/${account.user}.png?size=108`;
    return `
      <article class="account-card">
        <div class="account-top">
          <img class="account-avatar" src="${avatar}" alt="${account.user} avatar">
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
    `;
  }

  function renderForksCard() {
    return FORKS_CARD_HTML;
  }

  function renderRepoSection({ targetId, fullNames, renderer, emptyMessage = 'Nothing to show right now.', suffixHtml = '' }) {
    const target = document.getElementById(targetId);
    const repos = reposFor(fullNames);
    if (!repos.length) {
      target.innerHTML = statusMarkup(emptyMessage);
      setBusyState(targetId, false);
      return;
    }
    repos.forEach(countRepo);
    target.innerHTML = repos.map((repo) => renderer(repo)).join('') + suffixHtml;
    setBusyState(targetId, false);
    updateStats();
  }

  function renderAiDocs() {
    renderRepoSection({
      targetId: 'ai-docs-grid',
      fullNames: AI_DOCS_GROUP,
      renderer: (repo) => repoCard(repo, 'Docs'),
      suffixHtml: renderForksCard()
    });
  }

  function renderSpotlight() {
    renderRepoSection({
      targetId: 'spotlight-grid',
      fullNames: SPOTLIGHT,
      renderer: renderSpotlightCard
    });
  }

  function renderBlocks() {
    renderRepoSection({
      targetId: 'blocks-grid',
      fullNames: BLOCKS_SHOWCASE,
      renderer: renderSpotlightCard
    });
  }

  function renderList(list, targetId, badgeLabel = '') {
    renderRepoSection({
      targetId,
      fullNames: list,
      renderer: (repo) => repoCard(repo, badgeLabel)
    });
  }

  function updateStats(snapshotGeneratedAt = null) {
    document.querySelector('#selected-count .stat-value').textContent = formatNumber(totals.selectedCount);
    document.querySelector('#selected-stars .stat-value').textContent = formatNumber(totals.selectedStars);
    document.querySelector('#last-refresh .stat-value').textContent = snapshotGeneratedAt
      ? formatSnapshotTimestamp(snapshotGeneratedAt)
      : 'Live';
  }

  function initImageModal() {
    const modal = document.getElementById('image-modal');
    const siteShell = document.getElementById('site-shell');
    const dialog = modal?.querySelector('.image-modal-dialog');
    const modalImage = document.getElementById('image-modal-img');
    const closeButton = modal?.querySelector('.image-modal-close');
    if (!modal || !modalImage || !closeButton || !dialog || !siteShell) return;

    let lastTrigger = null;
    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

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
  }

  async function init() {
    document.getElementById('year').textContent = new Date().getFullYear();

    try {
      const snapshot = await loadSnapshot();

      // Pre-rendered content is already current — skip re-rendering to avoid
      // aria-live regions announcing identical content to screen reader users.
      const preRenderedTimestamp = document.querySelector('#last-refresh .stat-value')?.textContent?.trim();
      if (preRenderedTimestamp && preRenderedTimestamp === formatSnapshotTimestamp(snapshot.generated_at)) {
        resetBusyStates();
        return;
      }

      storeSnapshot(snapshot);

      const accountsByUser = new Map((snapshot.accounts || []).map((account) => [account.user, account]));
      const accountGrid = document.getElementById('account-grid');
      accountGrid.innerHTML = ACCOUNT_ORDER
        .map((user) => accountsByUser.get(user))
        .filter(Boolean)
        .map((account) => renderAccountCard(account))
        .join('');
      setBusyState('account-grid', false);

      renderLead(state.get(LEAD_REPO.toLowerCase()));
      renderAiDocs();
      renderSpotlight();
      renderBlocks();
      renderList(SELECTED, 'selected-grid', false);
      updateStats(snapshot.generated_at);
    } catch (error) {
      console.error(error);
      resetBusyStates();
    }
  }

  initImageModal();
  init();
