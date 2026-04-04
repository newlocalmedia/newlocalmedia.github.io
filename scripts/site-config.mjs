export const SITE_URL = 'https://newlocalmedia.github.io';
export const MAIN_SITE_URL = 'https://newlocalmedia.com/';
export const SITE_NAME = 'Work in Progress';
export const ORGANIZATION_NAME = 'New Local Media';
export const ACCOUNT_ORDER = ['newlocalmedia', 'dknauss'];

export const LEAD_REPO = 'dknauss/wp-sudo';
export const AI_DOCS_GROUP = [
  'dknauss/ai-assisted-docs',
  'dknauss/wordpress-runbook-template',
  'dknauss/wp-security-hardening-guide',
  'dknauss/wp-security-benchmark',
  'dknauss/wp-security-style-guide'
];
export const SPOTLIGHT = [
  'newlocalmedia/capm-for-agencies',
  'dknauss/author-identity'
];
export const SELECTED = [
  'dknauss/fedibots',
  'dknauss/wordpress-2fa-ecosystem',
  'dknauss/the-drafting-table'
];

export const CURATED_REPOS = [LEAD_REPO, ...AI_DOCS_GROUP, ...SPOTLIGHT, ...SELECTED];

export const SECTION_META = {
  lead: {
    title: 'Featured Repo',
    description: 'The lead feature on Work in Progress.',
    narrative: 'This project leads the collection because it shows the clearest intersection of WordPress security architecture, risky-action gating, and careful operational design.'
  },
  ai_docs: {
    title: 'AI-assisted docs and related work',
    description: 'A practical exploration of how AI can help write, review, and maintain technical documentation without sacrificing rigor, accuracy, or editorial judgment.',
    narrative: 'This project sits in the AI-assisted docs block, where the focus is on documentation systems, editorial standards, and durable operations guidance that can still benefit from AI-assisted workflows.'
  },
  spotlight: {
    title: 'Spotlight projects',
    description: 'Two projects I especially want to foreground right now.',
    narrative: 'This project sits in the spotlight section because it opens up a broader line of product, pricing, or identity work beyond the core WordPress security and documentation track.'
  },
  selected: {
    title: 'More selected work',
    description: 'Additional highlighted repositories spanning automation, identity, authentication, and editorial experiments.',
    narrative: 'This project is part of the selected work section, which rounds out the collection with adjacent experiments in automation, identity, authentication, and publishing design.'
  }
};

export const PROJECT_META = {
  'dknauss/wp-sudo': {
    displayTitle: 'wp-sudo',
    schemaType: 'SoftwareSourceCode',
    summary: 'WordPress risky-action gating with mandatory reauthentication, time-bounded sessions, 2FA support, rate limiting, and policy controls across wp-admin, REST, WP-CLI, Cron, WPGraphQL, and XML-RPC.',
    narrative: 'When a user attempts a gated action, Sudo intercepts the request at admin_init. It is the clearest expression of the security work in this collection: no role escalation, no new permissions, just a deliberate gate in front of dangerous actions.',
    focus: 'Gate & Log Dangerous Actions',
    subfocus: 'Protects Every Surface'
  },
  'dknauss/ai-assisted-docs': {
    displayTitle: 'AI-assisted docs',
    schemaType: 'TechArticle',
    summary: 'Methodology and process documentation for AI-assisted technical writing and review — a practical exploration of how AI can help without sacrificing rigor, accuracy, or editorial judgment.',
    narrative: 'This repo is the anchor for a broader documentation practice: using AI as support for drafting, review, and maintenance while keeping human editorial judgment, verification, and technical precision in charge.'
  },
  'dknauss/wordpress-runbook-template': {
    displayTitle: 'WordPress runbook template',
    schemaType: 'TechArticle',
    narrative: 'This runbook template turns operational knowledge into repeatable, reviewable procedures for deployment, maintenance, backup, incident response, and recovery in WordPress environments.'
  },
  'dknauss/wp-security-hardening-guide': {
    displayTitle: 'WordPress security hardening guide',
    schemaType: 'TechArticle',
    narrative: 'This guide focuses on security architecture and hardening as a system, connecting authentication, infrastructure, plugin risk, and supply chain defense into a more complete WordPress security posture.'
  },
  'dknauss/wp-security-benchmark': {
    displayTitle: 'WordPress security benchmark',
    schemaType: 'TechArticle',
    narrative: 'This benchmark translates hardening guidance into a more prescriptive control set for supported WordPress releases on Linux, making it easier to assess and improve a stack consistently.'
  },
  'dknauss/wp-security-style-guide': {
    displayTitle: 'WordPress security style guide',
    schemaType: 'TechArticle',
    narrative: 'This style guide supports the other documentation work by tightening security terminology, voice, and editorial standards so technical guidance stays accurate and clear.'
  },
  'newlocalmedia/capm-for-agencies': {
    displayTitle: 'CAPM for Agencies',
    schemaType: 'SoftwareSourceCode',
    summary: 'Risk-based pricing tools for global agencies and B-Corps built around the Capital Asset Pricing Model (CAPM) adapted from financial economics.',
    narrative: 'CAPM for Agencies adapts financial-economics thinking into pricing tools for agencies, B-Corps, and smaller consultancies. It matters here because it shows a product-minded line of work that sits alongside WordPress and documentation projects rather than inside them.',
    extraLinks: [
      {
        label: 'Try the main model',
        url: 'https://newlocalmedia.github.io/capm-for-agencies/'
      },
      {
        label: 'Try the small agency and freelancer version',
        url: 'https://newlocalmedia.github.io/capm-for-agencies/project-risk-check/index.html'
      }
    ]
  },
  'dknauss/author-identity': {
    displayTitle: 'Author Identity',
    schemaType: 'SoftwareSourceCode',
    narrative: 'Author Identity explores structured author data that can travel with the work across feeds, search, the fediverse, and AI systems, with WordPress acting as the source of truth.'
  },
  'dknauss/fedibots': {
    displayTitle: 'Fedibots',
    schemaType: 'SoftwareSourceCode',
    summary: 'PHP framework for creating write-only ActivityPub fediverse bots. Based on Terence Eden’s (@edent) model.',
    narrative: 'Fedibots highlights a lighter-weight automation track in the collection: practical publishing tooling built around ActivityPub, write-only bots, and a clear borrowing-and-building lineage from other open work.'
  },
  'dknauss/wordpress-2fa-ecosystem': {
    displayTitle: 'WordPress 2FA ecosystem',
    schemaType: 'SoftwareSourceCode',
    narrative: 'This developer reference documents how major WordPress 2FA plugins store secrets, identify users, and validate codes. It directly supports the design and interoperability work around Sudo.'
  },
  'dknauss/the-drafting-table': {
    displayTitle: 'The Drafting Table',
    schemaType: 'SoftwareSourceCode',
    narrative: 'The Drafting Table brings architectural motifs and historical texture into a full-site editing theme, showing the editorial and design side of the work alongside the more operational and security-heavy projects.'
  }
};

export function sectionForRepo(fullName) {
  if (fullName === LEAD_REPO) return 'lead';
  if (AI_DOCS_GROUP.includes(fullName)) return 'ai_docs';
  if (SPOTLIGHT.includes(fullName)) return 'spotlight';
  if (SELECTED.includes(fullName)) return 'selected';
  return 'selected';
}

export function projectPath(fullName) {
  const [owner, name] = fullName.split('/');
  return `/projects/${encodeURIComponent(owner)}/${encodeURIComponent(name)}/`;
}

export function projectUrl(fullName) {
  return `${SITE_URL}${projectPath(fullName)}`;
}
