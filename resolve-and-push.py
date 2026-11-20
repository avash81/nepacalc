import subprocess

def run(cmd):
    p = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    print(f'>>> {cmd}')
    if p.stdout.strip():
        print(p.stdout.strip())
    if p.stderr.strip():
        print('ERR:', p.stderr.strip())
    return p.returncode

run('git fetch origin main')
merge_code = run('git merge -X ours origin/main -m "merge: sync remote CI updates"')

status = subprocess.run('git status --short --porcelain', shell=True, capture_output=True, text=True).stdout
lines = [l for l in status.splitlines() if l.strip()]
for line in lines:
    xy = line[:2]
    path = line[3:].strip()
    if xy in ('UD', 'AU', 'UU', 'AA'):
        run(f'git add "{path}"')
    elif xy in ('DU', 'DD'):
        run(f'git rm -f "{path}"')

st2 = subprocess.run('git status --short --porcelain', shell=True, capture_output=True, text=True).stdout
if st2.strip():
    run('git add -A')
    run('git commit -m "merge: resolve out/ CI conflicts"')

push_code = run('git push origin main')
print('Final push code:', push_code)
