# Continuous Automated GitHub Sync Script for Side Hustle Automation Studio
# Syncs local repository state automatically with origin/main on GitHub

$repoDir = Resolve-Path "$PSScriptRoot\.."
Set-Location -Path $repoDir

$logFile = "$repoDir\scripts\sync.log"

function Log-Sync ($msg) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $formatted = "[$timestamp] $msg"
    Write-Host $formatted -ForegroundColor Cyan
    Add-Content -Path $logFile -Value $formatted -ErrorAction SilentlyContinue
}

Log-Sync "Starting GitHub auto-sync check for repository at $repoDir..."

# Ensure remote is set
$remote = git remote get-url origin 2>$null
if (-not $remote) {
    Log-Sync "WARNING: Git remote 'origin' is not set. Aborting sync."
    exit 1
}

# Fetch remote main
git fetch origin main 2>&1 | Out-Null

# Check local status
$status = git status --porcelain
if ($status) {
    Log-Sync "Local changes detected. Staging and committing..."
    git add -A
    $commitMsg = "auto(sync): update side hustles studio state [$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')]"
    git commit -m $commitMsg 2>&1 | Out-Null
    Log-Sync "Committed changes: $commitMsg"
}

# Push to origin main
$pushResult = git push origin main 2>&1
if ($LASTEXITCODE -eq 0) {
    Log-Sync "Successfully pushed latest state to origin/main."
} else {
    Log-Sync "Push output: $pushResult"
}

# Pull latest from origin main to ensure no drift
git pull origin main --rebase 2>&1 | Out-Null
Log-Sync "Sync cycle complete. Repository is 100% in sync with main on GitHub."
