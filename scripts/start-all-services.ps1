# Master Automation Launcher for Side Hustle Studio
# Launches Express Webhook Server, Vite Frontend, and Continuous GitHub Auto-Sync

$repoDir = Resolve-Path "$PSScriptRoot\.."
Set-Location -Path $repoDir

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "  🚀 SIDE HUSTLE AUTOMATION STUDIO - MASTER SYSTEM START " -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Cyan

# 0. Free Port 3847 if held by a previous lingering process
$portCheck = Get-NetTCPConnection -LocalPort 3847 -ErrorAction SilentlyContinue
if ($portCheck) {
    Write-Host "[0/3] Clearing lingering process on port 3847..." -ForegroundColor Yellow
    foreach ($conn in $portCheck) {
        Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
    }
    Start-Sleep -Seconds 1
}

# 1. Start GitHub Auto-Sync Listener in Background
Write-Host "[1/3] Starting Continuous GitHub Auto-Sync Daemon..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass -WindowStyle Hidden -File `"$repoDir\scripts\auto-sync-github.ps1`"" -WindowStyle Hidden

# 2. Verify Build & Dependencies
Write-Host "[2/3] Verifying Production Server & Webhook Listener..." -ForegroundColor Yellow
if (-not (Test-Path "$repoDir\node_modules")) {
    npm install
}

# 3. Launch Development & Production Server on Port 3847
Write-Host "[3/3] Launching Studio WebApp & Live Webhook Listener on http://localhost:3847..." -ForegroundColor Green
Write-Host "Open http://localhost:3847 (or http://dl:3847) in your browser!" -ForegroundColor Cyan

npm run dev
