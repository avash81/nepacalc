# ============================================================
#  NepaCalc — One-Click Deploy Script
#  Run this script to build and deploy to nepacalc.com
#  Usage: Right-click → "Run with PowerShell"
#         OR in terminal: .\deploy.ps1
# ============================================================

$ErrorActionPreference = "Stop"
$ProjectDir = $PSScriptRoot

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "   NepaCalc Deploy Script" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# --- Step 1: Build ---
Write-Host "[1/3] Building project..." -ForegroundColor Yellow
Set-Location $ProjectDir

try {
    npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Build failed with exit code $LASTEXITCODE"
    }
    Write-Host ""
    Write-Host "  Build successful!" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "  BUILD FAILED. Aborting deploy." -ForegroundColor Red
    Write-Host "  Error: $_" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# --- Step 2: Git Add & Commit ---
Write-Host ""
Write-Host "[2/3] Committing changes..." -ForegroundColor Yellow

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$commitMsg = "deploy: auto-deploy $timestamp"

# Check if there are any changes to commit
$status = git status --porcelain
if (-not $status) {
    Write-Host "  No changes to commit. Skipping commit." -ForegroundColor DarkGray
} else {
    try {
        git add .
        git commit -m $commitMsg
        Write-Host "  Committed: $commitMsg" -ForegroundColor Green
    } catch {
        Write-Host "  Commit failed. Aborting." -ForegroundColor Red
        Write-Host "  Error: $_" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# --- Step 3: Git Push ---
Write-Host ""
Write-Host "[3/3] Pushing to GitHub..." -ForegroundColor Yellow

try {
    git push origin main
    if ($LASTEXITCODE -ne 0) {
        throw "Push failed with exit code $LASTEXITCODE"
    }
    Write-Host "  Pushed successfully!" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "  PUSH FAILED." -ForegroundColor Red
    Write-Host "  Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "  Try running: git pull --rebase origin main" -ForegroundColor Yellow
    Write-Host "  Then run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# --- Done ---
Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "   DEPLOY COMPLETE!" -ForegroundColor Green
Write-Host "   nepacalc.com will update in ~30 seconds via webhook." -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to exit"
