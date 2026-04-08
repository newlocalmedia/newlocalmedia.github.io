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
export const BLOCKS_SHOWCASE = [
  'dknauss/wp-bibliography-block'
];

export const CURATED_REPOS = [LEAD_REPO, ...AI_DOCS_GROUP, ...SPOTLIGHT, ...SELECTED, ...BLOCKS_SHOWCASE];

export const SECTION_META = {
  lead: {
    title: 'Featured Repo',
    description: 'The lead feature on Work in Progress.',
    narrative: 'This project leads the collection because it shows the clearest intersection of WordPress security architecture, risky-action gating, and careful operational design.'
  },
  ai_docs: {
    title: 'AI-Assisted Docs and Related Work',
    description: 'Agentic tools and processes to help humans write, review, and maintain technical documentation. Don\u2019t sacrifice \u2014 increase \u2014 your rigor, accuracy, and editorial judgment.',
    narrative: 'This project sits in the AI-assisted docs block, where the focus is on documentation systems, editorial standards, and durable operations guidance that can still benefit from AI-assisted workflows.'
  },
  spotlight: {
    title: 'Spotlight Projects',
    description: 'Two projects I especially want to foreground right now.',
    narrative: 'This project sits in the spotlight section because it opens up a broader line of product, pricing, or identity work beyond the core WordPress security and documentation track.'
  },
  selected: {
    title: 'More Projects',
    description: 'Other things I\'ve been working on.',
    narrative: 'This project is part of the selected work section, which rounds out the collection with adjacent experiments in automation, identity, authentication, and publishing design.'
  },
  blocks: {
    title: 'WordPress Block Plugins',
    description: 'Block editor plugins that bring specialized content types and structured data to WordPress.',
    narrative: 'This project extends the WordPress block editor with structured content capabilities that go beyond what core blocks provide.'
  }
};

