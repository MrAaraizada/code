# Remove Random Contributions from May and June 2024 using git filter-branch
Write-Host "Removing contributions for 10 random days each from May and June 2024..." -ForegroundColor Red

# Generate 10 random days for May (1-31)
$mayDays = @()
while ($mayDays.Count -lt 10) {
    $randomDay = Get-Random -Minimum 1 -Maximum 32
    if ($randomDay -notin $mayDays) {
        $mayDays += $randomDay
    }
}

# Generate 10 random days for June (1-30), ensuring different from May days
$juneDays = @()
while ($juneDays.Count -lt 10) {
    $randomDay = Get-Random -Minimum 1 -Maximum 31
    if ($randomDay -notin $juneDays -and $randomDay -notin $mayDays -and $randomDay -le 30) {
        $juneDays += $randomDay
    }
}

# Sort the days
$mayDays = $mayDays | Sort-Object
$juneDays = $juneDays | Sort-Object

Write-Host "Selected days for removal:" -ForegroundColor Magenta
Write-Host "May 2024: $($mayDays -join ', ')" -ForegroundColor Yellow  
Write-Host "June 2024: $($juneDays -join ', ')" -ForegroundColor Yellow

# Create list of all dates to remove
$datesToRemove = @()
foreach ($day in $mayDays) {
    $datesToRemove += "2024-05-{0:D2}" -f $day
}
foreach ($day in $juneDays) {
    $datesToRemove += "2024-06-{0:D2}" -f $day
}

Write-Host "`nDates to remove: $($datesToRemove -join ', ')" -ForegroundColor Red

# Create backup
$backupBranch = "backup-before-removal-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Write-Host "`nCreating backup branch: $backupBranch" -ForegroundColor Cyan
git branch $backupBranch

# Create a script file for git filter-branch
$filterScript = @"
#!/bin/bash
commit_date=`$(git log -1 --format="%ci" `$GIT_COMMIT | cut -d' ' -f1)
case `$commit_date in
"@

foreach ($date in $datesToRemove) {
    $filterScript += "`n    $date)"
    $filterScript += "`n        skip_commit `"`$@`""
    $filterScript += "`n        ;;"
}

$filterScript += @"

    *)
        git commit-tree "`$@"
        ;;
esac
"@

# Write the filter script
Set-Content -Path "filter_script.sh" -Value $filterScript -Encoding UTF8

# Make the script executable (if on Unix-like system)
if ($IsLinux -or $IsMacOS) {
    chmod +x filter_script.sh
}

Write-Host "`nStarting git filter-branch operation..." -ForegroundColor Red
Write-Host "This may take a while..." -ForegroundColor Yellow

try {
    # Use git filter-branch to rewrite history
    git filter-branch --commit-filter "bash filter_script.sh" -- --all
    
    Write-Host "`nSuccessfully removed commits from specified dates!" -ForegroundColor Green
    
    # Clean up
    Remove-Item "filter_script.sh" -Force
    
    # Force garbage collection
    git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin
    git reflog expire --expire=now --all
    git gc --prune=now
    
    Write-Host "`nCleanup completed!" -ForegroundColor Green
}
catch {
    Write-Host "`nError during filter-branch operation: $_" -ForegroundColor Red
    Write-Host "You can restore from backup branch: $backupBranch" -ForegroundColor Yellow
}

# Verify the removal
Write-Host "`n=== Verification ===" -ForegroundColor Cyan
foreach ($date in $datesToRemove) {
    $commits = git log --since="$date 00:00:00" --until="$date 23:59:59" --oneline
    if ($commits) {
        Write-Host "WARNING: Still found commits on $date" -ForegroundColor Red
    } else {
        Write-Host "✓ Successfully removed all commits from $date" -ForegroundColor Green
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor Green
Write-Host "Backup branch: $backupBranch" -ForegroundColor Cyan
Write-Host "Removed contributions from:" -ForegroundColor Yellow
Write-Host "  May 2024: $($mayDays -join ', ')" -ForegroundColor White
Write-Host "  June 2024: $($juneDays -join ', ')" -ForegroundColor White

$remainingMayCommits = git log --since="2024-05-01" --until="2024-05-31" --oneline | Measure-Object | Select-Object -ExpandProperty Count
$remainingJuneCommits = git log --since="2024-06-01" --until="2024-06-30" --oneline | Measure-Object | Select-Object -ExpandProperty Count

Write-Host "`nRemaining commits:" -ForegroundColor Green
Write-Host "  May 2024: $remainingMayCommits commits" -ForegroundColor White
Write-Host "  June 2024: $remainingJuneCommits commits" -ForegroundColor White