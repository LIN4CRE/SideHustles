# Register Scheduled Task for Side Hustle Studio Auto Sync
$taskName = "SideHustles_GitHub_AutoSync"
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-ExecutionPolicy Bypass -WindowStyle Hidden -File `"$PSScriptRoot\auto-sync-github.ps1`""
$trigger = New-ScheduledTaskTrigger -At (Get-Date) -Once -RepetitionInterval (New-TimeSpan -Minutes 5)

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Description "Continuously sync Side Hustles studio with main on GitHub" -Force
Write-Host "Scheduled task '$taskName' registered to sync every 5 minutes." -ForegroundColor Green
