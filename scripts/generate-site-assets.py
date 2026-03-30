from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
ASSETS.mkdir(exist_ok=True)

LOGO = ASSETS / 'new-local-media-logo.png'
OG = ASSETS / 'og-image.png'
ICON_512 = ASSETS / 'icon-512.png'
APPLE = ASSETS / 'apple-touch-icon.png'
FAVICON = ASSETS / 'favicon-32.png'

BG = '#272938'
BG2 = '#0b121e'
PRIMARY = '#8182ff'
FOREGROUND = '#c8d2d4'
WHITE = '#ffffff'
ACCENT = '#74d4a3'
GOLD = '#f2c46d'

FONT_REG = '/System/Library/Fonts/Supplemental/Verdana.ttf'
FONT_BOLD = '/System/Library/Fonts/Supplemental/Verdana Bold.ttf'


def font(path, size):
    return ImageFont.truetype(path, size=size)


def rounded_logo(size=160):
    logo = Image.open(LOGO).convert('RGBA').resize((size, size), Image.LANCZOS)
    mask = Image.new('L', (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size, size), radius=int(size * 0.22), fill=255)
    logo.putalpha(mask)
    return logo


def make_og():
    img = Image.new('RGBA', (1200, 630), BG)
    draw = ImageDraw.Draw(img)

    # layered gradients / glows
    glow = Image.new('RGBA', img.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((-120, -120, 520, 420), fill=(129, 130, 255, 70))
    gd.ellipse((760, -60, 1260, 440), fill=(255, 255, 255, 28))
    gd.ellipse((820, 260, 1240, 700), fill=(116, 212, 163, 25))
    glow = glow.filter(ImageFilter.GaussianBlur(48))
    img.alpha_composite(glow)

    # panel
    panel = Image.new('RGBA', img.size, (0, 0, 0, 0))
    pd = ImageDraw.Draw(panel)
    pd.rounded_rectangle((56, 56, 1144, 574), radius=36, fill=(39, 41, 56, 220), outline=(255, 255, 255, 26), width=2)
    img.alpha_composite(panel)

    lg = rounded_logo(150)
    img.alpha_composite(lg, (92, 96))

    eyebrow = font(FONT_BOLD, 26)
    title = font(FONT_BOLD, 78)
    subtitle = font(FONT_REG, 30)
    footer = font(FONT_REG, 22)

    draw.text((268, 106), 'NEW LOCAL MEDIA', fill=FOREGROUND, font=eyebrow)
    draw.text((92, 288), 'Work in Progress', fill=WHITE, font=title)
    draw.text((92, 392), 'Open projects from New Local Media and Dan Knauss.', fill=FOREGROUND, font=subtitle)
    draw.text((92, 438), 'WordPress security, technical docs, identity, automation, and experiments.', fill=FOREGROUND, font=subtitle)

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
