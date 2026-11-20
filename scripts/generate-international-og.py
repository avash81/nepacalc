import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
img = Image.new('RGB', (W, H), color='#FFFFFF')
draw = ImageDraw.Draw(img)

# 1. Background - Crisp white to subtle soft slate-50 at bottom
for y in range(H):
    factor = y / H
    r = int(255 - (255 - 248) * factor)
    g = int(255 - (255 - 250) * factor)
    b = int(255 - (255 - 252) * factor)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# 2. Top Accent Ribbon (Gold / Blue gradient bar)
for x in range(W):
    factor = x / W
    if factor < 0.6:
        # Gold to Amber
        r = int(245 - (245 - 217) * (factor / 0.6))
        g = int(158 - (158 - 119) * (factor / 0.6))
        b = int(11 - (11 - 6) * (factor / 0.6))
    else:
        # Amber to Royal Blue
        sub = (factor - 0.6) / 0.4
        r = int(217 - (217 - 37) * sub)
        g = int(119 - (119 - 99) * sub)
        b = int(6 + (235 - 6) * sub)
    draw.line([(x, 0), (x, 7)], fill=(r, g, b))

# 3. Outer subtle frame
draw.rounded_rectangle([20, 20, W - 20, H - 20], radius=16, outline=(226, 232, 240), width=1)

# 4. Fonts
font_dir = r"C:\Windows\Fonts"
font_title = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 52)
font_subtitle = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 22)
font_badge = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 14)
font_card_head = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 24)
font_card_sub = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 16)
font_card_item = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 17)
font_foot = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 15)
font_brand = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 22)

# 5. Top Bar Elements
# NepaCalc Brand pill
draw.rounded_rectangle([60, 42, 60 + 140, 42 + 38], radius=8, fill=(248, 250, 252), outline=(203, 213, 225), width=1)
draw.text((76, 48), "NepaCalc", font=font_brand, fill=(15, 23, 42))

# Live spot badge
draw.rounded_rectangle([215, 42, 215 + 240, 42 + 38], radius=19, fill=(236, 253, 245), outline=(167, 243, 208), width=1)
# Green pulse dot
draw.ellipse([232, 55, 244, 67], fill=(16, 185, 129))
draw.text((254, 51), "GLOBAL SPOT • LIVE RATES", font=font_badge, fill=(6, 95, 70))

# Benchmark pill (right side)
draw.rounded_rectangle([W - 390, 42, W - 60, 42 + 38], radius=8, fill=(241, 245, 249), outline=(203, 213, 225), width=1)
draw.text((W - 375, 52), "COMEX • LBMA • WORLD BANK", font=font_badge, fill=(51, 65, 85))

# 6. Main Headline (Clean Bold Charcoal / Navy)
draw.text((60, 106), "INTERNATIONAL GOLD & SILVER", font=font_title, fill=(15, 23, 42))

# Color bar under headline
draw.rectangle([60, 175, 250, 179], fill=(217, 119, 6))   # Gold
draw.rectangle([250, 175, 410, 179], fill=(100, 116, 139)) # Silver
draw.rectangle([410, 175, 510, 179], fill=(37, 99, 235))   # Blue

draw.text((60, 192), "Live Precious Metals Spot Rates • Multi-Currency • 56-Year Benchmark Cycle (1970 - 2026)", font=font_subtitle, fill=(71, 85, 105))

# 7. Two Clean Light Cards
card_y = 246
card_h = 294
card_w = 525

# Left Card: GOLD (Warm Amber Tint on Pure White)
card1_x = 60
draw.rounded_rectangle([card1_x, card_y, card1_x + card_w, card_y + card_h], radius=16, fill=(255, 251, 235), outline=(252, 211, 77), width=2)
# Top header area inside card
draw.rounded_rectangle([card1_x + 1, card_y + 1, card1_x + card_w - 1, card_y + 60], radius=15, fill=(254, 243, 199))
draw.rectangle([card1_x + 1, card_y + 40, card1_x + card_w - 1, card_y + 60], fill=(254, 243, 199))

