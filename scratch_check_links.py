import re

filepath = r"c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\app\calculator\kukl-bill\KuklSeoContent.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    links = re.findall(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', line)
    if links:
        for href, text in links:
            print(f"Line {i+1}: [{text}] -> {href}")
