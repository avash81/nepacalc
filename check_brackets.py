def check_balance(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    stack = []
    lines = content.split('\n')
    for i, line in enumerate(lines):
        for char in line:
            if char in '({[':
                stack.append((char, i+1))
            elif char in ')}]':
                if not stack:
                    print(f"Extra closing {char} at line {i+1}")
                    continue
                opening, line_num = stack.pop()
                if (opening == '(' and char != ')') or \
                   (opening == '{' and char != '}') or \
                   (opening == '[' and char != ']'):
                    print(f"Mismatched {opening} from line {line_num} with {char} at line {i+1}")
    
    while stack:
        opening, line_num = stack.pop()
        print(f"Unclosed {opening} from line {line_num}")

check_balance(r'c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\src\data\seo\nepal-specific.tsx')
