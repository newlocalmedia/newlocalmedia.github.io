from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path('/Users/danknauss/Developer/GitHub/newlocalmedia.github.io')
ASSETS = ROOT / 'assets'
W, H = 1200, 630

FONT_CANDIDATES = [
    '/System/Library/Fonts/Supplemental/Arial Unicode.ttf',
    '/System/Library/Fonts/Supplemental/Arial.ttf',
    '/System/Library/Fonts/Supplemental/Helvetica.ttc',
]
FONT_PATH = next((p for p in FONT_CANDIDATES if Path(p).exists()), None)


def load_font(size: int):
    if FONT_PATH:
        return ImageFont.truetype(FONT_PATH, size)
    return ImageFont.load_default()


TITLE = load_font(56)
SUBTITLE = load_font(24)
PILL = load_font(19)
CARD_TITLE = load_font(24)
BODY = load_font(18)
SMALL = load_font(14)

WHITE = (248, 250, 255, 255)
MUTED = (221, 227, 242, 255)
MUTED_2 = (184, 196, 221, 255)
LINE = (255, 255, 255, 32)
PANEL = (18, 25, 41, 236)
BOX = (24, 31, 50, 245)
ACCENT = (129, 130, 255, 255)
GOLD = (242, 196, 109, 255)
GREEN = (72, 198, 150, 255)
RED = (210, 102, 109, 255)
SLATE = (61, 72, 102, 255)