export const PROJECT_META = {
  'dknauss/wp-sudo': {
    displayTitle: 'Sudo',
    pageTitle: 'Sudo \u26E9\uFE0F',
    schemaType: 'SoftwareSourceCode',
    release: { tag: 'v2.14.0', url: 'https://github.com/dknauss/wp-sudo/releases/tag/v2.14.0' },
    summary: 'WordPress risky-action gating with mandatory reauthentication, time-bounded sessions, 2FA support, rate limiting, and policy controls across wp-admin, REST, WP-CLI, Cron, WPGraphQL, and XML-RPC.',
    summaryHtml: 'WordPress risky-action gating with mandatory reauthentication, time-bounded sessions, 2FA support, rate limiting, and policy controls across <code>wp-admin</code> <code>REST</code> <code>WP-CLI</code> <code>Cron</code> <code>WPGraphQL</code> <code>XML-RPC</code>.',
    whyHeading: 'Gate Any Privileged Action',
    narrative: 'When a user attempts a gated action, Sudo intercepts the request at `admin_init`. It is the clearest expression of the security work in this collection: no role escalation, no new permissions, just a deliberate gate in front of dangerous actions.',
    narrativeHtml: [
      'When a user attempts a gated action, Sudo intercepts the request at <code>admin_init</code>. It is the clearest expression of the security work in this collection: no role escalation, no new permissions, just a deliberate gate in front of dangerous actions.',
      'Key docs worth reading here include the <a href="https://github.com/dknauss/wp-sudo/blob/main/docs/security-model.md">Security Model</a>, the <a href="https://github.com/dknauss/wp-sudo/blob/main/docs/developer-reference.md">Developer Reference</a>, the <a href="https://github.com/dknauss/wp-sudo/blob/main/docs/two-factor-integration.md">Two-Factor Integration</a> guide, and the <a href="https://github.com/dknauss/wp-sudo/blob/main/docs/sudo-architecture-comparison-matrix.md">Sudo Architecture Comparison Matrix</a>.',
      'Related Project: <a href="https://newlocalmedia.github.io/projects/dknauss/wordpress-2fa-ecosystem/">WordPress 2FA Ecosystem Documentation</a>.'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/wp-sudo-preview.png',
      alt: 'Sudo for WordPress preview image using the Fuwa no Seki graphic.'
    },
    quote: {
      poem: true,
      noMarks: true,
      html: 'So full of cracks,<br>the barrier gatehouse of Fuwa<br>lets both rain and moonlight in\u2014<br>quietly exposed, yet enduring.',
      attributionHtml: 'Abatsu-ni, <em>Diary of the Waning Moon</em>'
    },
    focus: 'Sudo for WordPress! 🥪',
    subfocus: 'Risky actions — activating plugins, deleting users, changing key settings — are gated by a required reauthentication step, regardless of user role. Time-bounded sessions, 2FA support, rate limiting, and configurable policies for REST, WP-CLI, Cron, WPGraphQL, & XML-RPC. No role escalation, no new permissions — just a gate.',
    subfocusHtml: 'Risky actions \u2014 activating plugins, deleting users, changing key settings \u2014 are gated by a required reauthentication step, regardless of user role. Time-bounded sessions, 2FA support, rate limiting, and configurable policies for <code>REST</code> <code>WP-CLI</code> <code>Cron</code> <code>WPGraphQL</code> <code>XML-RPC</code>. No role escalation, no new permissions \u2014 just a gate.',
    docs: [
      { label: 'WordPress Core Authentication', description: 'How WordPress authentication works \u2014 request flow, session handling, cookies, and the nonce system.', url: 'https://github.com/dknauss/wp-sudo/blob/main/docs/wordpress-core-authentication.md' },
      { label: 'Two-Factor Authentication Flow', description: 'The full 2FA request lifecycle with a flowchart \u2014 and where Sudo intercepts.', url: 'https://github.com/dknauss/wp-sudo/blob/main/docs/two-factor-authentication-flow.md' },
      { label: 'Security Model', description: 'Threat model and design decisions behind Sudo\u2019s reauthentication architecture.', url: 'https://github.com/dknauss/wp-sudo/blob/main/docs/security-model.md' },
      { label: 'Developer Reference', description: 'Hooks, filters, API surface, and integration patterns for building on Sudo.', url: 'https://github.com/dknauss/wp-sudo/blob/main/docs/developer-reference.md' },
      { label: 'Two-Factor Integration', description: 'Bridging Sudo with WP 2FA, Wordfence, AIOS, and other plugins for delegated code verification.', url: 'https://github.com/dknauss/wp-sudo/blob/main/docs/two-factor-integration.md' },
      { label: 'FAQ', description: 'Answers to common questions about configuration, behavior, and edge cases.', url: 'https://github.com/dknauss/wp-sudo/blob/main/docs/FAQ.md' },
      { label: 'Architecture Comparison Matrix', description: 'How Sudo compares to other re-auth and session-gating approaches.', url: 'https://github.com/dknauss/wp-sudo/blob/main/docs/sudo-architecture-comparison-matrix.md' },
      { label: 'README', description: 'Installation, configuration, and usage overview.', url: 'https://github.com/dknauss/wp-sudo/blob/main/readme.md' }
    ],
    relatedProjects: [
      {
        fullName: 'dknauss/wordpress-2fa-ecosystem',
        label: 'WordPress 2FA Ecosystem',
        description: 'Reference mapping how major WordPress 2FA plugins store secrets, detect users, and validate codes — the bridge guide for Sudo 2FA integration.'
      }
    ]
  },
  'dknauss/ai-assisted-docs': {
    displayTitle: 'AI-Assisted Docs',
    schemaType: 'TechArticle',
    summary: 'Methodology and process documentation for AI-assisted technical writing and review — a practical exploration of how AI can help without sacrificing rigor, accuracy, or editorial judgment.',
    whyHeading: 'Build an Agentic Editorial Team',
    narrativeHtml: [
      'Create and maintain technical documentation with multi-model or multi-agent editorial teams.',
      'This repository contains a methodology, process documentation, and working scripts for AI-assisted technical writing and editorial review. It includes agent roles, skills, and Behavior-Driven Development (BDD) scenarios for researching, updating, verifying, aligning, and cross-referencing complex technical documents for different audiences and use cases.'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/ai-assisted-docs-preview.png',
      alt: 'Diagram-style preview of AI-Assisted Docs showing agentic editorial roles, review stages, and BDD scenarios for technical documentation.'
    },
    subfocus: 'Agentic tools and processes to help humans write, review, and maintain technical documentation. Don\u2019t sacrifice \u2014 increase \u2014 your rigor, accuracy, and editorial judgment.',
    subfocusHtml: 'Agentic tools and processes to help humans write, review, and maintain technical documentation. Don\u2019t sacrifice \u2014 <em>increase</em> \u2014 your rigor, accuracy, and editorial judgment.',
    docs: [
      { label: 'README', description: 'Overview of the methodology, agent roles, and how to use this repository.', url: 'https://github.com/dknauss/ai-assisted-docs/blob/main/README.md' },
      { label: 'AGENTS.md', description: 'Agent configuration, roles, and capabilities for the editorial review team.', url: 'https://github.com/dknauss/ai-assisted-docs/blob/main/AGENTS.md' },
      { label: 'Review Methodology', description: 'How multi-model editorial review works \u2014 rounds, synthesis, and audit trails.', url: 'https://github.com/dknauss/ai-assisted-docs/blob/main/reviews/README.md' },
      { label: 'Architecture', description: 'Technical architecture of the multi-model documentation review pipeline.', url: 'https://github.com/dknauss/ai-assisted-docs/blob/main/.planning/codebase/ARCHITECTURE.md' },
      { label: 'WordPress Docs Skills', description: 'Reusable agent skill configurations for WordPress documentation tasks.', url: 'https://github.com/dknauss/ai-assisted-docs/tree/main/wp-docs-skills' },
      { label: 'BDD Scenarios', description: 'Behavior-driven test scenarios for researching, reviewing, and validating technical docs.', url: 'https://github.com/dknauss/ai-assisted-docs/tree/main/scenarios' }
    ],
    quote: {
      text: 'The tech writer isn\u2019t being replaced by AI, but rather augmented by AI as a co-partner in developing documentation.',
      attribution: 'Tom Johnson, Google \u2014 I\u2019d Rather Be Writing',
      attributionHtml: 'Tom Johnson, Google \u2014 <a href="https://idratherbewriting.com/blog/cyborg-model-emerging-talk"><em>I\u2019d Rather Be Writing</em></a>'
    }
  },
  'dknauss/wordpress-runbook-template': {
    displayTitle: 'WordPress Runbook Template',
    schemaType: 'TechArticle',
    release: { tag: 'v3.1.0', url: 'https://github.com/dknauss/wordpress-runbook-template/releases/tag/v3.1.0' },
    whyHeading: 'Run WordPress with a Playbook',
    narrativeHtml: [
      'This template answers <strong>“how do I do it?”</strong> for a specific WordPress installation: numbered procedures, expected outcomes, rollback instructions, and copy-pasteable commands for the people running the site.',
      'It is designed for sysadmins, DevOps engineers, and WordPress developers responsible for deployment, maintenance, backup verification, incident response, and disaster recovery.'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/wordpress-runbook-template-preview.png',
      alt: 'Generated preview image for the WordPress Runbook Template showing operational coverage and runbook features.'
    },
    focus: 'How Do I Do It?',
    subfocus: 'A runbook template for real operational work: numbered steps, expected outcomes, rollback paths, and copy-pasteable procedures for WordPress environments.',
    downloads: [
      { label: 'PDF',      url: 'https://raw.githubusercontent.com/dknauss/wordpress-runbook-template/main/WP-Operations-Runbook.pdf' },
      { label: 'DOCX',     url: 'https://raw.githubusercontent.com/dknauss/wordpress-runbook-template/main/WP-Operations-Runbook.docx' },
      { label: 'EPUB',     url: 'https://raw.githubusercontent.com/dknauss/wordpress-runbook-template/main/WP-Operations-Runbook.epub' },
      { label: 'Markdown', url: 'https://raw.githubusercontent.com/dknauss/wordpress-runbook-template/main/WP-Operations-Runbook.md' }
    ]
  },
  'dknauss/wp-security-hardening-guide': {
    displayTitle: 'WordPress Security Hardening Guide',
    schemaType: 'TechArticle',
    release: { tag: 'v1.1.0', url: 'https://github.com/dknauss/wp-security-hardening-guide/releases/tag/v1.1.0' },
    whyHeading: 'Design a Defensible WordPress Stack',
    narrativeHtml: [
      'This guide answers <strong>“what should I implement and why?”</strong> It brings WordPress core security, server hardening, authentication, supply chain defense, and emerging AI risk into one architecture-level document.',
      'It is written for developers, sysadmins, and security teams who need the rationale behind security decisions, not just a checklist of controls.'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/wp-security-hardening-guide-preview.png',
      alt: 'Generated preview image for the WordPress Security Hardening Guide showing key focus areas and guidance themes.'
    },
    focus: 'What Should You Implement — and Why?',
    subfocus: 'Threat context, architecture guidance, and practical hardening advice for modern WordPress stacks.',
    downloads: [
      { label: 'PDF',      url: 'https://raw.githubusercontent.com/dknauss/wp-security-hardening-guide/main/WordPress-Security-Hardening-Guide.pdf' },
      { label: 'DOCX',     url: 'https://raw.githubusercontent.com/dknauss/wp-security-hardening-guide/main/WordPress-Security-Hardening-Guide.docx' },
      { label: 'EPUB',     url: 'https://raw.githubusercontent.com/dknauss/wp-security-hardening-guide/main/WordPress-Security-Hardening-Guide.epub' },
      { label: 'Markdown', url: 'https://raw.githubusercontent.com/dknauss/wp-security-hardening-guide/main/WordPress-Security-Hardening-Guide.md' }
    ]
  },
  'dknauss/wp-security-benchmark': {
    displayTitle: 'WordPress Security Benchmark',
    schemaType: 'TechArticle',
    release: { tag: 'v1.1.0', url: 'https://github.com/dknauss/wp-security-benchmark/releases/tag/v1.1.0' },
    summary: 'WordPress security benchmark: prescriptive full-stack hardening controls for current supported WordPress releases on the LEMP/LAMP stack.',
    whyHeading: 'Audit the Stack Control by Control',
    narrativeHtml: [
      'This benchmark answers the question, <strong>\u201CWhat do I verify?\u201D</strong> It is meant for security engineers, auditors, and sysadmins who need prescriptive controls they can assess consistently across a real stack.',
      'Controls are organized in two tiers. <strong>Essential Hardening</strong> covers the baseline configurations required for any WordPress site on this stack \u2014 the minimum standard for a defensible deployment. <strong>Defense-in-Depth</strong> covers additional controls that reduce attack surface, limit lateral movement, and increase resilience \u2014 recommended for production environments or any site where the cost of compromise is high.',
      'Each control includes a description, a rationale, an audit command, and a remediation step for supported WordPress releases on the LEMP/LAMP stack.'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/wp-security-benchmark-preview.png',
      alt: 'Generated preview image for the WordPress Security Benchmark showing auditable control areas and benchmark structure.'
    },
    focus: 'What Do You Verify?',
    subfocus: 'A prescriptive benchmark with pass-fail controls, audit commands, remediation steps, and target versions for current supported stacks.',
    downloads: [
      { label: 'PDF',      url: 'https://raw.githubusercontent.com/dknauss/wp-security-benchmark/main/WordPress-Security-Benchmark.pdf' },
      { label: 'DOCX',     url: 'https://raw.githubusercontent.com/dknauss/wp-security-benchmark/main/WordPress-Security-Benchmark.docx' },
      { label: 'EPUB',     url: 'https://raw.githubusercontent.com/dknauss/wp-security-benchmark/main/WordPress-Security-Benchmark.epub' },
      { label: 'Markdown', url: 'https://raw.githubusercontent.com/dknauss/wp-security-benchmark/main/WordPress-Security-Benchmark.md' }
    ]
  },
  'dknauss/wp-security-style-guide': {
    displayTitle: 'WordPress Security Style Guide',
    schemaType: 'TechArticle',
    release: { tag: 'v1.1.0', url: 'https://github.com/dknauss/wp-security-style-guide/releases/tag/v1.1.0' },
    whyHeading: 'Write About Security Without FUD',
    narrativeHtml: [
      'For open source software providers, this editorial reference answers the question, <strong>”How should I write about security?”</strong> It sets voice, tone, terminology, and technical formatting rules for people communicating about risk and vulnerability, with a special emphasis on the WordPress ecosystem. Build trust. Reduce fear, uncertainty, and doubt (FUD).',
      'Make your security writing clear, direct, and empowering — especially when you\u2019re explaining vulnerabilities, risk, remediation, and why our trust in open source is well-founded.'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/wp-security-style-guide-preview.png',
      alt: 'Generated preview image for the WordPress Security Style Guide showing editorial focus areas and communication principles.'
    },
    focus: 'How Do You Write About Security, Risk, and Vulnerability?',
    subfocus: 'Following these editorial standards for voice, tone, terminology, formatting, and responsible vulnerability disclosure will improve how you communicate about security in WordPress or any open source software.',
    downloads: [
      { label: 'PDF',      url: 'https://raw.githubusercontent.com/dknauss/wp-security-style-guide/main/WP-Security-Style-Guide.pdf' },
      { label: 'DOCX',     url: 'https://raw.githubusercontent.com/dknauss/wp-security-style-guide/main/WP-Security-Style-Guide.docx' },
      { label: 'EPUB',     url: 'https://raw.githubusercontent.com/dknauss/wp-security-style-guide/main/WP-Security-Style-Guide.epub' },
      { label: 'Markdown', url: 'https://raw.githubusercontent.com/dknauss/wp-security-style-guide/main/WP-Security-Style-Guide.md' }
    ],
    quote: {
      text: 'As cybersecurity leaders, we have to create our message of influence because security is a culture, and you need the business to take place and be part of that security culture.',
      attribution: 'Britney Hommertzheim',
      belowDetails: true
    }
  },
  'newlocalmedia/capm-for-agencies': {
    displayTitle: 'CAPM for Agencies',
    schemaType: 'SoftwareSourceCode',
    summaryHtml: 'Risk-based pricing tools for global agencies and B-Corps built around the Capital Asset Pricing Model (CAPM) adapted from financial economics. <a href="https://newlocalmedia.github.io/capm-for-agencies/">Main App</a> · <a href="https://newlocalmedia.github.io/capm-for-agencies/project-risk-check/index.html">Small agency and freelancer version</a>',
    summary: 'Risk-based pricing tools for global agencies and B-Corps built around the Capital Asset Pricing Model (CAPM) adapted from financial economics.',
    whyHeading: 'What is CAPM?',
    narrativeHtml: [
      'CAPM has its haters in finance, including Warren Buffett and Charlie Munger — and for good reasons. We’re not using it to help you diversity your portfolio or price a possible acquisition. It works well for anyone bidding on projects where a price is needed before planning can be done. Connect risk to costs and deal pricing in a disciplined way you can learn from over time.',
      'This repository ships two related apps: the fuller <a href="https://newlocalmedia.github.io/capm-for-agencies/"><strong>Decision Cards</strong></a> model and <a href="https://newlocalmedia.github.io/capm-for-agencies/project-risk-check/index.html"><strong>Project Risk Check</strong></a>, a simpler model for small agencies and freelancers. Together they translate systematic risk, engagement risk, and pricing discipline into something a working agency can actually use.'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    relatedProjects: [
      {
        fullName: 'dknauss/ai-assisted-docs',
        label: 'AI-Assisted Documentation',
        description: 'Methodology and process documentation for AI-assisted technical writing and review — a practical exploration.'
      }
    ],
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/capm-for-agencies-preview.png',
      alt: 'Generated preview image for CAPM for Agencies showing the two pricing tools and the project risk model.'
    },
    focus: 'CAPM Adapted for Agencies, Consultants, and B-Corps',
    subfocus: 'Visualize how baseline, market, and risk-adjusted pricing move apart as project and delivery risk increase.',
    omitSummaryBoxLinks: true,
    version: '0.1.1',
    tests: '46 automated Node tests',
    license: {
      label: 'CC BY-SA 4.0',
      url: 'https://creativecommons.org/licenses/by-sa/4.0/'
    },
    extraLinks: [
      {
        label: 'Main App',
        url: 'https://newlocalmedia.github.io/capm-for-agencies/'
      },
      {
        label: 'Small agency and freelancer version',
        url: 'https://newlocalmedia.github.io/capm-for-agencies/project-risk-check/index.html'
      }
    ]
  },
  'dknauss/author-identity': {
    displayTitle: 'Author Identity',
    schemaType: 'SoftwareSourceCode',
    whyHeading: 'Make Authorship Portable',
    relatedProjects: [
      {
        fullName: 'dknauss/wp-bibliography-block',
        label: 'Bibliography Block',
        description: 'WordPress block plugin that converts DOI and BibTeX citations into semantically rich, auto-sorted bibliography lists — a natural companion for structured content authorship.'
      }
    ],
    narrativeHtml: [
      'Author Identity treats WordPress as a source of truth for richer author data that can travel with the work across feeds, search, the fediverse, and AI systems.',
      'The repository combines planning and research with the <code>byline-feed</code> plugin, which normalizes author data from core WordPress and major multi-author plugins, then emits structured outputs like feeds, JSON-LD, <code>fediverse:creator</code>, and AI-consent signals.'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/author-identity-preview.png',
      alt: 'Diagram-style preview of Author Identity showing normalized author data in WordPress flowing to feeds, JSON-LD, fediverse metadata, and AI-rights signals.'
    },
    focus: 'WordPress as a Personal Data Server for Authors',
    subfocus: 'Structured author identity that can travel with the work across feeds, schema, fediverse metadata, and AI-rights signals.'
  },
  'dknauss/fedibots': {
    displayTitle: 'Fedibots',
    schemaType: 'SoftwareSourceCode',
    summary: 'PHP framework for creating write-only ActivityPub fediverse bots. Based on Terence Eden\u2019s (@edent) model.',
    relatedProjects: [],
    whyHeading: 'Publish to the Fediverse with Minimal Machinery',
    narrativeHtml: [
      'Fedibots is a clean-room PHP framework for write-only ActivityPub bots: each bot is a standalone server that followers can discover, follow, and receive posts from.',
      'It deliberately keeps the stack small — no database, no Composer dependencies at runtime, no containers — while still handling HTTPS identity, HTTP signatures, cron posting, and delivery to followers’ inboxes.'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/fedibots-preview.png',
      alt: 'Generated preview image for Fedibots showing the lightweight ActivityPub bot framework and its architecture.'
    },
    focus: 'Write-Only ActivityPub Bots',
    subfocus: 'A minimal PHP framework for bots that post to the fediverse without adding a database, containers, or runtime dependency sprawl.'
  },
  'dknauss/wordpress-2fa-ecosystem': {
    displayTitle: 'WordPress 2FA Ecosystem',
    schemaType: 'SoftwareSourceCode',
    summary: 'This is a developer reference exploring how major WordPress 2FA plugins store secrets, detect users, and validate codes. It includes Sudo bridge examples for WP 2FA, Wordfence, and AIOS.',
    summaryHtml: 'This is a developer reference exploring how major WordPress 2FA plugins store secrets, detect users, and validate codes. It includes <a href="https://newlocalmedia.github.io/projects/dknauss/wp-sudo/">Sudo</a> bridge examples for WP 2FA, Wordfence, and AIOS.',
    whyHeading: 'Bridge the WordPress 2FA Plugin Maze',
    relatedProjects: [
      {
        fullName: 'dknauss/wp-sudo',
        label: 'Sudo',
        description: 'WordPress risky-action gating with mandatory reauthentication, time-bounded sessions, 2FA support, rate limiting, and policy controls.'
      }
    ],
    narrativeHtml: [
      'This reference maps how major WordPress 2FA plugins store secrets, detect configured users, and validate codes so other plugins can integrate with them safely.',
      'It includes an ecosystem survey, a bridge-development guide, and example bridges for WP 2FA, Wordfence, and AIOS — especially useful for <a href="https://newlocalmedia.github.io/projects/dknauss/wp-sudo/">Sudo</a> and other plugins that need to delegate code verification.'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/wordpress-2fa-ecosystem-preview.png',
      alt: 'Generated preview image for the WordPress 2FA Ecosystem reference showing surveyed plugins and bridge guidance.'
    },
    focus: 'One Reference, Many 2FA Implementations',
    subfocus: 'Map secret storage, user detection, validation paths, and bridge patterns across the major WordPress 2FA plugins.'
  },
  'dknauss/the-drafting-table': {
    displayTitle: 'The Drafting Table',
    schemaType: 'SoftwareSourceCode',
    release: { tag: 'v0.6.1', url: 'https://github.com/dknauss/the-drafting-table/releases/tag/v0.6.1' },
    whyHeading: 'Build an Architect\u2019s Notebook in WordPress',
    relatedProjects: [
      {
        fullName: 'dknauss/wp-bibliography-block',
        label: 'Bibliography Block',
        description: 'WordPress block plugin for structured DOI and BibTeX citations — semantic, auto-sorted bibliography lists for the block editor.'
      }
    ],
    narrativeHtml: [
      'The Drafting Table turns a block theme into an architect’s studio: aged parchment, dot-grid overlays, blueprint borders, and refined typography inspired by Frank Lloyd Wright-era materials.',
      'It pairs a strong visual system with practical theme work — full-site editing, style variations, patterns, page templates, and accessibility-minded defaults.'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/the-drafting-table-preview.png',
      alt: 'The Drafting Table WordPress block theme — aged parchment textures, blueprint borders, dot-grid overlays, and refined typography in a full-site editing layout.',
      width: 1200,
      height: 900
    },
    focus: 'An Architect’s Notebook as a WordPress Theme',
    subfocus: 'A full-site editing theme with parchment textures, blueprint framing, strong typography, and portfolio-ready patterns.'
  },
  'dknauss/wp-bibliography-block': {
    displayTitle: 'Bibliography Block',
    schemaType: 'SoftwareSourceCode',
    release: { tag: 'v1.0.0', url: 'https://github.com/dknauss/wp-bibliography-block/releases/tag/v1.0.0' },
    summary: 'WordPress block plugin that converts DOI and BibTeX citations into semantically rich, auto-sorted bibliography lists.',
    whyHeading: 'Structured Citations in the Block Editor',
    narrativeHtml: [
      'The Bibliography Block plugin brings proper academic and reference citations to the WordPress block editor — converting DOI lookups and BibTeX entries into clean, auto-sorted bibliography lists with semantic HTML.',
      'It extends WordPress content authorship with structured, reusable citations that hold up to scrutiny in research, journalism, and technical writing contexts.'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/wp-bibliography-block-preview.png',
      alt: 'WordPress block editor screenshot showing the Bibliography Block with three formatted citations rendered in edit mode.',
      width: 1280,
      height: 900
    },
    relatedProjects: [
      {
        fullName: 'dknauss/the-drafting-table',
        label: 'The Drafting Table',
        description: 'A WordPress block theme with architectural design motifs — parchment textures, blueprint borders, and refined typography for portfolio and editorial work.'
      }
    ],
    focus: 'Academic Citations in the Block Editor',
    subfocus: 'DOI lookups and BibTeX input converted to semantically rich, auto-sorted bibliography lists — structured citations that travel with the work.'
  }
};

export function sectionForRepo(fullName) {
  if (fullName === LEAD_REPO) return 'lead';
  if (AI_DOCS_GROUP.includes(fullName)) return 'ai_docs';
  if (SPOTLIGHT.includes(fullName)) return 'spotlight';
  if (SELECTED.includes(fullName)) return 'selected';
  if (BLOCKS_SHOWCASE.includes(fullName)) return 'blocks';
  return 'selected';
}

export function projectPath(fullName) {
  const [owner, name] = fullName.split('/');
  return `/projects/${encodeURIComponent(owner)}/${encodeURIComponent(name)}/`;
}

export function projectUrl(fullName) {
  return `${SITE_URL}${projectPath(fullName)}`;
}
