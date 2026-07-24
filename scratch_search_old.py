import os

def search_files(dir_path, search_str):
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        if search_str in f.read():
                            print(f"Found in {path}")
                except:
                    pass

search_files('src', 'Professional Computational')
