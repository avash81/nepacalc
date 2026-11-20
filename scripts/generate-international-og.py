import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630
img = Image.new('RGB', (W, H), color='#0A0F1D')
draw = ImageDraw.Draw(img)

# 1. Base Gradient (Deep navy/slate with subtle radial light)
for y in range(H):
    factor = y / H
    r = int(10 + (22 - 10) * factor)
    g = int(15 + (30 - 15) * factor)
    b = int(28 + (55 - 28) * factor)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# 2. Add subtle gold/amber ambient glow on top-left and silver/cyan glow on top-right
overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
overlay_draw = ImageDraw.Draw(overlay)

# Gold glow circle top-left
for rad in range(320, 0, -10):
    alpha = int(28 * (1 - rad / 320))
    overlay_draw.ellipse([80 - rad, 100 - rad, 80 + rad, 100 + rad], fill=(217, 119, 6, alpha))

# Cyan/Silver glow circle top-right
for rad in range(300, 0, -10):
    alpha = int(22 * (1 - rad / 300))
    overlay_draw.ellipse([1100 - rad, 120 - rad, 1100 + rad, 120 + rad], fill=(148, 163, 184, alpha))

img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')
draw = ImageDraw.Draw(img)

# 3. Subtle grid lines (Financial terminal look)
grid_color = (255, 255, 255, 8)
grid_overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
g_draw = ImageDraw.Draw(grid_overlay)
for x in range(60, W, 80):
    g_draw.line([(x, 40), (x, H - 40)], fill=(255, 255, 255, 10), width=1)
for y in range(60, H, 60):
    g_draw.line([(60, y), (W - 60, y)], fill=(255, 255, 255, 10), width=1)

# Subtle decorative chart line (Gold trend rising from 1970 to 2026)
chart_points = [
    (100, 520), (220, 510), (320, 480), (440, 460),
    (560, 490), (680, 430), (800, 360), (920, 330),
    (1040, 240), (1120, 180)
]
for i in range(len(chart_points) - 1):
    p1 = chart_points[i]
    p2 = chart_points[i + 1]
    g_draw.line([p1, p2], fill=(245, 158, 11, 45), width=3)
    g_draw.ellipse([p2[0]-4, p2[1]-4, p2[0]+4, p2[1]+4], fill=(251, 191, 36, 90))

img = Image.alpha_composite(img.convert('RGBA'), grid_overlay).convert('RGB')
draw = ImageDraw.Draw(img)

# 4. Fonts
font_dir = r"C:\Windows\Fonts"
font_title = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 54)
font_subtitle = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 22)
font_badge = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 14)
font_card_head = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 24)
font_card_sub = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 16)
font_card_item = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 17)
font_foot = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 15)
font_brand = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 20)

