import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

# 1. PURE SOLID WHITE BACKGROUND - ZERO GRADIENTS, ZERO BLUR
img = Image.new('RGB', (W, H), color=(255, 255, 255))
draw = ImageDraw.Draw(img)

# 2. Solid top accent bar (Solid Gold #D97706 and Solid Blue #2563EB, perfectly flat)
draw.rectangle([0, 0, 800, 8], fill=(217, 119, 6))   # Solid Gold
draw.rectangle([800, 0, W, 8], fill=(37, 99, 235))   # Solid Blue

# 3. Solid clean outer border
draw.rectangle([24, 24, W - 24, H - 24], outline=(226, 232, 240), width=2)

# 4. Fonts
font_dir = r"C:\Windows\Fonts"
font_title = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 50)
font_subtitle = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 22)
font_badge = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 14)
font_card_head = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 22)
font_card_sub = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 16)
font_card_item = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 16)
font_foot = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 15)
font_brand = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 24)

# 5. Top Bar - Solid flat pills with razor-sharp borders
# Brand
draw.rectangle([60, 44, 220, 86], fill=(248, 250, 252), outline=(203, 213, 225), width=2)
draw.text((75, 50), "NepaCalc", font=font_brand, fill=(15, 23, 42))

# Live status pill (Solid green dot & solid text)
draw.rectangle([235, 44, 490, 86], fill=(236, 253, 245), outline=(167, 243, 208), width=2)
draw.ellipse([252, 57, 266, 71], fill=(16, 185, 129))
draw.text((278, 55), "LIVE SPOT • COMEX & LBMA", font=font_badge, fill=(6, 95, 70))

# Benchmark tag (Right side)
draw.rectangle([W - 390, 44, W - 60, 86], fill=(241, 245, 249), outline=(203, 213, 225), width=2)
draw.text((W - 372, 55), "WORLD BANK 56Y BENCHMARK", font=font_badge, fill=(30, 41, 59))

# 6. Main Headline (Solid bold dark navy #0F172A)
draw.text((60, 110), "INTERNATIONAL GOLD & SILVER", font=font_title, fill=(15, 23, 42))

# Solid dividing underline
draw.rectangle([60, 175, 240, 180], fill=(217, 119, 6))
draw.rectangle([240, 175, 420, 180], fill=(100, 116, 139))
draw.rectangle([420, 175, 520, 180], fill=(37, 99, 235))

# Subtitle
draw.text((60, 194), "Real-Time Precious Metals Spot Prices • Multi-Currency • 1970 - 2026 Historical Archive", font=font_subtitle, fill=(71, 85, 105))

# 7. Two Solid Flat White Cards with crisp colored borders
card_y = 250
card_h = 286
card_w = 525

# Left Card: GOLD (Solid gold border #D97706, pure white interior)
card1_x = 60
draw.rectangle([card1_x, card_y, card1_x + card_w, card_y + card_h], fill=(255, 255, 255), outline=(217, 119, 6), width=2)

# Solid gold header banner
draw.rectangle([card1_x, card_y, card1_x + card_w, card_y + 54], fill=(254, 243, 199), outline=(217, 119, 6), width=2)
draw.rectangle([card1_x + 16, card_y + 12, card1_x + 64, card_y + 42], fill=(217, 119, 6))
draw.text((card1_x + 23, card_y + 17), "XAU", font=font_badge, fill=(255, 255, 255))
draw.text((card1_x + 76, card_y + 16), "GOLD SPOT & PURITIES", font=font_card_head, fill=(146, 64, 14))

items_gold = [
    ("• 24K, 22K, 18K, 14K & 10K", "Melt values and purity conversions"),
    ("• Troy Ounce, Gram, Tola & Kg", "Full metric and imperial units"),
    ("• USD, EUR, GBP, CAD & AUD", "Real-time exchange conversion"),
    ("• 56-Year Historical Benchmarks", "Annual returns, highs, lows & CAGRs"),
]
iy = card_y + 70
for title, desc in items_gold:
    draw.text((card1_x + 20, iy), title, font=font_card_item, fill=(15, 23, 42))
    draw.text((card1_x + 20, iy + 22), desc, font=font_card_sub, fill=(100, 116, 139))
    iy += 50

# Right Card: SILVER (Solid slate border #64748B, pure white interior)
card2_x = 615
draw.rectangle([card2_x, card_y, card2_x + card_w, card_y + card_h], fill=(255, 255, 255), outline=(100, 116, 139), width=2)

# Solid silver header banner
draw.rectangle([card2_x, card_y, card2_x + card_w, card_y + 54], fill=(241, 245, 249), outline=(100, 116, 139), width=2)
draw.rectangle([card2_x + 16, card_y + 12, card2_x + 64, card_y + 42], fill=(71, 85, 105))
draw.text((card2_x + 23, card_y + 17), "XAG", font=font_badge, fill=(255, 255, 255))
draw.text((card2_x + 76, card_y + 16), "SILVER & GOLD-SILVER RATIO", font=font_card_head, fill=(30, 41, 59))

items_silver = [
    ("• .999 Fine Pure Silver Spot", "Continuous COMEX futures pricing"),
    ("• Real-Time Gold-Silver Ratio", "Valuation multiples & trend signals"),
    ("• Bullion Coins, Rounds & Bars", "1 oz, 100g, and 1 kg standard bars"),
    ("• Official World Bank Series", "Uninterrupted monthly historical records"),
]
iy = card_y + 70
for title, desc in items_silver:
    draw.text((card2_x + 20, iy), title, font=font_card_item, fill=(15, 23, 42))
    draw.text((card2_x + 20, iy + 22), desc, font=font_card_sub, fill=(100, 116, 139))
    iy += 50

# 8. Bottom Footer Strip (Solid light gray background with solid 2px border)
foot_y = 556
draw.rectangle([60, foot_y, W - 60, foot_y + 42], fill=(248, 250, 252), outline=(203, 213, 225), width=2)
draw.text((76, foot_y + 11), "Countries: USA • United Kingdom • Canada • Australia • Germany • France • Netherlands", font=font_foot, fill=(51, 65, 85))
draw.text((W - 290, foot_y + 11), "nepacalc.com/international/", font=font_foot, fill=(37, 99, 235))

# Save
out_public = r"C:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\public\images\og\international-gold-silver.jpg"
out_out = r"C:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\out\images\og\international-gold-silver.jpg"
out_art = r"C:\Users\hp\.gemini\antigravity\brain\a9e690cf-cc5b-4b10-aba5-a2bc47078db3\international-gold-silver-og.jpg"

img.save(out_public, format='JPEG', quality=98)
img.save(out_out, format='JPEG', quality=98)
img.save(out_art, format='JPEG', quality=98)

print("Saved 100% solid flat, razor-sharp white OG card (zero blur, zero gradients)!")
