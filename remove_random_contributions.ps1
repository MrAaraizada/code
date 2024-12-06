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

# Create backup branch
$backupBranch = "backup-before-removal-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Write-Host "`nCreating backup branch: $backupBranch" -ForegroundColor Cyan
git branch $backupBranch

# Function to get commit hashes for a specific date
function Get-CommitHashesForDate {
    param([string]$Date)
    $startDate = "$Date 00:00:00"
    $endDate = "$Date 23:59:59"
    
    $commits = git log --all --since="$startDate" --until="$endDate" --pretty=format:"%H"
    if ($commits) {
        return $commits -split "`n" | Where-Object { $_ -ne "" }
    }
    return @()
}

# Function to remove commits using git rebase
function Remove-CommitsInteractive {
    param([string[]]$CommitHashes, [string]$Date)
    
    if ($CommitHashes.Count -eq 0) {
        Write-Host "No commits found for $Date" -ForegroundColor Gray
        return
    }
    
    Write-Host "Found $($CommitHashes.Count) commits for $Date" -ForegroundColor Yellow
    
    # For each commit, we'll use git rebase to remove it
    foreach ($hash in $CommitHashes) {
        try {
            Write-Host "Removing commit $hash from $Date..." -ForegroundColor Red
            
            # Get the parent commit
            $parentHash = git rev-parse "$hash^"
            
            # Use git rebase to remove the commit
            git rebase --onto $parentHash $hash
            
            Write-Host "Successfully removed commit $hash" -ForegroundColor Green
        }
        catch {
            Write-Host "Failed to remove commit $hash`: $_" -ForegroundColor Red
        }
    }
}

Write-Host "`nStarting commit removal process..." -ForegroundColor Red

# Remove commits for May 2024
Write-Host "`n=== Processing May 2024 ===" -ForegroundColor Magenta
foreach ($day in $mayDays) {
    $dateStr = "2024-05-{0:D2}" -f $day
    $commits = Get-CommitHashesForDate $dateStr
    Remove-CommitsInteractive $commits $dateStr
}

# Remove commits for June 2024  
Write-Host "`n=== Processing June 2024 ===" -ForegroundColor Magenta
foreach ($day in $juneDays) {
    $dateStr = "2024-06-{0:D2}" -f $day
    $commits = Get-CommitHashesForDate $dateStr
    Remove-CommitsInteractive $commits $dateStr
}

Write-Host "`n=== Removal Summary ===" -ForegroundColor Green
Write-Host "Backup branch created: $backupBranch" -ForegroundColor Cyan
Write-Host "Removed contributions for:" -ForegroundColor Yellow
Write-Host "  May 2024: $($mayDays -join ', ')" -ForegroundColor White
Write-Host "  June 2024: $($juneDays -join ', ')" -ForegroundColor White

# Verify removal
Write-Host "`nVerifying removal..." -ForegroundColor Cyan
$remainingMayCommits = git log --since="2024-05-01" --until="2024-05-31" --oneline | Measure-Object | Select-Object -ExpandProperty Count
$remainingJuneCommits = git log --since="2024-06-01" --until="2024-06-30" --oneline | Measure-Object | Select-Object -ExpandProperty Count

Write-Host "Remaining commits:" -ForegroundColor Green
Write-Host "  May 2024: $remainingMayCommits commits" -ForegroundColor White
Write-Host "  June 2024: $remainingJuneCommits commits" -ForegroundColor White

Write-Host "`nNote: If you need to restore, use: git checkout $backupBranch" -ForegroundColor Yellow