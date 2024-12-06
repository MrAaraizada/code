# Remove Random Contributions from May and June 2024
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

# Create backup
$backupBranch = "backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Write-Host "`nCreating backup branch: $backupBranch" -ForegroundColor Cyan
git checkout -b $backupBranch
git checkout main

# Collect all dates to process
$allDatesToRemove = @()
foreach ($day in $mayDays) {
    $allDatesToRemove += "2024-05-{0:D2}" -f $day
}
foreach ($day in $juneDays) {
    $allDatesToRemove += "2024-06-{0:D2}" -f $day
}

Write-Host "`nProcessing each date..." -ForegroundColor Magenta

foreach ($date in $allDatesToRemove) {
    Write-Host "`nProcessing $date..." -ForegroundColor Yellow
    
    # Get commits for this date
    $commits = git log --all --since="$date 00:00:00" --until="$date 23:59:59" --pretty=format:"%H"
    
    if ($commits) {
        $commitList = $commits -split "`n" | Where-Object { $_ -ne "" }
        Write-Host "Found $($commitList.Count) commits to remove" -ForegroundColor Cyan
        
        # Remove each commit
        foreach ($commit in $commitList) {
            $commitInfo = git log -1 --format="%ci %s" $commit 2>$null
            if ($commitInfo) {
                Write-Host "  Removing: $commitInfo" -ForegroundColor Gray
                
                # Use git reset to remove commits (simpler approach)
                $parentCommit = git rev-parse "$commit^" 2>$null
                if ($parentCommit) {
                    git rebase --onto $parentCommit $commit 2>$null
                    if ($LASTEXITCODE -eq 0) {
                        Write-Host "    ✓ Removed" -ForegroundColor Green
                    } else {
                        Write-Host "    ✗ Failed" -ForegroundColor Red
                    }
                }
            }
        }
    } else {
        Write-Host "No commits found for $date" -ForegroundColor Gray
    }
}

Write-Host "`n=== Verification ===" -ForegroundColor Cyan
foreach ($date in $allDatesToRemove) {
    $remainingCommits = git log --since="$date 00:00:00" --until="$date 23:59:59" --oneline 2>$null
    if ($remainingCommits) {
        Write-Host "⚠️  $date still has commits" -ForegroundColor Yellow
    } else {
        Write-Host "✓ $date - all commits removed" -ForegroundColor Green
    }
}

Write-Host "`n=== Final Summary ===" -ForegroundColor Green
Write-Host "Backup branch: $backupBranch" -ForegroundColor Cyan
Write-Host "Removed contributions from:" -ForegroundColor Yellow
Write-Host "  May 2024: $($mayDays -join ', ')" -ForegroundColor White
Write-Host "  June 2024: $($juneDays -join ', ')" -ForegroundColor White

# Show remaining commit counts
$mayCommits = git log --since="2024-05-01" --until="2024-05-31" --oneline 2>$null
$juneCommits = git log --since="2024-06-01" --until="2024-06-30" --oneline 2>$null

$mayCount = if ($mayCommits) { ($mayCommits | Measure-Object).Count } else { 0 }
$juneCount = if ($juneCommits) { ($juneCommits | Measure-Object).Count } else { 0 }

Write-Host "`nRemaining commits:" -ForegroundColor Cyan
Write-Host "  May 2024: $mayCount commits" -ForegroundColor White
Write-Host "  June 2024: $juneCount commits" -ForegroundColor White

Write-Host "`nTo restore if needed: git checkout $backupBranch" -ForegroundColor Yellow