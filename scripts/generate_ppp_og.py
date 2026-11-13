import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
img = Image.new('RGB', (W, H), '#f8fafc')
draw = ImageDraw.Draw(img)

# Fonts
font_title = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 48)
font_subtitle = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 22)
font_bold_lg = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 30)
font_bold_md = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 19)
font_bold_sm = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 15)
font_regular = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 17)
font_hero = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 44)

# Top decorative bar (Emerald Green)
draw.rectangle([(0, 0), (W, 8)], fill='#047857')

# Left Side: Brand & Title
draw.text((70, 50), 'NEPACALC', font=font_bold_md, fill='#0f172a')
draw.text((185, 50), '|  GLOBAL SALARY & RELOCATION', font=font_regular, fill='#64748b')

# World Bank Badge
badge_x, badge_y = 70, 95
draw.rounded_rectangle([(badge_x, badge_y), (badge_x + 310, badge_y + 36)], radius=6, fill='#ecfdf5', outline='#a7f3d0', width=1)
draw.text((badge_x + 16, badge_y + 8), 'WORLD BANK PPP & ICP BENCHMARK', font=font_bold_sm, fill='#047857')

# Title & Subtitle
draw.text((70, 150), 'PPP Salary', font=font_title, fill='#0f172a')
draw.text((70, 210), 'Converter', font=font_title, fill='#047857')
draw.text((70, 290), 'Compare true domestic buying power across 32+', font=font_subtitle, fill='#334155')
draw.text((70, 324), 'countries instead of misleading bank forex rates.', font=font_subtitle, fill='#334155')

# Feature highlights
features = [
    '32+ Global Destinations with WDI Private Consumption Parity',
    'Gross vs Net (After-Tax) & 50/50 Hybrid Remote Pay Models',
    'Side-by-side: Local PPP Target vs Nominal Market Forex',
    'Digital Nomad Financial Runway & Cost of Living Matrix'
]

y_feat = 390
for text in features:
    draw.ellipse([(70, y_feat + 2), (88, y_feat + 20)], fill='#d1fae5', outline='#047857', width=2)
    draw.line([(74, y_feat + 11), (78, y_feat + 15)], fill='#047857', width=2)
    draw.line([(78, y_feat + 15), (85, y_feat + 7)], fill='#047857', width=2)
    draw.text((100, y_feat), text, font=font_regular, fill='#1e293b')
    y_feat += 38

# Bottom URL
draw.text((70, 575), 'https://nepacalc.com/calculator/ppp-salary-converter/', font=font_bold_sm, fill='#94a3b8')

# Right Side Card
card_x0, card_y0 = 660, 55
card_w, card_h = 475, 520
card_x1, card_y1 = card_x0 + card_w, card_y0 + card_h

# Draw card background & border
draw.rounded_rectangle([(card_x0, card_y0), (card_x1, card_y1)], radius=16, fill='#ffffff', outline='#cbd5e1', width=2)

# Card Header
draw.rounded_rectangle([(card_x0, card_y0), (card_x1, card_y0 + 55)], radius=16, fill='#f1f5f9')
draw.rectangle([(card_x0, card_y0 + 35), (card_x1, card_y0 + 55)], fill='#f1f5f9')
draw.line([(card_x0, card_y0 + 55), (card_x1, card_y0 + 55)], fill='#e2e8f0', width=1)
draw.text((card_x0 + 24, card_y0 + 16), 'PURCHASING POWER EQUIVALENT', font=font_bold_sm, fill='#475569')
draw.text((card_x1 - 105, card_y0 + 16), 'NEPAL (NPR)', font=font_bold_sm, fill='#047857')

# Hero Amount
draw.text((card_x0 + 24, card_y0 + 78), 'Rs. 1,825,000 NPR', font=font_hero, fill='#047857')
draw.text((card_x0 + 24, card_y0 + 144), 'Matches $50,000 USD/year US lifestyle in Nepal', font=font_regular, fill='#64748b')

# Divider
draw.line([(card_x0 + 24, card_y0 + 180), (card_x1 - 24, card_y0 + 180)], fill='#f1f5f9', width=2)

# Breakdown Rows Table
rows = [
    ('Origin Salary (USA)', '$50,000 / yr', '#0f172a', False),
    ('1. Local PPP Target', 'Rs. 1,825,000 NPR', '#047857', True),
    ('2. Market Forex Conversion', 'Rs. 6,950,000 NPR', '#475569', False),
    ('Cost of Living Delta', '-78% Cheaper Living', '#047857', False),
    ('Buying Power Multiplier', '3.81x Real Advantage', '#047857', False),
    ('50/50 Hybrid Remote Pay', 'Rs. 4,387,500 NPR', '#0f172a', False),
]

y_row = card_y0 + 198
for label, val, color, is_highlight in rows:
    if is_highlight:
        draw.rectangle([(card_x0 + 12, y_row - 4), (card_x1 - 12, y_row + 34)], fill='#f0fdf4')
        draw.text((card_x0 + 24, y_row + 5), label, font=font_bold_md, fill='#064e3b')
        draw.text((card_x1 - 185, y_row + 5), val, font=font_bold_md, fill=color)
    else:
        draw.text((card_x0 + 24, y_row), label, font=font_regular, fill='#334155')
        draw.text((card_x1 - 185, y_row), val, font=font_bold_md if '3.81x' in val or '-' in val else font_regular, fill=color)
    y_row += 40

# Footnote inside card
draw.text((card_x0 + 24, card_y1 - 32), 'World Bank ICP & WDI Private Consumption Series', font=font_bold_sm, fill='#94a3b8')

# Output paths
pub_path = r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\public\images\ppp-salary-converter-og.png'
out_path = r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\out\images\ppp-salary-converter-og.png'

os.makedirs(os.path.dirname(pub_path), exist_ok=True)
os.makedirs(os.path.dirname(out_path), exist_ok=True)

img.save(pub_path, quality=98)
img.save(out_path, quality=98)
print('Successfully generated ppp-salary-converter-og.png in public and out!')
