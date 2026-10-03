with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Find the first closing )} after the new function body ended
# The new function ends with }; after KBD_123
# The structure is: new function body ends with `}\n\n const KBD_123...` 
# Then the OLD duplicate slicing/presets/variables/quality sections follow

# Find the location of the first `}` that closes the main component
# which should be around the first occurrence of:
marker = '\n};\n\n{/* SLICING CONTROLS */}'
if marker not in c:
    marker = '\n}\n\n{/* SLICING CONTROLS */}'

if marker in c:
    idx = c.find(marker)
    # Everything after idx + len('}\n') should be removed until the duplicate KBD_123
    # Find the second KBD_123
    first_kbd = c.find('const KBD_123')
    second_kbd = c.find('const KBD_123', first_kbd + 1)
    if second_kbd != -1:
        c = c[:idx + 2] + c[second_kbd:]
        print('Removed duplicate sections, second KBD_123 at', second_kbd)
    else:
        # Remove the duplicate from after the marker until the end
        # Find the end of the last visible closing }
        # Just cut off at idx + 2 and add the KBD_123
        kbd_content = '''
const KBD_123 = [
  ['x', 'y', 'z', 'a', 'b', 'c', '(', ')', 'AC'],
  ['7', '8', '9', '/', 'sin', 'cos', 'tan', 'exp', 'DEL'],
  ['4', '5', '6', '*', 'x\\u00b2', 'x\\u02b8', '\\u221a', 'log', 'ENTER'],
  ['1', '2', '3', '-', '+', '.', '\\u03c0', '|x|', '0']
];
'''
        c = c[:idx + 2] + kbd_content
        print('Removed duplicate sections, added KBD_123')
else:
    # Try another approach: find duplicate content after the function closes
    # The function should end with ); } and then the KBD_123 const
    # Find the second occurrence of "  );\n}" pattern
    first_end = c.find('  );\n}')
    second_end = c.find('  );\n}', first_end + 1)
    print(f'First end at {first_end}, second end at {second_end}')
    if second_end != -1:
        # Cut at second_end + len('  );\n}')
        c = c[:second_end + 5] + '\n'
        print('Trimmed at second function end')

with open('src/components/calculators/ThreeDCalculatorClient.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print('Done. Lines now:', len(c.splitlines()))
