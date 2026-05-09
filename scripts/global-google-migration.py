
import os

def migrate_to_google_style(directory):
    replacements = {
        'bg-slate-900': 'bg-white border border-[#dadce0]',
        'text-white': 'text-[#202124]',
        'rounded-[2.5rem]': 'rounded-lg',
        'rounded-[3rem]': 'rounded-lg',
        'rounded-3xl': 'rounded-lg',
        'shadow-2xl': 'shadow-sm',
        'shadow-xl': 'shadow-sm',
        'shadow-lg': 'shadow-sm',
        'bg-blue-600': 'bg-[#1a73e8]',
        'hover:bg-slate-900': 'hover:bg-[#1557b0]',
        'text-blue-400': 'text-[#1a0dab]',
        'bg-white/5': 'bg-[#f8f9fa]',
        'border-white/5': 'border-[#dadce0]',
        'border-white/10': 'border-[#dadce0]'
    }

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css')):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content
                    for old, new in replacements.items():
                        new_content = new_content.replace(old, new)
                    
                    if new_content != content:
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Migrated: {path}")
                except Exception as e:
                    print(f"Error on {path}: {e}")

# Run the migration
migrate_to_google_style('src')

# Update Global CSS to force white background
globals_css = 'src/app/globals.css'
with open(globals_css, 'w', encoding='utf-8') as f:
    f.write("""@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #202124;
}

body {
  background-color: #ffffff;
  color: #202124;
  font-family: 'Inter', system-ui, sans-serif;
}

/* Force Google Link Style */
a {
  color: #1a0dab;
}

a:hover {
  text-decoration: underline;
}

/* Standard Google Input Style */
input, select, textarea {
  background-color: #ffffff !important;
  border: 1px solid #dadce0 !important;
  color: #202124 !important;
  border-radius: 8px !important;
  padding: 12px !important;
}

input:focus {
  border-color: #1a73e8 !important;
  outline: none;
}

/* Result Box Style */
.result-box {
  background-color: #f8f9fa;
  border-left: 4px solid #1a73e8;
}
""")

print("Global CSS reset to Google Standards.")
