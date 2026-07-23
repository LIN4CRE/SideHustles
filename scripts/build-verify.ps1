# Build Verification Script for Side Hustle Automation Studio
Set-Location -Path $PSScriptRoot\..

Write-Host "========== [1/3] Checking TypeScript Syntax ==========" -ForegroundColor Cyan
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "TypeScript compilation failed!" -ForegroundColor Red
    exit 1
}

Write-Host "========== [2/3] Building Production Assets ==========" -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Production build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "========== [3/3] Build Verification Passed Successfully! ==========" -ForegroundColor Green
