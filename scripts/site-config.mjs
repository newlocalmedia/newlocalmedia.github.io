export const SITE_URL = 'https://newlocalmedia.github.io';
export const MAIN_SITE_URL = 'https://newlocalmedia.com/';
export const SITE_NAME = 'Work in Progress';
export const ORGANIZATION_NAME = 'New Local Media';
export const ACCOUNT_ORDER = ['newlocalmedia', 'dknauss'];
export const HOME_TITLE = `${SITE_NAME} | ${ORGANIZATION_NAME}`;
export const HOME_DESCRIPTION = 'Curated open-source projects from New Local Media and Dan Knauss on WordPress security, technical docs, identity, automation, and experiments.';
export const PROJECTS_INDEX_DESCRIPTION = 'Browse project directories and curated pages from New Local Media and Dan Knauss, including WordPress security, docs, identity, automation, and experiments.';

export const LEAD_REPO = 'dknauss/Keel';
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
  'dknauss/Sudo',
  'dknauss/fedibots',
  'dknauss/wordpress-2fa-ecosystem',
  'dknauss/the-drafting-table'
];
export const SHOWCASE = [
  'dknauss/Dirtbag'
];
export const BLOCKS_SHOWCASE = [
  'dknauss/Borges',
  'dknauss/Maestro'
];

export const CURATED_REPOS = [LEAD_REPO, ...AI_DOCS_GROUP, ...SHOWCASE, ...SPOTLIGHT, ...SELECTED, ...BLOCKS_SHOWCASE];

export function ownerArchiveDescription(owner) {
  if (owner === 'newlocalmedia') {
    return 'Curated New Local Media project pages featuring pricing tools, apps, and product experiments in the Work in Progress collection.';
  }
  return 'Curated Dan Knauss project pages on WordPress security, technical documentation, identity, automation, and publishing experiments.';
}