# Gold pill badge
draw.rounded_rectangle([card1_x + 18, card_y + 14, card1_x + 64, card_y + 46], radius=6, fill=(217, 119, 6))
draw.text((card1_x + 23, card_y + 19), "XAU", font=font_badge, fill=(255, 255, 255))
draw.text((card1_x + 78, card_y + 17), "GOLD SPOT & PURITIES", font=font_card_head, fill=(146, 64, 14))

# Gold card items
items_gold = [
    ("• 24K, 22K, 18K, 14K & 10K", "Intrinsic melt values & purities"),
    ("• Troy Ounce, Gram, Tola, Kg", "Full international unit conversions"),
    ("• Multi-Currency Live Feeds", "USD ($), EUR (€), GBP (£), CAD, AUD"),
    ("• 56-Year Historical Benchmark", "1970 to 2026 inflation & return CAGRs"),
]
item_y = card_y + 78
for title, desc in items_gold:
    draw.text((card1_x + 22, item_y), title, font=font_card_item, fill=(15, 23, 42))
    draw.text((card1_x + 22, item_y + 24), desc, font=font_card_sub, fill=(100, 116, 139))
    item_y += 51

# Right Card: SILVER & RATIO (Cool Slate Tint on Pure White)
card2_x = 615
draw.rounded_rectangle([card2_x, card_y, card2_x + card_w, card_y + card_h], radius=16, fill=(248, 250, 252), outline=(203, 213, 225), width=2)
# Top header area inside card
draw.rounded_rectangle([card2_x + 1, card_y + 1, card2_x + card_w - 1, card_y + 60], radius=15, fill=(241, 245, 249))
draw.rectangle([card2_x + 1, card_y + 40, card2_x + card_w - 1, card_y + 60], fill=(241, 245, 249))

# Silver pill badge
draw.rounded_rectangle([card2_x + 18, card_y + 14, card2_x + 64, card_y + 46], radius=6, fill=(71, 85, 105))
draw.text((card2_x + 23, card_y + 19), "XAG", font=font_badge, fill=(255, 255, 255))
draw.text((card2_x + 78, card_y + 17), "SILVER & GOLD-SILVER RATIO", font=font_card_head, fill=(30, 41, 59))

# Silver card items
items_silver = [
    ("• .999 Fine Pure Silver Spot", "Continuous COMEX & London fixings"),
    ("• Real-Time Gold-Silver Ratio", "Valuation multiples & historical signals"),
    ("• Bars, Coins & Rounds Pricing", "1 oz, 100g, 1 kg bullion tracking"),
    ("• Official World Bank Series", "Uninterrupted monthly historical series"),
]
item_y = card_y + 78
for title, desc in items_silver:
    draw.text((card2_x + 22, item_y), title, font=font_card_item, fill=(15, 23, 42))
    draw.text((card2_x + 22, item_y + 24), desc, font=font_card_sub, fill=(100, 116, 139))
    item_y += 51

# 8. Bottom Footer Strip
foot_y = 560
draw.rounded_rectangle([60, foot_y, W - 60, foot_y + 42], radius=10, fill=(241, 245, 249), outline=(226, 232, 240), width=1)
draw.text((78, foot_y + 11), "Portals: United States • United Kingdom • Canada • Australia • Germany • France • Netherlands", font=font_foot, fill=(71, 85, 105))
draw.text((W - 300, foot_y + 11), "nepacalc.com/international/", font=font_foot, fill=(37, 99, 235))

# Save image
out_path_public = r"C:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\public\images\og\international-gold-silver.jpg"
out_path_out = r"C:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\out\images\og\international-gold-silver.jpg"
out_artifact = r"C:\Users\hp\.gemini\antigravity\brain\a9e690cf-cc5b-4b10-aba5-a2bc47078db3\international-gold-silver-og.jpg"

os.makedirs(os.path.dirname(out_path_public), exist_ok=True)
os.makedirs(os.path.dirname(out_path_out), exist_ok=True)

img.save(out_path_public, format='JPEG', quality=95, optimize=True)
img.save(out_path_out, format='JPEG', quality=95, optimize=True)
img.save(out_artifact, format='JPEG', quality=95, optimize=True)
print("Successfully generated clean white light-theme international OG image!")
