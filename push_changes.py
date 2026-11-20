import subprocess
import os

repo_dir = r"c:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build"

def run(cmd):
    print(">>>", cmd)
    p = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=repo_dir)
    if p.stdout.strip():
        print(p.stdout.strip())
    if p.stderr.strip():
        print("ERR:", p.stderr.strip())
    return p.returncode

run("git add -A")
run('git commit -m "feat(history): add Nepal-style By Day, By Month, Week/Month/Year Min/Max tabs to USA history and update daily rates"')
run("git fetch origin main")
run('git merge -X ours origin/main -m "merge: sync remote CI updates"')

status = subprocess.run("git status --short --porcelain", shell=True, capture_output=True, text=True, cwd=repo_dir).stdout
for line in status.splitlines():
    xy = line[:2]
    path = line[3:].strip().strip('"')
    if xy in ("UD", "AU", "UU", "AA"):
        run(f'git add "{path}"')
    elif xy in ("DU", "DD"):
        run(f'git rm -f "{path}"')

st2 = subprocess.run("git status --short --porcelain", shell=True, capture_output=True, text=True, cwd=repo_dir).stdout
if st2.strip():
    run("git add -A")
    run('git commit -m "merge: resolve CI conflicts"')

push_res = run("git push origin main")
print("PUSH STATUS:", push_res)
