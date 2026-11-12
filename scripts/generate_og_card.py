import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
img = Image.new('RGB', (W, H), '#f8fafc')
draw = ImageDraw.Draw(img)

# Fonts
font_title = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 56)
font_subtitle = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 24)
font_bold_lg = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 32)
font_bold_md = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 20)
font_bold_sm = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 16)
font_regular = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 18)
font_hero = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 52)

# Top decorative bar (Crisp Emerald Green)
draw.rectangle([(0, 0), (W, 8)], fill='#059669')

# Left side content
# Brand
draw.text((70, 50), 'NEPACALC', font=font_bold_md, fill='#0f172a')
draw.text((185, 50), '|  FINANCIAL UTILITIES', font=font_regular, fill='#64748b')

# 2026 Badge
badge_x, badge_y = 70, 95
draw.rounded_rectangle([(badge_x, badge_y), (badge_x + 230, badge_y + 36)], radius=6, fill='#ecfdf5', outline='#a7f3d0', width=1)
draw.text((badge_x + 18, badge_y + 7), 'TAX YEAR 2026 UPDATED', font=font_bold_sm, fill='#047857')

# Title & Subtitle
draw.text((70, 150), 'US Paycheck', font=font_title, fill='#0f172a')
draw.text((70, 215), 'Calculator', font=font_title, fill='#059669')
draw.text((70, 300), 'Estimate your net take-home pay after federal,', font=font_subtitle, fill='#334155')
draw.text((70, 335), 'FICA, and state taxes across all 50 states.', font=font_subtitle, fill='#334155')

# Feature highlights with custom drawn crisp checkmark circles
features = [
    'All 50 US States + DC + Territories',
    'Official IRS Pub 15-T Withholding & W-4 Rules',
    '2026 Social Security Cap ($184,500) & FICA',
    'Salary & Hourly Modes with 1.5x Overtime'
]

y_feat = 405
for text in features:
    # Draw emerald green circle
    draw.ellipse([(70, y_feat + 2), (88, y_feat + 20)], fill='#d1fae5', outline='#059669', width=2)
    # Draw checkmark inside circle
    draw.line([(74, y_feat + 11), (78, y_feat + 15)], fill='#047857', width=2)
    draw.line([(78, y_feat + 15), (85, y_feat + 7)], fill='#047857', width=2)
    # Draw feature text
    draw.text((100, y_feat), text, font=font_regular, fill='#1e293b')
    y_feat += 38

# Bottom URL
draw.text((70, 575), 'https://nepacalc.com/calculator/us-paycheck-calculator/', font=font_bold_sm, fill='#94a3b8')

# Right Side Card: Clean, Crisp White Financial Breakdown
card_x0, card_y0 = 660, 55
card_w, card_h = 475, 520
card_x1, card_y1 = card_x0 + card_w, card_y0 + card_h

# Draw card background & border
draw.rounded_rectangle([(card_x0, card_y0), (card_x1, card_y1)], radius=16, fill='#ffffff', outline='#cbd5e1', width=2)

# Card Header
draw.rounded_rectangle([(card_x0, card_y0), (card_x1, card_y0 + 55)], radius=16, fill='#f1f5f9')
draw.rectangle([(card_x0, card_y0 + 35), (card_x1, card_y0 + 55)], fill='#f1f5f9')
draw.line([(card_x0, card_y0 + 55), (card_x1, card_y0 + 55)], fill='#e2e8f0', width=1)
draw.text((card_x0 + 24, card_y0 + 16), 'ESTIMATED TAKE-HOME PAY', font=font_bold_sm, fill='#475569')
draw.text((card_x1 - 115, card_y0 + 16), 'BI-WEEKLY', font=font_bold_sm, fill='#059669')

# Hero Amount
draw.text((card_x0 + 24, card_y0 + 80), '$2,334.00', font=font_hero, fill='#047857')
draw.text((card_x0 + 24, card_y0 + 150), 'Net Pay on $75,000 Annual Gross (Single, Texas)', font=font_regular, fill='#64748b')

# Divider
draw.line([(card_x0 + 24, card_y0 + 190), (card_x1 - 24, card_y0 + 190)], fill='#f1f5f9', width=2)

# Deduction Rows Table
rows = [
    ('Gross Pay (Bi-Weekly)', '$2,884.62', '#0f172a', False),
    ('Federal Income Tax', '-$295.00', '#dc2626', False),
    ('Social Security (6.2%)', '-$178.85', '#dc2626', False),
    ('Medicare (1.45%)', '-$41.83', '#dc2626', False),
    ('State Income Tax (TX 0%)', '$0.00', '#64748b', False),
    ('Estimated Net Pay', '$2,334.00', '#047857', True),
]

y_row = card_y0 + 210
for label, val, color, is_total in rows:
    if is_total:
        draw.line([(card_x0 + 24, y_row - 6), (card_x1 - 24, y_row - 6)], fill='#e2e8f0', width=1)
        draw.rectangle([(card_x0 + 12, y_row - 4), (card_x1 - 12, y_row + 34)], fill='#f0fdf4')
        draw.text((card_x0 + 24, y_row + 4), label, font=font_bold_md, fill='#064e3b')
        draw.text((card_x1 - 145, y_row + 4), val, font=font_bold_md, fill=color)
    else:
        draw.text((card_x0 + 24, y_row), label, font=font_regular, fill='#334155')
        draw.text((card_x1 - 145, y_row), val, font=font_bold_md if '-' in val else font_regular, fill=color)
    y_row += 40

# Footnote inside card
draw.text((card_x0 + 24, card_y1 - 32), 'IRS Pub 15-T • SSA Statutory Cap: $184,500', font=font_bold_sm, fill='#94a3b8')

# Save to public/images/og/ and out/images/og/
pub_path = r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\public\images\og\us-paycheck-calculator.jpg'
out_path = r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\out\images\og\us-paycheck-calculator.jpg'
artifact_path = r'C:\Users\hp\.gemini\antigravity\brain\a9e690cf-cc5b-4b10-aba5-a2bc47078db3\us-paycheck-calculator-og.jpg'

os.makedirs(os.path.dirname(pub_path), exist_ok=True)
os.makedirs(os.path.dirname(out_path), exist_ok=True)

img.save(pub_path, quality=98)
img.save(out_path, quality=98)
img.save(artifact_path, quality=98)
print('Successfully generated and saved card to all 3 paths!')
