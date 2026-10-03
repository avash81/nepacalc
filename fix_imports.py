import re

with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Add ChevronDown import if missing
if 'ChevronDown' not in c[:1000]:
    c = re.sub(r'import\s+\{[^}]*\}\s+from\s+[\'"]lucide-react[\'"];', lambda m: m.group(0).replace('}', ', ChevronDown}'), c)

# Add openSections state if missing
if 'const [openSections' not in c:
    state_injection = '''
  const [openSections, setOpenSections] = useState({
    equations: true,
    slicing: false,
    variables: false,
    quality: false,
    appearance: false,
    presets: true
  });

  const toggleSection = (sec: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };
'''
    # Find a good place to inject state, e.g. after isFullscreen state
    c = re.sub(r'(const \[isFullscreen[^;]+;)', r'\1\n' + state_injection, c, count=1)

# Add KBD_123 back if it was truncated
if 'const KBD_123' not in c:
    c += '''

const KBD_123 = [
  ['x', 'y', 'z', 'a', 'b', 'c', '(', ')', 'AC'],
  ['7', '8', '9', '/', 'sin', 'cos', 'tan', 'exp', 'DEL'],
  ['4', '5', '6', '*', 'x²', 'xʸ', '√', 'log', 'ENTER'],
  ['1', '2', '3', '-', '+', '.', 'π', '|x|', '0']
];
'''

with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
