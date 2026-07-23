# Master Automation Launcher for Side Hustle Studio
# Launches Express Webhook Server, Vite Frontend, and Continuous GitHub Auto-Sync

$repoDir = Resolve-Path "$PSScriptRoot\.."
Set-Location -Path $repoDir

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "  🚀 SIDE HUSTLE AUTOMATION STUDIO - MASTER SYSTEM START " -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Cyan

# 1. Start GitHub Auto-Sync Listener in Background
Write-Host "[1/3] Starting Continuous GitHub Auto-Sync Daemon..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass -WindowStyle Hidden -File `"$repoDir\scripts\auto-sync-github.ps1`"" -WindowStyle Hidden

# 2. Verify Build & Dependencies
Write-Host "[2/3] Verifying Production Server & Webhook Listener..." -ForegroundColor Yellow
if (-not (Test-Path "$repoDir\node_modules")) {
    npm install
}

# 3. Launch Development & Production Server on Port 3000
Write-Host "[3/3] Launching Studio WebApp & Live Webhook Listener on http://localhost:3000..." -ForegroundColor Green
Write-Host "Open http://localhost:3000 in your browser to view your live payouts & sales dashboard!" -ForegroundColor Cyan

npm run dev