SPECS = {
    'capm-for-agencies-preview.png': {
        'title': 'CAPM for Agencies',
        'subtitle': 'Risk-based pricing tools for agencies, consultants, and B-Corps built around CAPM adapted from financial economics.',
        'pills': [('Decision Cards', ACCENT), ('Project Risk Check', GOLD), ('Retrospective Review', GREEN)],
        'left_title': 'Full Model',
        'left_bullets': [
            'Systematic risk calibration',
            'Engagement risk scoring',
            'B Corp impact overlay',
            'Theory + calibration docs',
        ],
        'right_title': 'What It Helps You Price',
        'right_bullets': [
            'Quoted margins vs required margins',
            'Project and delivery uncertainty',
            'Smaller-agency pricing decisions',
            'Risk you can learn from over time',
        ],
        'footer': 'Main model • Simpler small-agency path • Shared hurdle math',
    },
    'wordpress-runbook-template-preview.png': {
        'title': 'WordPress Runbook Template',
        'subtitle': 'An operational reference for running a WordPress site: deployment, maintenance, backup, incident response, and recovery.',
        'pills': [('How To Do It', ACCENT), ('Rollback Ready', GOLD), ('WP-CLI Friendly', GREEN)],
        'left_title': 'What It Covers',
        'left_bullets': [
            'Site overview + environment reference',
            'Routine maintenance + deployments',
            'Backup verification + restore testing',
            'Incident response + disaster recovery',
        ],
        'right_title': 'Why It Is Useful',
        'right_bullets': [
            'Numbered procedures with expected outcomes',
            'Copy-pasteable commands and guardrails',
            'Quick-reference card for emergencies',
            'Built for ops teams, developers, and SREs',
        ],
        'footer': 'Operational reference • Not a checklist • Not an architecture guide',
    },
    'wp-security-hardening-guide-preview.png': {
        'title': 'WordPress Security Hardening Guide',
        'subtitle': 'Enterprise best practices and threat-mitigation guidance for the modern WordPress ecosystem.',
        'pills': [('What To Implement', ACCENT), ('Threat Context', GOLD), ('Architecture Guidance', GREEN)],
        'left_title': 'Focus Areas',
        'left_bullets': [
            'Core security architecture + release practice',
            'OWASP Top 10 in WordPress context',
            'Server hardening across Nginx, Apache, and PHP',
            'Authentication, sessions, and access control',
        ],
        'right_title': 'Also Covers',
        'right_bullets': [
            'Supply chain defense + SBOM thinking',
            'Generative AI and Shadow AI risk',
            'Implementation rationale, not just controls',
            'Written for admins, developers, and security teams',
        ],
        'footer': 'Advisory guide • Why it matters • What to implement next',
    },
    'wp-security-benchmark-preview.png': {
        'title': 'WordPress Security Benchmark',
        'subtitle': 'Prescriptive, auditable hardening controls for supported WordPress releases running on Linux.',
        'pills': [('Audit Checklist', ACCENT), ('Pass / Fail Controls', GOLD), ('Linux Stack', GREEN)],
        'left_title': 'Control Areas',
        'left_bullets': [
            'Web server and PHP runtime hardening',
            'Database isolation + least privilege',
            'Authentication, sessions, and access control',
            'Logging, backup, recovery, and multisite',
        ],
        'right_title': 'Each Control Includes',
        'right_bullets': [
            'Description and security rationale',
            'Audit command to verify current state',
            'Remediation step to close the gap',
            'Version targets for current supported stacks',
        ],
        'footer': 'What to verify • How to verify it • What to remediate',
    },
    'wp-security-style-guide-preview.png': {
        'title': 'WordPress Security Style Guide',
        'subtitle': 'A guide for writing about security with honesty and clarity.',
        'pills': [('Editorial Reference', ACCENT), ('Voice & Tone', GOLD), ('Technical Formatting', GREEN)],
        'left_title': 'What It Defines',
        'left_bullets': [
            'Principles and practices for security writing',
            'WordPress-specific terminology and definitions',
            'Audience-aware tone and explanation depth',
            'Formatting rules for code, acronyms, and risk',
        ],
        'right_title': 'Why It Matters',
        'right_bullets': [
            'Lead with solutions instead of fear.',
            'Describe vulnerabilities responsibly.',
            'Keep remediation language precise.',
            'Build trust through clear communication.',
        ],
        'footer': 'Editorial clarity • Accurate terminology • Better security communication',
    },
    'fedibots-preview.png': {
        'title': 'Fedibots',
        'subtitle': 'A PHP framework for creating write-only ActivityPub bots on the fediverse.',
        'pills': [('No Database', ACCENT), ('ActivityPub Server', GOLD), ('PHP 8.2+', GREEN)],
        'left_title': 'How It Works',
        'left_bullets': [
            'Each bot runs as its own standalone server',
            'Followers discover it by its fediverse handle',
            'CLI posting flows through an outbox to delivery',
            'HTTP signatures authenticate outbound requests',
        ],
        'right_title': 'Why It Stays Small',
        'right_bullets': [
            'No runtime Composer dependencies',
            'No containers and no persistent database',
            'Interactive setup generates keys and config',
            'Content lives in one replaceable provider class',
        ],
        'footer': 'Write-only bots • Clean-room ActivityPub • Minimal PHP stack',
    },
    'wordpress-2fa-ecosystem-preview.png': {
        'title': 'WordPress 2FA Ecosystem',
        'subtitle': 'A developer-oriented reference for how major WordPress 2FA plugins store secrets, detect users, and validate codes.',
        'pills': [('Ecosystem Survey', ACCENT), ('Bridge Guide', GOLD), ('Example Bridges', GREEN)],
        'left_title': 'What It Maps',
        'left_bullets': [
            'Secret storage and encryption patterns',
            'Configured-user detection logic',
            'Code validation and provider APIs',
            'Plugin-specific classes, methods, and caveats',
        ],
        'right_title': 'What It Enables',
        'right_bullets': [
            'Bridges for WP 2FA, Wordfence, and AIOS',
            'Safer delegation from plugins like Sudo',
            'Reference comparisons across major plugins',
            'Better interoperability and auditing',
        ],
        'footer': 'Plugin survey • Bridge patterns • Verification paths',
    },
    'the-drafting-table-preview.png': {
        'title': 'The Drafting Table',
        'subtitle': 'A full-site-editing WordPress theme inspired by the architect\'s studio: parchment, blueprint borders, and refined typography.',
        'pills': [('FSE Theme', ACCENT), ('Architectural Motifs', GOLD), ('Accessible Defaults', GREEN)],
        'left_title': 'Visual System',
        'left_bullets': [
            'Aged parchment and vellum texture',
            'Dot-grid overlays and blueprint frames',
            'Three-font architectural typography system',
            'Terra cotta accents drawn from Wright\'s palette',
        ],
        'right_title': 'Theme Features',
        'right_bullets': [
            'Style variations for multiple moods',
            'Patterns and templates for portfolio + journal work',
            'Companion plugin optional, not required',
            'Reduced-motion support and strong focus states',
        ],
        'footer': 'Studio notebook aesthetic • Full-site editing • Portfolio-ready',
    },
}


