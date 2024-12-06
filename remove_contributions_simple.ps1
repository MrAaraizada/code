# Simple Contribution Removal for May and June 2024
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

# Function to collect commits for removal
function Get-CommitsToRemove {
    param([string[]]$Dates)
    
    $commitsToRemove = @()
    
    foreach ($date in $Dates) {
        Write-Host "Checking commits for $date..." -ForegroundColor Yellow
        
        # Get commits for this specific date
        $commits = git log --all --since="$date 00:00:00" --until="$date 23:59:59" --pretty=format:"%H"
        
        if ($commits) {
            $commitList = $commits -split "`n" | Where-Object { $_ -ne "" }
            Write-Host "  Found $($commitList.Count) commits" -ForegroundColor Cyan
            $commitsToRemove += $commitList
        } else {
            Write-Host "  No commits found" -ForegroundColor Gray
        }
    }
    
    return $commitsToRemove
}

# Collect all dates to process
$allDatesToRemove = @()
foreach ($day in $mayDays) {
    $allDatesToRemove += "2024-05-{0:D2}" -f $day
}
foreach ($day in $juneDays) {
    $allDatesToRemove += "2024-06-{0:D2}" -f $day
}

Write-Host "`nCollecting commits to remove..." -ForegroundColor Magenta
$allCommitsToRemove = Get-CommitsToRemove $allDatesToRemove

if ($allCommitsToRemove.Count -eq 0) {
    Write-Host "No commits found for the selected dates!" -ForegroundColor Yellow
    exit
}

Write-Host "Total commits to remove: $($allCommitsToRemove.Count)" -ForegroundColor Red

# Remove duplicates and sort by commit date (newest first)
$uniqueCommits = $allCommitsToRemove | Sort-Object -Unique

Write-Host "`nStarting removal process..." -ForegroundColor Red

# Use git rebase interactive to remove commits
foreach ($commit in $uniqueCommits) {
    try {
        Write-Host "Removing commit: $commit" -ForegroundColor Yellow
        
        # Get commit info for verification
        $commitInfo = git log -1 --format="%ci %s" $commit
        Write-Host "  $commitInfo" -ForegroundColor Gray
        
        # Remove the commit using git rebase
        $parentCommit = git rev-parse "$commit^"
        git rebase --onto $parentCommit $commit HEAD
        
        Write-Host "  ✓ Removed successfully" -ForegroundColor Green
    }
    catch {
        Write-Host "  ✗ Failed to remove: $_" -ForegroundColor Red
    }
}

Write-Host "`n=== Verification ===" -ForegroundColor Cyan
foreach ($date in $allDatesToRemove) {
    $remainingCommits = git log --since="$date 00:00:00" --until="$date 23:59:59" --oneline
    if ($remainingCommits) {
        Write-Host "⚠️  $date still has commits:" -ForegroundColor Yellow
        $remainingCommits | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
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
$mayCount = (git log --since="2024-05-01" --until="2024-05-31" --oneline | Measure-Object).Count
$juneCount = (git log --since="2024-06-01" --until="2024-06-30" --oneline | Measure-Object).Count

Write-Host "`nRemaining commits:" -ForegroundColor Cyan
Write-Host "  May 2024: $mayCount commits" -ForegroundColor White
Write-Host "  June 2024: $juneCount commits" -ForegroundColor White

Write-Host "`nTo restore if needed: git checkout $backupBranch" -ForegroundColor Yellow