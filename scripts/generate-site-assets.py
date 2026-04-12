from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
ASSETS.mkdir(exist_ok=True)

LOGO = ASSETS / 'new-local-media-logo.png'
OG = ASSETS / 'og-image.png'
ICON_512 = ASSETS / 'icon-512.png'
APPLE = ASSETS / 'apple-touch-icon.png'
FAVICON = ASSETS / 'favicon-32.png'

BG = '#0D1B2A'
BG2 = '#071018'
PRIMARY = '#29ABE0'
FOREGROUND = '#DCF0F9'
WHITE = '#ffffff'
ACCENT = '#7EE8A2'
GOLD = '#F5A623'

FONT_REG = '/System/Library/Fonts/Supplemental/Verdana.ttf'
FONT_BOLD = '/System/Library/Fonts/Supplemental/Verdana Bold.ttf'


def font(path, size):
    return ImageFont.truetype(path, size=size)


def rounded_logo(size=160):
    logo = Image.open(LOGO).convert('RGBA').resize((size, size), Image.LANCZOS)
    mask = Image.new('L', (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size, size), radius=int(size * 0.22), fill=255)
    # Multiply original alpha with mask so the ring's transparency is preserved —
    # putalpha() alone replaces alpha entirely, making transparent pixels opaque (noise).
    r, g, b, a = logo.split()
    logo.putalpha(ImageChops.multiply(a, mask))
    return logo


def wrap_text(draw, text, font, max_width):
    words = text.split()
    lines, current = [], ''
    for word in words:
        test = word if not current else f'{current} {word}'
        if draw.textlength(test, font=font) <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def make_og():
    img = Image.new('RGBA', (1200, 630), BG)
    draw = ImageDraw.Draw(img)

    # layered gradients / glows
    glow = Image.new('RGBA', img.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((-120, -120, 520, 420), fill=(41, 171, 224, 70))   # Deep Current primary blue
    gd.ellipse((760, -60, 1260, 440), fill=(255, 255, 255, 28))
    gd.ellipse((820, 260, 1240, 700), fill=(116, 212, 163, 25))
    glow = glow.filter(ImageFilter.GaussianBlur(48))
    img.alpha_composite(glow)

    # panel
    panel = Image.new('RGBA', img.size, (0, 0, 0, 0))
    pd = ImageDraw.Draw(panel)
    pd.rounded_rectangle((56, 56, 1144, 574), radius=36, fill=(14, 27, 42, 220), outline=(255, 255, 255, 26), width=2)
    img.alpha_composite(panel)

    lg = rounded_logo(150)
    img.alpha_composite(lg, (92, 96))

    eyebrow = font(FONT_BOLD, 26)
    title = font(FONT_BOLD, 78)
    subtitle = font(FONT_REG, 26)
    footer = font(FONT_REG, 22)

    draw.text((268, 106), 'NEW LOCAL MEDIA', fill=FOREGROUND, font=eyebrow)
    draw.text((92, 288), 'Work in Progress', fill=WHITE, font=title)

    # Subtitle — wrap within panel content area (x: 92 → 1108)
    sub = ('Open projects from New Local Media and Dan Knauss. '
           'WordPress security, technical docs, identity, automation, and experiments.')
    sub_lines = wrap_text(draw, sub, subtitle, 1108 - 92)
    y = 392
    for line in sub_lines:
        draw.text((92, y), line, fill=FOREGROUND, font=subtitle)
        y += 36

    # badges
    badge_font = font(FONT_BOLD, 22)
    x = 92
    for label, color in [('wp-sudo', PRIMARY), ('AI-assisted docs', ACCENT), ('CAPM', GOLD)]:
        w = draw.textlength(label, font=badge_font) + 34
        draw.rounded_rectangle((x, 500, x + w, 544), radius=22, fill=(11, 18, 30, 180), outline=color, width=2)
        draw.text((x + 17, 510), label, fill=WHITE, font=badge_font)
        x += w + 14

    draw.text((842, 532), 'newlocalmedia.github.io', fill=FOREGROUND, font=footer)
    img.save(OG)


def make_icons():
    logo = Image.open(LOGO).convert('RGBA')
    logo.resize((512, 512), Image.LANCZOS).save(ICON_512)
    logo.resize((180, 180), Image.LANCZOS).save(APPLE)
    logo.resize((32, 32), Image.LANCZOS).save(FAVICON)


if __name__ == '__main__':
    make_og()
    make_icons()
    print('Generated', OG)
    print('Generated', ICON_512)
    print('Generated', APPLE)
    print('Generated', FAVICON)