export const SECTION_META = {
  lead: {
    title: 'Featured Repo',
    description: 'The lead feature on Work in Progress.',
    narrative: 'This project leads the collection because it turns a long tail of WordPress hardening advice into defaults you can actually ship — each one individually toggleable, none of them assumed.'
  },
  showcase: {
    title: 'WordPress Block Themes',
    description: 'Block themes built on core blocks and plain HTML, with no build step standing between you and the markup.',
    narrative: 'This project sits in the block themes section, where the emphasis is on doing more with native WordPress and less with front-end machinery.'
  },
  ai_docs: {
    title: 'AI-Assisted Docs and Related Work',
    description: 'Agentic tools and processes to help humans write, review, and maintain technical documentation. Don\u2019t sacrifice \u2014 increase \u2014 your rigor, accuracy, and editorial judgment.',
    narrative: 'This project sits in the AI-assisted docs block, where the focus is on documentation systems, editorial standards, and durable operations guidance that can still benefit from AI-assisted workflows.'
  },
  spotlight: {
    title: 'Experiments',
    description: 'Open-ended work on product, pricing, and identity questions.',
    narrative: 'This project sits in the experiments section because it is an open-ended exploration of product, pricing, or identity questions rather than a finished tool.'
  },
  selected: {
    title: 'More Projects!',
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
  'dknauss/Keel': {
    displayTitle: 'Keel',
    pageTitle: 'Keel ⚓',
    schemaType: 'SoftwareSourceCode',
    release: { tag: 'v0.1.0-dev', url: 'https://github.com/dknauss/Keel/releases/tag/v0.1.0-dev' },
    license: { label: 'GPL-2.0-or-later', url: 'https://github.com/dknauss/Keel/blob/main/LICENSE' },
    playground: 'https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/dknauss/Keel/main/.wordpress-org/blueprints/blueprint.json',
    seoDescription: 'Sane, individually-toggleable WordPress defaults for security, updates, privacy, UX, and performance — 37 switches under one settings screen, with Site Health reporting and collision detection.',
    summary: 'Sane, individually-toggleable WordPress defaults across security, updates, privacy, UX, and performance — 37 switches in one place, nothing hidden and nothing all-or-nothing.',
    summaryHtml: 'Sane, individually-toggleable WordPress defaults across security, updates, privacy, UX, and performance — 37 switches in one place, nothing hidden and nothing all-or-nothing.',
    homeLeadExtraHtml: 'Most “disable it” plugins close the front door and leave a side one open. Measured against nine of the most-installed alternatives on wordpress.org — every cell a live HTTP or PHP probe rather than a readme claim — Keel is the only one in the field where <em>comments are off</em> holds below the presentation layer: <code>get_comments()</code> still returns approved comments on the others, and zero on Keel.',
    leadKicker: 'What if a fresh WordPress install just started out sensible?',
    leadNotes: [
      { title: 'Off Means Off', text: 'Disabling comments also stops <code>get_comments()</code> returning them and the comment feed answering — not just the presentation layer.' },
      { title: 'One Switch Each', text: 'All 37 defaults sit on a single screen at Settings &rarr; Keel, spanning security, updates, privacy, UX, and performance, and every one of them can be switched off on its own.' },
      { title: 'Reports Its Own Posture', text: 'Site Health lists every default and its current state, and flags when another plugin is contesting the same setting.' }
    ],
    whyHeading: 'Defaults You Can See and Switch Off',
    narrative: 'Keel flips a menu of sensible security, update, privacy, UX, and performance defaults onto any WordPress install — each one a switch under Settings → Keel. Nothing is hidden and nothing is all-or-nothing: you can see exactly what the plugin does to your site, in one place, and turn any piece off.',
    narrativeHtml: [
      'Keel flips a menu of sensible security, update, privacy, UX, and performance defaults onto any WordPress install — each one a switch under <strong>Settings → Keel</strong>. Nothing is hidden and nothing is all-or-nothing: you can see exactly what the plugin does to your site, in one place, and turn any piece off.',
      'The consistency is the point. Closing the REST API also removes the discovery link that advertises it; disabling comments also stops the comment feed answering. Where a trade is deliberate it is documented rather than papered over — oEmbed stays reachable when the REST gate is closed, alone among the four measured plugins that close REST outright, so other sites can still embed your posts instead of silently degrading them to bare links.',
      'One array — <code>keel_defaults_schema()</code> — is the single source of truth, driving both the settings screen and the bootstrap that wires each enabled default to its WordPress hook. Adding a default is one array entry plus one <code>if</code>-block; there is no new settings-page code to write.',
      'Two things it does that a settings screen usually does not: <strong>Site Health reports the posture</strong> read-only, so the site’s actual configuration is legible without clicking through tabs; and it <strong>notices when another plugin is setting the same defaults</strong>. Two plugins can both set a session length, WordPress keeps whichever ran last, and the loser’s settings screen goes on displaying a value the site does not use with no error anywhere. Keel reports the collision and names what is contesting what — it does not tell you which plugin to keep, because a plugin answering that is arguing for its own retention.'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/keel-preview.png',
      alt: 'Keel banner — a sailboat and keel mark beside the Keel wordmark and the tagline “Sensible defaults for steady sites.” on a dark navy field.'
    },
    focus: 'Keel for WordPress ⚓',
    subfocus: 'Pre-release (0.1.0-dev) and feature-complete for review: 37 defaults, the Site Health surface, and multisite-aware seeding are all in. What remains before a wordpress.org submission is packaging and verification, not features.',
    subfocusHtml: 'Pre-release (<code>0.1.0-dev</code>) and feature-complete for review: 37 defaults, the Site Health surface, and multisite-aware seeding are all in. What remains before a wordpress.org submission is packaging and verification, not features.',
    docs: [
      { label: 'README', description: 'What Keel does, how it is built, and how it compares to the alternatives.', url: 'https://github.com/dknauss/Keel/blob/main/README.md' },
      { label: 'Competitive Teardown Matrix', description: 'Nine of the most-installed “disable it” plugins measured by live HTTP and PHP probes rather than readme claims — including where Keel makes a deliberate trade.', url: 'https://github.com/dknauss/Keel/blob/main/docs/competitive-teardown-matrix.md' },
      { label: 'WordPress Default Settings', description: 'Every default Keel can set, what WordPress does without it, and why the opinion is worth having.', url: 'https://github.com/dknauss/Keel/blob/main/docs/wordpress-default-settings.md' },
      { label: 'Environment Detection', description: 'How Keel decides what is safe to seed on a given install, including multisite-aware behaviour.', url: 'https://github.com/dknauss/Keel/blob/main/docs/environment-detection.md' },
      { label: 'Roadmap', description: 'Milestones between the current pre-release and a wordpress.org submission.', url: 'https://github.com/dknauss/Keel/blob/main/ROADMAP.md' }
    ]
  },
  'dknauss/Sudo': {
    displayTitle: 'Sudo',
    pageTitle: 'Sudo \u26E9\uFE0F',
    slug: 'wp-sudo',
    schemaType: 'SoftwareSourceCode',
    archived: true,
    badgeLabel: 'Concluded',
    license: { label: 'GPL-2.0', url: 'https://github.com/dknauss/Sudo/blob/main/LICENSE' },
    seoDescription: 'A concluded WordPress research prototype on action-gated reauthentication, archived read-only with seven verified high-severity bypasses documented rather than fixed.',
    summary: 'A finished experiment in making WordPress ask for your password again before something dangerous happens. It did not work, and the seven ways around it are written up rather than patched, because the write-up is the point. Archived read-only — not for installation.',
    summaryHtml: 'A finished experiment in making WordPress ask for your password again before something dangerous happens. It did not work, and the seven ways around it are written up rather than patched, <em>because the write-up is the point</em>. Archived read-only — not for installation.',
    whyHeading: 'A Negative Result, Fully Documented',
    narrative: 'Sudo asked whether a plugin could make WordPress demand your password again right before something dangerous happens, no matter who you are. After building it and auditing it adversarially, the answer came back no — not the way this plugin went about it — and the evidence for that answer is what the project actually produced.',
    narrativeHtml: [
      'Sudo asked a simple question: could a plugin make WordPress demand your password again, right before something dangerous happens — deleting a user, installing a plugin, changing a critical setting — no matter who you are? After building it, testing it hard, and then auditing it adversarially, the answer came back <strong>no</strong>. Not the way this plugin went about it. The evidence for that answer is what the project actually produced.',
      'Here is the idea that failed, in plain terms. To stop a dangerous request, the plugin first has to <em>recognise</em> one. So it asked a yes-or-no question about every incoming request — is this the delete-a-user request? That yes-or-no question is what the write-up calls a <strong>predicate</strong>: a test that looks at the request and answers true or false. WordPress core asks its own version of the same question to decide what the request actually does. Two separate questions, written by two different people, in two different places, both supposed to mean the same thing.',
      'They did not mean the same thing. The audit found seven ways to slip past the gate, and each one is the same story: core asked its question slightly differently than the plugin asked its own. Core matched a web address while <em>ignoring</em> capital letters; the plugin matched while <em>respecting</em> them, so changing one letter to uppercase walked straight through. Core accepted a value from either the form data or the address bar; the plugin only looked at the form data, so moving it to the address bar made the gate blind. Core treated a save as "any POST request at all"; the plugin waited for a specific action name that never came. Neither side is wrong on its own — they simply drifted apart, and nothing in the system could notice they had.',
      'The genuinely instructive part is why an enormous test suite never caught it. There were 1,308 unit tests, 243 integration tests, 112 end-to-end tests, PHPStan at level 6, Psalm, and a mandatory adversarial review before release. None of them found any of the seven, and — this is the point — none of them <em>could</em> have. A test looks something like <em>build a fake request that means "delete a user", hand it to the gate, assert the gate stops it.</em> But the fake request is built from the plugin’s own idea of what that request looks like. If that idea is wrong, the test builds the wrong request, hands it to a matching wrong gate, and passes — confidently, in green, forever. The test and the code under test were reading from the same incorrect script. Every one of the six problems was found only by opening WordPress core and the plugin’s matcher next to each other and reading them line by line.',
      'The lesson generalises past this plugin: a test suite can only check that code agrees with your model of the world. When the model itself is wrong, more tests just means more confident wrongness. Nothing short of comparing your assumptions against the real thing will surface it.',
      'Start with <a href="https://github.com/dknauss/Sudo/blob/main/docs/sudo-architecture-history.md">the architecture history</a> for a plain-language walk through every approach the project tried, then <a href="https://github.com/dknauss/Sudo/blob/main/docs/finding.md">the finding</a> for the technical result and the narrow core primitive it argues for.',
      '<strong>Related Repo:</strong> <a href="https://newlocalmedia.github.io/projects/dknauss/wordpress-2fa-ecosystem/">WordPress 2FA Ecosystem Documentation</a>.'
    ],
    whyInsetHtml: [
      '<blockquote class="pull-quote pull-quote--poem"><p>So full of cracks,<br>the barrier gatehouse of Fuwa<br>lets both rain and moonlight in&mdash;<br>quietly exposed, yet enduring.</p><cite>Abutsu-ni, <em>Diary of the Waning Moon</em></cite></blockquote>',
      '<p>The verse was chosen at the start of the project, for the gate metaphor. It turned out to be the finding: this barrier had cracks too &mdash; seven of them, verified &mdash; and what endures is not the gate but the record of where the light came through.</p>'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/wp-sudo-preview.png',
      alt: 'Sudo for WordPress preview image using the Fuwa no Seki graphic.'
    },
    focus: 'Sudo for WordPress — concluded ⛩️',
    subfocus: 'Do not install this plugin. It contains seven verified high-severity bypasses of its own central claim, left documented rather than fixed because they are the finding. The implementation and test suites are retained read-only as the evidence those findings rest on — deleting them would leave assertions nobody could reproduce, which is the failure mode this project exists to document.',
    subfocusHtml: '<strong>Do not install this plugin.</strong> It contains seven verified high-severity bypasses of its own central claim, left documented rather than fixed because they <em>are</em> the finding. The implementation and test suites are retained read-only as the evidence those findings rest on \u2014 deleting them would leave assertions nobody could reproduce, which is the failure mode this project exists to document.',
    docs: [
      { label: 'Architecture History', description: 'Start here \u2014 a short, plain-language walk through every approach the project tried, what each attempted, and where each ran out.', url: 'https://github.com/dknauss/Sudo/blob/main/docs/sudo-architecture-history.md' },
      { label: 'The Finding', description: 'The technical result, the six axes of predicate drift, and the narrow WordPress core primitive it argues for.', url: 'https://github.com/dknauss/Sudo/blob/main/docs/finding.md' },
      { label: 'Audit Verification Record', description: 'Independent verification of all seven high-severity bypasses against WordPress 7.0 source.', url: 'https://github.com/dknauss/Sudo/blob/main/docs/audit-verification-record.md' },
      { label: 'Post-Mortem', description: 'How a heavily tested project failed to see what it had already diagnosed \u2014 1,663 tests that could not catch a wrong predicate.', url: 'https://github.com/dknauss/Sudo/blob/main/docs/post-mortem.md' },
      { label: 'Security Model', description: 'Threat model and the boundaries the prototype never claimed to cover.', url: 'https://github.com/dknauss/Sudo/blob/main/docs/security-model.md' },
      { label: 'Upstream Sources', description: 'Every third-party claim, with enclosing symbol, machine-checked.', url: 'https://github.com/dknauss/Sudo/blob/main/docs/upstream-sources.md' },
      { label: 'Project Status', description: 'The research-prototype classification and why it exists.', url: 'https://github.com/dknauss/Sudo/blob/main/PROJECT-STATUS.md' },
      { label: 'README', description: 'The conclusion in full \u2014 result, honest scope, and acknowledgements.', url: 'https://github.com/dknauss/Sudo/blob/main/readme.md' }
    ],
    screenshots: [
      { url: 'https://raw.githubusercontent.com/dknauss/Sudo/main/.wordpress-org/screenshot-1.png', alt: 'Sudo challenge page titled Confirm Your Identity, asking the current user for their password before a sudo session starts.', caption: 'Challenge page — the reauthentication interstitial shown before a gated action proceeds.' },
      { url: 'https://raw.githubusercontent.com/dknauss/Sudo/main/.wordpress-org/screenshot-2.png', alt: 'WordPress Plugins screen with a Sudo notice explaining that installing, activating, updating, and deleting require an active sudo session.', caption: 'Plugins screen — the gate announcing itself before plugin management is attempted.' },
      { url: 'https://raw.githubusercontent.com/dknauss/Sudo/main/.wordpress-org/screenshot-3.png', alt: 'Sudo Settings tab showing the optional MU-plugin early gate, quick policy presets, session duration, and entry point policies for REST, WP-CLI, Cron, and XML-RPC.', caption: 'Settings tab — early-gate status, policy presets, session duration, and per-surface entry-point policies.' },
      { url: 'https://raw.githubusercontent.com/dknauss/Sudo/main/.wordpress-org/screenshot-4.png', alt: 'Gated Actions tab listing plugin, theme, user, editor, options, update, and tools operations with rule identifiers and the admin, AJAX, and REST surfaces each covers.', caption: 'Gated Actions tab — every gated operation with its rule ID and covered surfaces.' },
      { url: 'https://raw.githubusercontent.com/dknauss/Sudo/main/.wordpress-org/screenshot-5.png', alt: 'Rule Tester tab with surface, method, URL, context, and REST parameter fields for evaluating a representative request.', caption: 'Rule Tester tab — evaluate a representative request shape without executing it.' },
      { url: 'https://raw.githubusercontent.com/dknauss/Sudo/main/.wordpress-org/screenshot-6.png', alt: 'Access tab listing administrators holding Sudo governance capabilities, with grant and revoke controls.', caption: 'Access tab — grant and revoke the dedicated Sudo governance capabilities.' },
      { url: 'https://raw.githubusercontent.com/dknauss/Sudo/main/.wordpress-org/screenshot-7.png', alt: 'Sudo Session Activity dashboard widget showing active sessions with time remaining, a policy summary, and a table of recent revoked and replayed events.', caption: 'Dashboard widget — active sessions, policy summary, and recent privilege-action events.' }
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
    license: { label: 'CC BY-SA 4.0', url: 'https://github.com/dknauss/ai-assisted-docs/blob/main/LICENSE' },
    seoDescription: 'Methodology and process docs for AI-assisted technical writing and review that increase rigor, accuracy, and editorial judgment.',
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
      attributionHtml: 'Tom Johnson, Google \u2014 <a href="https://idratherbewriting.com/blog/cyborg-model-emerging-talk"><em>I\u2019d Rather Be Writing</em></a>',
      leftColumn: true
    }
  },
  'dknauss/wordpress-runbook-template': {
    displayTitle: 'WordPress Runbook Template',
    schemaType: 'TechArticle',
    release: { tag: 'v3.1.0', url: 'https://github.com/dknauss/wordpress-runbook-template/releases/tag/v3.1.0' },
    license: { label: 'CC BY-SA 4.0', url: 'https://github.com/dknauss/wordpress-runbook-template/blob/main/LICENSE' },
    downloadCta: 'Get the Runbook \uD83C\uDFC3',
    whyHeading: 'Run WordPress with a Playbook',
    narrativeHtml: [
      'This runbook template is a 100-hour head start to help your team answer the question, <strong>\u201CHow do I do X?\u201D</strong> for a specific WordPress instance: numbered procedures, expected outcomes, rollback instructions, and copy-pasteable commands for the people running the site.',
      'Break-glass procedures are a natural fit for this format \u2014 the steps you take when normal access paths have failed. A break-glass entry names the trigger condition, the recovery path, and copy-pasteable commands.',
      'It is designed for sysadmins, DevOps engineers, and WordPress developers responsible for deployment, maintenance, backup verification, incident response, and disaster recovery.'
    ],
    whyInsetClass: 'break-glass-aside',
    whyInsetHtml: [
      '<h3 class="interior-aside-heading">What is a \u201CBreak-Glass\u201D procedure?</h3>',
      '<p>For example, a lost admin password entry might read:</p>',
      '<div class="inline-example">SSH into the server and run <code>wp user update admin --user_pass=\'&hellip;\'</code> via WP-CLI, then verify login succeeds before closing the incident.</div>',
      '<p>The runbook template has a section for these break-glass scenarios alongside your regular incident response procedures.</p>'
    ],
    docExcerpts: [
      {
        heading: '1.1 Purpose',
        intro: 'This runbook provides comprehensive operational guidance for managing, maintaining, securing, and troubleshooting a WordPress installation in production. It covers:',
        bullets: [
          'Daily maintenance and monitoring',
          'Emergency response procedures',
          'Backup and disaster recovery',
          'Security hardening and incident response',
          'Deployment workflows and rollback procedures'
        ]
      },
      {
        heading: '1.2 Audience',
        intro: 'This document is intended for:',
        bullets: [
          'WordPress system administrators',
          'DevOps engineers',
          'Site reliability engineers (SREs)',
          'Technical support staff',
          'Security operations center (SOC) personnel'
        ]
      }
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
    license: { label: 'CC BY-SA 4.0', url: 'https://github.com/dknauss/wp-security-hardening-guide/blob/main/LICENSE' },
    downloadCta: 'Get the Guide 📘',
    whyHeading: 'Design a Defensible WordPress Stack',
    narrativeHtml: [
      'This guide answers the question, <strong>\u201CWhat security measures should I implement and why?\u201D</strong> It summarizes the threat landscape, WordPress core security architecture, OWASP Top 10 coverage, server and application hardening, user authentication and session security, backup and recovery, supply chain risk, organizational security practices, and emerging AI-integration risks.',
      'It is written for developers, sysadmins, and security teams who need the rationale behind security decisions, not just a checklist of controls.'
    ],
    whyCards: [
      {
        title: 'Editorial Baseline & Sources',
        logo: {
          src: '/assets/owasp-white-logo.svg',
          alt: 'OWASP logo'
        },
        html: 'The editorial baseline is alignment with official WordPress Developer Documentation \u2014 especially the Advanced Administration Handbook and its security and hardening materials \u2014 with supporting reference to WordPress security documentation, the WordPress Security White Paper, WordPress Code Reference and core behavior, and standard industry sources such as OWASP, MDN, and CIS Benchmarks.'
      },
      {
        title: 'Human-Reviewed AI Process',
        html: 'The repository also documents a human-reviewed, AI-assisted editorial process across the related security document set: multiple models independently review for factual drift, outdated guidance, and cross-document misalignment, but every change is accepted, revised, or rejected by a human editor before publication.'
      }
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
    license: { label: 'CC BY-SA 4.0', url: 'https://github.com/dknauss/wp-security-benchmark/blob/main/LICENSE' },
    downloadCta: '📏 Get the Benchmark',
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
    license: { label: 'CC BY-SA 4.0', url: 'https://github.com/dknauss/wp-security-style-guide/blob/main/LICENSE' },
    whyHeading: 'Write About Security Without FUD',
    narrativeHtml: [
      'For open source software providers, this editorial reference answers the question, <strong>”How should I write about security?”</strong> It sets voice, tone, terminology, and technical formatting rules for people communicating about risk and vulnerability, with a special emphasis on the WordPress ecosystem. Build trust. Reduce fear, uncertainty, and doubt (FUD).',
      'Make your security writing clear, direct, and empowering — especially when you\u2019re explaining vulnerabilities, risk, remediation, and why our trust in open source is well-founded.'
    ],
    whyInsetHtml: [
      '<blockquote class="pull-quote"><p>“As cybersecurity leaders, we have to create our message of influence because security is a culture, and you need the business to take place and be part of that security culture.”</p><cite>— Britney Hommertzheim, BISO, Cardinal Health</cite></blockquote>'
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
    downloadCta: '📒 Get the Style Guide'
  },
  'newlocalmedia/capm-for-agencies': {
    displayTitle: 'CAPM for Agencies',
    schemaType: 'SoftwareSourceCode',
    homepageLabel: 'App',
    homeDescriptionHtml: 'Risk-based pricing tools for global agencies and B-Corps built around the Capital Asset Pricing Model (CAPM) adapted from financial economics. <a href="https://newlocalmedia.github.io/capm-for-agencies/">Main App</a> · <a href="https://newlocalmedia.github.io/capm-for-agencies/project-risk-check/index.html">Small agency and freelancer version</a>',
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
    homePrimaryImage: {
      url: 'https://newlocalmedia.github.io/capm-for-agencies/social/capm-for-agencies-banner.png',
      alt: 'CAPM for Agencies banner logo showing the hurdle-rate mark and wordmark.'
    },
    homeImageClass: 'spotlight-media--capm-banner',
    primaryImage: {
      url: 'https://newlocalmedia.github.io/capm-for-agencies/theory/figures/capm-comparison.png',
      alt: 'CAPM for Agencies comparison chart screenshot.'
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
        label: 'Small Agency App',
        url: 'https://newlocalmedia.github.io/capm-for-agencies/project-risk-check/index.html'
      },
      {
        label: 'Overview',
        url: 'https://newlocalmedia.github.io/capm-for-agencies/overview/index.html'
      }
    ]
  },
  'dknauss/author-identity': {
    displayTitle: 'Author Identity',
    schemaType: 'SoftwareSourceCode',
    license: { label: 'GPL-2.0', url: 'https://github.com/dknauss/author-identity/blob/main/LICENSE' },
    homepage: null,
    homeDescriptionHtml: 'Exploring structured author identity that travels with the work — across feeds, search, the fediverse, and AI — from one source of truth in WordPress.',
    summary: 'Exploring structured author identity that travels with the work — across feeds, search, the fediverse, and AI — from one source of truth in WordPress.',
    playground: 'https://playground.wordpress.net/?blueprint-url=https%3A%2F%2Fraw.githubusercontent.com%2Fdknauss%2Fauthor-identity%2Fcodex%2Fplayground-assets%2Fplayground%2Fpublic%2Foutput-demo.blueprint.json&url=%2F%3Fp%3D1&mode=browser-full-screen&login=no',
    whyHeading: 'Make Authorship Portable: An Exploration',
    extraLinks: [
      { label: 'Key Docs ↓', url: '#docs-title' }
    ],
    omitSummaryBoxLinks: true,
    docs: [
      { label: 'Vision', url: 'https://github.com/dknauss/author-identity/blob/main/docs/vision/author-identity-vision.md', description: 'High-level framing for the project: problem statement, goals, intended direction, and why author identity should travel with the work.' },
      { label: 'Architecture', url: 'https://github.com/dknauss/author-identity/blob/main/docs/research/exploratory/wordpress-semantic-publishing-architecture.md', description: 'Exploratory architecture for how WordPress can act as a source of truth for richer publishing metadata and portable authorship.' },
      { label: 'Ecosystem', url: 'https://github.com/dknauss/author-identity/blob/main/docs/research/exploratory/publishing-metadata-ecosystem.md', description: 'Landscape scan of the metadata standards, publishing systems, and discovery surfaces this project needs to fit into.' },
      { label: 'Protocol Coverage', url: 'https://github.com/dknauss/author-identity/blob/main/docs/research/current/protocol-coverage-map.md', description: 'Current map of which protocols, outputs, and identity surfaces are already covered, partially covered, or still open.' }
    ],
    relatedProjects: [
      {
        fullName: 'dknauss/Borges',
        label: 'Borges Bibliography Builder',
        description: 'WordPress block plugin that transforms DOI, BibTeX, and supported formatted citations into semantically rich, reference-manager friendly bibliographies — a natural companion for structured content authorship.'
      }
    ],
    narrativeHtml: [
      'Author Identity treats WordPress as a source of truth for richer author data that can travel with the work across feeds, search, the fediverse, and AI systems.',
      'The repository combines planning and research with the <code>byline-feed</code> plugin, which normalizes author data from core WordPress and major multi-author plugins, then emits structured outputs like feeds, JSON-LD, <code>fediverse:creator</code>, and AI-consent signals.'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/author-identity-preview.svg',
      alt: 'Diagram-style preview of Author Identity showing normalized author data in WordPress flowing to feeds, JSON-LD, fediverse metadata, and AI-rights signals.'
    },
    homePrimaryImage: {
      url: 'https://newlocalmedia.github.io/assets/author-identity-banner-home-v3.webp',
      alt: 'Editorial banner for Author Identity and Byline Feeds with protocol badges in the lower right.'
    },
    homeImageClass: 'spotlight-media--banner',
    focus: 'WordPress as a Personal Data Server for Authors',
    subfocus: 'Structured author identity that can travel with the work across feeds, schema, fediverse metadata, and AI-rights signals.'
  },
  'dknauss/fedibots': {
    displayTitle: 'Fedibots',
    schemaType: 'SoftwareSourceCode',
    license: { label: 'MIT', url: 'https://github.com/dknauss/fedibots/blob/main/LICENSE' },
    homeDescriptionHtml: 'PHP framework for creating write-only ActivityPub fediverse bots. Based on <a href="https://github.com/edent">Terence Eden&rsquo;s (@edent)</a> model.',
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
    license: { label: 'GPL-2.0', url: 'https://github.com/dknauss/wordpress-2fa-ecosystem/blob/main/LICENSE' },
    seoDescription: 'Developer reference for how major WordPress 2FA plugins store secrets, detect configured users, and validate codes for safe integrations.',
    summary: 'This is a developer reference exploring how major WordPress 2FA plugins store secrets, detect users, and validate codes. It includes Sudo bridge examples for WP 2FA, Wordfence, and AIOS.',
    summaryHtml: 'This is a developer reference exploring how major WordPress 2FA plugins store secrets, detect users, and validate codes. It includes <a href="https://newlocalmedia.github.io/projects/dknauss/wp-sudo/">Sudo</a> bridge examples for WP 2FA, Wordfence, and AIOS.',
    whyHeading: 'Bridge the WordPress 2FA Plugin Maze',
    relatedProjects: [
      {
        fullName: 'dknauss/Sudo',
        label: 'Sudo',
        description: 'WordPress risky-action gating with mandatory reauthentication, time-bounded sessions, 2FA support, rate limiting, and policy controls.'
      }
    ],
    narrativeHtml: [
      'These reference documents map how major WordPress 2FA plugins store secrets, detect configured users, and validate codes so other plugins can integrate with them safely.',
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
    tests: 'Playwright smoke, PHPUnit coverage',
    license: { label: 'GPL-2.0', url: 'https://github.com/dknauss/the-drafting-table/blob/main/LICENSE' },
    playground: 'https://playground.wordpress.net/?blueprint-url=https%3A%2F%2Fraw.githubusercontent.com%2Fdknauss%2Fthe-drafting-table%2Fmain%2Fplayground%2Fblueprint.json%3Fv%3D5e40e52',
    seoDescription: 'WordPress block theme with parchment textures, blueprint framing, refined typography, and portfolio-ready full-site editing patterns.',
    whyHeading: 'Build an Architect\u2019s Notebook in WordPress',
    relatedProjects: [
      {
        fullName: 'dknauss/Borges',
        label: 'Borges Bibliography Builder',
        description: 'WordPress block plugin for structured DOI, BibTeX, and citation input — static, semantic bibliographies for the block editor.'
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
  'dknauss/Borges': {
    displayTitle: 'Borges Bibliography Builder',
    slug: 'borges-bibliography-builder',
    legacySlugs: ['bibliography-builder', 'wp-bibliography-block'],
    schemaType: 'SoftwareSourceCode',
    homepage: 'https://wordpress.org/plugins/borges-bibliography-builder/',
    homepageLabel: 'WordPress.org',
    release: { tag: 'v1.0.0', url: 'https://github.com/dknauss/Borges/releases/tag/v1.0.0' },
    tests: 'Playwright smoke, PHP/WP runtime matrix',
    license: { label: 'GPL-2.0', url: 'https://github.com/dknauss/Borges/blob/main/LICENSE' },
    playground: 'https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/dknauss/Borges/main/playground/blueprint.json',
    detailLinksLabel: 'WordPress.org',
    extraLinks: [
      { label: 'WordPress.org', heroLabel: '🔌 WordPress.org', heroAfterRelease: true, url: 'https://wordpress.org/plugins/borges-bibliography-builder/' }
    ],
    seoDescription: 'WordPress bibliography block that turns DOI, BibTeX, and citation input into static, semantically rich, reference-manager friendly bibliographies.',
    summary: 'WordPress bibliography block that transforms DOI, BibTeX, and citation input into static, semantically rich, reference-manager friendly bibliographies.',
    whyHeading: 'Build Scholarly References That Travel',
    narrativeHtml: [
      'Named for Jorge Luis Borges, Borges Bibliography Builder brings order to scholarly references in WordPress — turning pasted DOI(s), BibTeX entries, and supported citations into clean, auto-sorted reference lists with semantic HTML and static saved output.',
      'It is reference-manager friendly by design, with portable outputs including CSL-JSON, BibTeX, RIS, DOI links, Schema.org JSON-LD, and optional COinS metadata for Zotero, Mendeley, EndNote, and related workflows.'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    homeImageClass: 'spotlight-media--banner',
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/borges-bibliography-builder-banner.png',
      alt: 'Borges Bibliography Builder banner graphic with stacked books, the project title, scholarly citation features, and a Borges quote.',
      width: 1544,
      height: 500
    },
    screenshots: [
      { url: 'https://raw.githubusercontent.com/dknauss/Borges/main/.wordpress-org/screenshot-1.png', alt: 'Borges Bibliography Builder shown in the WordPress block inserter.', caption: 'Discover Borges Bibliography Builder in the inserter.' },
      { url: 'https://raw.githubusercontent.com/dknauss/Borges/main/.wordpress-org/screenshot-2.png', alt: 'Borges Bibliography Builder import form with DOI, BibTeX, and citation text input.', caption: 'Paste DOI, BibTeX, or supported citation text into the import form.' },
      { url: 'https://raw.githubusercontent.com/dknauss/Borges/main/.wordpress-org/screenshot-3.png', alt: 'Borges Bibliography Builder manual entry interface with publication type and structured fields.', caption: 'Use Manual Entry to build a citation with publication type and structured fields.' },
      { url: 'https://raw.githubusercontent.com/dknauss/Borges/main/.wordpress-org/screenshot-4.png', alt: 'Borges Bibliography Builder settings sidebar with citation style, metadata output, and export actions.', caption: 'Configure citation style, metadata output, and export actions in the block settings sidebar.' },
      { url: 'https://raw.githubusercontent.com/dknauss/Borges/main/.wordpress-org/screenshot-5.png', alt: 'Rendered Borges Bibliography Builder output on the front end with linked URLs and semantic markup.', caption: 'View the rendered bibliography on the site front end with linked URLs and semantic output.' }
    ],
    relatedProjects: [
      {
        fullName: 'dknauss/the-drafting-table',
        label: 'The Drafting Table',
        description: 'A WordPress block theme with architectural design motifs — parchment textures, blueprint borders, and refined typography for portfolio and editorial work.'
      }
    ],
    focus: 'Scholarly References in the Block Editor',
    subfocus: 'DOI lookups, BibTeX input, and citation text converted to static, semantically rich bibliographies with portable outputs for research and publishing workflows.'
  },
  'dknauss/Maestro': {
    displayTitle: 'Admin Menu Maestro',
    slug: 'admin-menu-maestro',
    schemaType: 'SoftwareSourceCode',
    version: '1.0.0',
    tests: 'PHP unit/integration tests + Playwright E2E',
    license: { label: 'GPL-2.0-or-later', url: 'https://github.com/dknauss/Maestro/blob/main/LICENSE' },
    playground: 'https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/dknauss/Maestro/main/playground/blueprint-hosted.json',
    seoDescription: 'WordPress admin menu editor for renaming, reordering, icon swapping, and per-role visibility — edited directly on the menu itself.',
    summary: 'Orchestrate your WordPress admin menus by editing them in place. Rename, reorder, swap icons, and hide items per role, right on the menu.',
    whyHeading: 'Edit WordPress Admin Menus In Place',
    narrativeHtml: [
      'Admin Menu Maestro turns the WordPress admin menu itself into the editor: toggle <em>Edit Menu</em> from the admin bar, then rename items, drag them into a new order, swap top-level icons, and hide items for selected roles without leaving the menu.',
      'The configuration is global and sparse — a delta layered over the menu WordPress already builds each load — with debounced autosave, no separate settings screen, and a clear warning that per-role hiding is cosmetic menu decluttering, not access control.'
    ],
    omitGenericNarrative: true,
    homeImageClass: 'spotlight-media--banner',
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/admin-menu-maestro-banner.png',
      alt: 'Admin Menu Maestro banner with a stylized WordPress admin menu, conducting baton, and the tagline Orchestrate your menu in place, inside the dashboard.',
      width: 1544,
      height: 500
    },
    screenshots: [
      { url: 'https://raw.githubusercontent.com/dknauss/Maestro/main/.wordpress-org/screenshot-1.png', alt: 'Admin Menu Maestro in edit mode with the Posts menu item selected and the shared controls panel open.', caption: 'Edit mode with the Posts menu item selected and the shared controls panel open.' },
      { url: 'https://raw.githubusercontent.com/dknauss/Maestro/main/.wordpress-org/screenshot-2.png', alt: 'Admin Menu Maestro searchable icon picker with Dashicons and Bootstrap Icons tabs.', caption: 'Searchable icon picker with Dashicons and Bootstrap Icons tabs.' },
      { url: 'https://raw.githubusercontent.com/dknauss/Maestro/main/.wordpress-org/screenshot-3.png', alt: 'Admin Menu Maestro per-role visibility picker for hiding a menu item from selected roles.', caption: 'Per-role visibility picker for hiding a menu item from selected roles.' },
      { url: 'https://raw.githubusercontent.com/dknauss/Maestro/main/.wordpress-org/screenshot-4.png', alt: 'A renamed WordPress admin menu item in Admin Menu Maestro saved through debounced autosave.', caption: 'A renamed menu item saved through debounced autosave.' }
    ],
    focus: 'A Live Editor for the WordPress Admin Menu',
    subfocus: 'Rename, reorder, restyle, and hide admin-menu items in place — with role-aware visibility controls and a hosted Playground demo for fast testing.',
    relatedProjects: [
      {
        fullName: 'dknauss/Borges',
        label: 'Borges Bibliography Builder',
        description: 'Another WordPress plugin with strong editorial UX and a hosted Playground demo, but aimed at structured citations instead of admin menus.'
      }
    ],
    docs: [
      { label: 'README', description: 'Repository overview, feature summary, install steps, Playground demo, and development workflow.', url: 'https://github.com/dknauss/Maestro/blob/main/README.md' },
      { label: 'WordPress Readme', description: 'Plugin-directory style readme with usage notes, architecture summary, known limits, and changelog.', url: 'https://github.com/dknauss/Maestro/blob/main/readme.txt' },
      { label: 'SPEC', description: 'Durable specification for the plugin behavior, editor model, and data design.', url: 'https://github.com/dknauss/Maestro/blob/main/SPEC.md' },
      { label: 'Testing', description: 'How to run the unit, integration, Playground, and Playwright test layers.', url: 'https://github.com/dknauss/Maestro/blob/main/TESTING.md' },
      { label: 'FIXES', description: 'Resolved punch list and implementation notes for the v1 editor and autosave model.', url: 'https://github.com/dknauss/Maestro/blob/main/FIXES.md' }
    ]
  },
  'dknauss/Dirtbag': {
    displayTitle: 'Dirtbag',
    pageTitle: 'Dirtbag 🛻',
    schemaType: 'SoftwareSourceCode',
    release: { tag: 'v0.1.17', url: 'https://github.com/dknauss/Dirtbag/releases/tag/v0.1.17' },
    license: { label: 'GPL-2.0-or-later', url: 'https://github.com/dknauss/Dirtbag/blob/main/LICENSE' },
    playground: 'https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/dknauss/Dirtbag/main/playground/blueprint-stable.json',
    detailLinksLabel: 'WordPress.org',
    extraLinks: [
      { label: 'WordPress.org', heroLabel: '🎨 WordPress.org', heroAfterRelease: true, url: 'https://wordpress.org/themes/dirtbag/' },
      { label: 'Live Demo', url: 'https://dknauss.github.io/Dirtbag/' }
    ],
    seoDescription: 'A small WordPress block theme built on core blocks, web-safe fonts, and no build step — six style variations and a plain-HTML, view-source foundation for learning theme development.',
    summary: 'A super-simple WordPress block theme built on good bones and road grit — a lean utility vehicle for tinkering and practical self-education.',
    whyHeading: 'Do More With Less',
    narrativeHtml: [
      'Dirtbag is for people who want to learn WordPress theme design and front-end development by stripping down to fundamentals and building up from there. It favours plain HTML markup, as little CSS and JS as possible, core WordPress blocks, the fonts everyone already has, visible feeds, and old open-web habits over front-end machinery.',
      'Out of the box it is a plain, unstyled, brutalist foundation with a 1990s view-source feel, packaged with Web 1.0-inspired page templates, block patterns, and six global styles: Amber CRT, Blueprint (or BSOD), Hi-vis (No-Name), Minimalist, Newspaper, and Terminal. Unlike the default no-style style, those variations open the door to the full powers of the site editor if you want to go there.',
      'The constraints are the curriculum. <strong>No build step</strong> — edit files, run the package check, ship. <strong>No theme-authored JavaScript</strong> — core blocks may still load WordPress’s own Interactivity API, each with a plain-HTML fallback. <strong>No enqueued theme stylesheet</strong> — <code>style.css</code> carries the theme header and is otherwise empty, with styling handled through <code>theme.json</code>. WordPress core already prints global styles, layout, block styles, and the scripts core blocks need; Dirtbag avoids redoing what core or the browser does for you.'
    ],
    omitGenericNarrative: true,
    omitRelatedNarrative: true,
    primaryImage: {
      url: 'https://newlocalmedia.github.io/assets/dirtbag-preview.png',
      alt: 'Dirtbag theme card — the Dirtbag wordmark, a line-drawn pickup truck, and the tagline “Nothing but good bones and road grit.” over a list reading no build step, no theme JavaScript, web-safe fonts, style variations, core blocks first.'
    },
    focus: 'A WordPress Block Theme for Tinkering',
    subfocus: 'Small, simple, durable, accessible, and understandable — a block theme you can read end to end, listed in the WordPress.org theme directory with a live static demo and Playground blueprints.',
    docs: [
      { label: 'README', description: 'What the theme is, what it refuses to do, and how to get it running.', url: 'https://github.com/dknauss/Dirtbag/blob/main/README.md' },
      { label: 'Style Variations', description: 'The six global styles — Amber CRT, Blueprint, Hi-vis, Minimalist, Newspaper, and Terminal — and how they are built.', url: 'https://github.com/dknauss/Dirtbag/blob/main/docs/style-variations.md' },
      { label: 'Philosophy Audit', description: 'The theme measured against its own stated principles, with the places it falls short named.', url: 'https://github.com/dknauss/Dirtbag/blob/main/docs/philosophy-audit.md' },
      { label: 'Open-Web Site Files', description: 'Templates and docs for RSS, OPML, XFN, h-card, rel=me, now pages, and plain-text site-root files.', url: 'https://github.com/dknauss/Dirtbag/blob/main/docs/site-root-open-web-files.md' },
      { label: 'Static Export to GitHub Pages', description: 'How the backend-free demo site is crawled from WordPress and deployed as static files.', url: 'https://github.com/dknauss/Dirtbag/blob/main/docs/github-pages-static-export.md' },
      { label: 'Development', description: 'Local setup, the package check, and the contribution workflow.', url: 'https://github.com/dknauss/Dirtbag/blob/main/docs/development.md' }
    ]
  }
};

export function sectionForRepo(fullName) {
  if (fullName === LEAD_REPO) return 'lead';
  if (SHOWCASE.includes(fullName)) return 'showcase';
  if (AI_DOCS_GROUP.includes(fullName)) return 'ai_docs';
  if (SPOTLIGHT.includes(fullName)) return 'spotlight';
  if (SELECTED.includes(fullName)) return 'selected';
  if (BLOCKS_SHOWCASE.includes(fullName)) return 'blocks';
  return 'selected';
}

export function projectPath(fullName) {
  const [owner, name] = fullName.split('/');
  const slug = PROJECT_META[fullName]?.slug || name;
  return `/projects/${encodeURIComponent(owner)}/${encodeURIComponent(slug)}/`;
}

export function projectUrl(fullName) {
  return `${SITE_URL}${projectPath(fullName)}`;
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}