# 5. Top Brand Bar & Live Badge
# NepaCalc logo & name
draw.rounded_rectangle([60, 42, 60 + 130, 42 + 36], radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
draw.text((75, 48), "NepaCalc", font=font_brand, fill=(255, 255, 255))

# Live badge
draw.rounded_rectangle([205, 42, 205 + 230, 42 + 36], radius=18, fill=(20, 83, 45), outline=(34, 197, 94), width=1)
# Green pulse dot
draw.ellipse([220, 55, 230, 65], fill=(74, 222, 128))
draw.text((240, 50), "GLOBAL SPOT • LIVE RATES", font=font_badge, fill=(240, 253, 244))

# Official benchmark pill (right side)
draw.rounded_rectangle([W - 390, 42, W - 60, 42 + 36], radius=8, fill=(30, 41, 59), outline=(71, 85, 105), width=1)
draw.text((W - 375, 51), "COMEX • LBMA • WORLD BANK", font=font_badge, fill=(203, 213, 225))

# 6. Main Headline
draw.text((60, 105), "INTERNATIONAL GOLD & SILVER", font=font_title, fill=(255, 255, 255))
# Gold gradient accent line under headline
draw.rectangle([60, 175, 260, 179], fill=(245, 158, 11))
draw.rectangle([260, 175, 420, 179], fill=(217, 119, 6))
draw.rectangle([420, 175, 520, 179], fill=(148, 163, 184))

draw.text((60, 192), "Live Precious Metals Spot Rates • Multi-Currency • 56-Year Historical Cycle (1970 - 2026)", font=font_subtitle, fill=(203, 213, 225))

# 7. Two Feature Cards
card_y = 245
card_h = 295
card_w = 525

# Left Card: GOLD
card1_x = 60
# Card background
draw.rounded_rectangle([card1_x, card_y, card1_x + card_w, card_y + card_h], radius=16, fill=(15, 23, 42), outline=(217, 119, 6), width=2)
# Top header bar
draw.rounded_rectangle([card1_x, card_y, card1_x + card_w, card_y + 60], radius=16, fill=(26, 32, 44))
draw.rectangle([card1_x, card_y + 40, card1_x + card_w, card_y + 60], fill=(26, 32, 44)) # square bottom corners of header
# Gold icon pill
draw.rounded_rectangle([card1_x + 18, card_y + 14, card1_x + 64, card_y + 46], radius=6, fill=(217, 119, 6))
draw.text((card1_x + 23, card_y + 19), "XAU", font=font_badge, fill=(255, 255, 255))
draw.text((card1_x + 78, card_y + 17), "GOLD SPOT & PURITIES", font=font_card_head, fill=(251, 191, 36))

# Gold card items
items_gold = [
    ("• 24K, 22K, 18K, 14K & 10K", "Melt values & purities"),
    ("• Troy Ounce, Gram, Tola, Kg", "Full unit conversions"),
    ("• Multi-Currency Live Feeds", "USD ($), EUR (€), GBP (£), CAD, AUD"),
    ("• 56-Year Benchmark History", "1970 to 2026 inflation & return CAGRs"),
]
item_y = card_y + 80
for title, desc in items_gold:
    draw.text((card1_x + 22, item_y), title, font=font_card_item, fill=(255, 255, 255))
    draw.text((card1_x + 22, item_y + 24), desc, font=font_card_sub, fill=(156, 163, 175))
    item_y += 50

# Right Card: SILVER & RATIO
card2_x = 615
draw.rounded_rectangle([card2_x, card_y, card2_x + card_w, card_y + card_h], radius=16, fill=(15, 23, 42), outline=(100, 116, 139), width=2)
# Top header bar
draw.rounded_rectangle([card2_x, card_y, card2_x + card_w, card_y + 60], radius=16, fill=(26, 32, 44))
draw.rectangle([card2_x, card_y + 40, card2_x + card_w, card_y + 60], fill=(26, 32, 44))
# Silver icon pill
draw.rounded_rectangle([card2_x + 18, card_y + 14, card2_x + 64, card_y + 46], radius=6, fill=(100, 116, 139))
draw.text((card2_x + 23, card_y + 19), "XAG", font=font_badge, fill=(255, 255, 255))
draw.text((card2_x + 78, card_y + 17), "SILVER & GOLD-SILVER RATIO", font=font_card_head, fill=(226, 232, 240))

# Silver card items
items_silver = [
    ("• .999 Fine Pure Silver Spot", "Live COMEX & London fixings"),
    ("• Real-Time Gold-Silver Ratio", "Valuation multiples & buy/sell signals"),
    ("• Bars, Coins & Rounds", "1 oz, 100g, 1 kg bullion pricing"),
    ("• Official World Bank Series", "Uninterrupted monthly historical series"),
]
item_y = card_y + 80
for title, desc in items_silver:
    draw.text((card2_x + 22, item_y), title, font=font_card_item, fill=(255, 255, 255))
    draw.text((card2_x + 22, item_y + 24), desc, font=font_card_sub, fill=(156, 163, 175))
    item_y += 50

# 8. Bottom Footer Strip
foot_y = 562
draw.rounded_rectangle([60, foot_y, W - 60, foot_y + 42], radius=10, fill=(15, 23, 42), outline=(30, 41, 59), width=1)
draw.text((78, foot_y + 11), "Portals: United States • United Kingdom • Canada • Australia • Germany • France • Netherlands", font=font_foot, fill=(148, 163, 184))
draw.text((W - 300, foot_y + 11), "nepacalc.com/international/", font=font_foot, fill=(245, 158, 11))

# Save image
out_path_public = r"C:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\public\images\og\international-gold-silver.jpg"
out_path_out = r"C:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\out\images\og\international-gold-silver.jpg"

os.makedirs(os.path.dirname(out_path_public), exist_ok=True)
os.makedirs(os.path.dirname(out_path_out), exist_ok=True)

img.save(out_path_public, format='JPEG', quality=95, optimize=True)
img.save(out_path_out, format='JPEG', quality=95, optimize=True)
print("Successfully generated international OG image at:")
print(" -", out_path_public)
print(" -", out_path_out)