def rr(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def wrap_text(draw, text, font, max_width):
    words = text.split()
    lines = []
    current = ''
    for word in words:
        test = word if not current else f'{current} {word}'
        width = draw.textbbox((0, 0), test, font=font)[2]
        if width <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_lines(draw, lines, font, fill, x, y, line_gap=8):
    for line in lines:
        draw.text((x, y), line, font=font, fill=fill)
        bb = draw.textbbox((x, y), line, font=font)
        y = bb[3] + line_gap
    return y


def bullet_list(draw, bullets, x_bullet, x_text, y, max_width, bullet_fill):
    for bullet in bullets:
        draw.text((x_bullet, y), '•', font=BODY, fill=bullet_fill)
        lines = wrap_text(draw, bullet, BODY, max_width)
        y = draw_lines(draw, lines, BODY, MUTED, x_text, y, line_gap=5) + 4
    return y


def background(draw):
    for y in range(H):
        t = y / (H - 1)
        r = int(11 + (36 - 11) * t)
        g = int(18 + (41 - 18) * t)
        b = int(31 + (62 - 31) * t)
        draw.line((0, y, W, y), fill=(r, g, b, 255))
    rr(draw, (36, 36, W - 36, H - 36), 30, PANEL, outline=(255, 255, 255, 28))


def generate(filename, spec):
    img = Image.new('RGBA', (W, H), (11, 18, 31, 255))
    draw = ImageDraw.Draw(img)
    background(draw)

    x0 = 72
    draw.text((x0, 60), spec['title'], font=TITLE, fill=WHITE)
    subtitle_lines = wrap_text(draw, spec['subtitle'], SUBTITLE, 1040)
    subtitle_bottom = draw_lines(draw, subtitle_lines, SUBTITLE, MUTED, x0, 126, line_gap=6)

    # Derive pill position from actual subtitle height so long subtitles never
    # bleed into the pills. 184 is the minimum (matches original 1-line layout).
    pill_y = max(184, subtitle_bottom + 14)

    pill_specs = spec['pills']
    pill_widths = []
    for label, _color in pill_specs:
        bb = draw.textbbox((0, 0), label, font=PILL)
        pill_widths.append(max(220, bb[2] + 54))
    gap = 18
    total = sum(pill_widths) + gap * (len(pill_widths) - 1)
    x = (W - total) // 2
    for (label, color), width in zip(pill_specs, pill_widths):
        rr(draw, (x, pill_y, x + width, pill_y + 38), 10, color, outline=(255, 255, 255, 26))
        draw.text((x + width / 2, pill_y + 19), label, font=PILL, fill=WHITE, anchor='mm')
        x += width + gap

    # Card top sits 20 px below pill bottom; card bottom stays fixed at 560.
    card_top = pill_y + 38 + 20
    left = (72, card_top, 560, 560)
    right = (640, card_top, 1128, 560)
    rr(draw, left, 26, BOX, outline=LINE)
    rr(draw, right, 26, BOX, outline=LINE)

    draw.text((96, card_top + 26), spec['left_title'], font=CARD_TITLE, fill=GOLD)
    bullet_list(draw, spec['left_bullets'], 102, 120, card_top + 68, 400, GOLD)

    draw.text((664, card_top + 26), spec['right_title'], font=CARD_TITLE, fill=ACCENT)
    bullet_list(draw, spec['right_bullets'], 670, 688, card_top + 68, 400, ACCENT)

    draw.text((W / 2, 586), spec['footer'], font=SMALL, fill=MUTED_2, anchor='mm')
    img.save(ASSETS / filename)


for filename, spec in SPECS.items():
    generate(filename, spec)
    print(ASSETS / filename)
