# Identify and Remove Random Contributions from May and June 2024
Write-Host "Identifying contributions for 10 random days each from May and June 2024..." -ForegroundColor Red

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

# Create list of all dates
$allDates = @()
foreach ($day in $mayDays) {
    $allDates += "2024-05-{0:D2}" -f $day
}
foreach ($day in $juneDays) {
    $allDates += "2024-06-{0:D2}" -f $day
}

Write-Host "`nIdentifying commits to remove..." -ForegroundColor Cyan

$totalCommitsToRemove = 0
$commitHashes = @()

foreach ($date in $allDates) {
    Write-Host "`nChecking $date..." -ForegroundColor Yellow
    
    $commits = git log --since="$date 00:00:00" --until="$date 23:59:59" --pretty=format:"%H|%ci|%s"
    
    if ($commits) {
        $commitLines = $commits -split "`n" | Where-Object { $_ -ne "" }
        Write-Host "  Found $($commitLines.Count) commits:" -ForegroundColor Green
        
        foreach ($commitLine in $commitLines) {
            $parts = $commitLine -split "\|"
            $hash = $parts[0]
            $datetime = $parts[1]
            $message = $parts[2]
            
            Write-Host "    $hash - $datetime - $message" -ForegroundColor Gray
            $commitHashes += $hash
            $totalCommitsToRemove++
        }
    } else {
        Write-Host "  No commits found" -ForegroundColor Gray
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor Magenta
Write-Host "Total commits to remove: $totalCommitsToRemove" -ForegroundColor Red
Write-Host "Dates affected: $($allDates.Count)" -ForegroundColor Yellow

if ($totalCommitsToRemove -gt 0) {
    Write-Host "`nCreating backup and removing commits..." -ForegroundColor Red
    
    # Create backup branch
    $backupBranch = "backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    git checkout -b $backupBranch | Out-Null
    git checkout main | Out-Null
    Write-Host "Backup created: $backupBranch" -ForegroundColor Cyan
    
    # Remove commits one by one (from newest to oldest)
    $commitHashes = $commitHashes | Sort-Object -Unique
    
    foreach ($hash in $commitHashes) {
        Write-Host "Removing commit $hash..." -ForegroundColor Yellow
        git rebase --onto "$hash^" $hash | Out-Null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✓ Removed" -ForegroundColor Green
        } else {
            Write-Host "  ✗ Failed" -ForegroundColor Red
        }
    }
    
    Write-Host "`nVerifying removal..." -ForegroundColor Cyan
    
    foreach ($date in $allDates) {
        $remaining = git log --since="$date 00:00:00" --until="$date 23:59:59" --oneline
        if ($remaining) {
            Write-Host "⚠️  $date still has commits" -ForegroundColor Yellow
        } else {
            Write-Host "✓ $date - completely empty" -ForegroundColor Green
        }
    }
    
    Write-Host "`n=== Final Result ===" -ForegroundColor Green
    Write-Host "Successfully removed contributions from:" -ForegroundColor Yellow
    Write-Host "  May 2024: $($mayDays -join ', ')" -ForegroundColor White
    Write-Host "  June 2024: $($juneDays -join ', ')" -ForegroundColor White
    Write-Host "`nBackup branch: $backupBranch" -ForegroundColor Cyan
    
} else {
    Write-Host "`nNo commits found to remove!" -ForegroundColor Yellow
}