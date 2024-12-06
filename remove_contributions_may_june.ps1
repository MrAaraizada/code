# Remove Contributions for Random Days in May and June 2024
Write-Host "Removing contributions for 10 random days each from May and June 2024..." -ForegroundColor Red

# Function to get all commit hashes for a specific date
function Get-CommitsForDate {
    param([string]$Date)
    $commits = git log --all --since="$Date 00:00:00" --until="$Date 23:59:59" --pretty=format:"%H"
    return $commits -split "`n" | Where-Object { $_ -ne "" }
}

# Function to remove commits for a specific date
function Remove-CommitsForDate {
    param([string]$Date)
    Write-Host "Removing all commits for $Date..." -ForegroundColor Yellow
    
    $commits = Get-CommitsForDate $Date
    if ($commits.Count -eq 0) {
        Write-Host "No commits found for $Date" -ForegroundColor Gray
        return
    }
    
    Write-Host "Found $($commits.Count) commits for $Date" -ForegroundColor Cyan
    
    # Create a new branch to preserve history
    $branchName = "backup-before-removal-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    git branch $branchName
    
    # Remove commits by interactive rebase (we'll use filter-branch for automation)
    foreach ($commit in $commits) {
        Write-Host "Removing commit: $commit" -ForegroundColor Red
        # Use git rebase to remove specific commits
        git rebase --onto $commit^ $commit
    }
}

# May 2024 - Select 10 random days (1-31)
$mayDays = @()
$allMayDays = 1..31
while ($mayDays.Count -lt 10) {
    $randomDay = Get-Random -Minimum 1 -Maximum 32
    if ($randomDay -notin $mayDays) {
        $mayDays += $randomDay
    }
}

# June 2024 - Select 10 random days (1-30), ensuring different from May
$juneDays = @()
$allJuneDays = 1..30
while ($juneDays.Count -lt 10) {
    $randomDay = Get-Random -Minimum 1 -Maximum 31
    if ($randomDay -notin $juneDays -and $randomDay -notin $mayDays -and $randomDay -le 30) {
        $juneDays += $randomDay
    }
}

Write-Host "Selected days for removal:" -ForegroundColor Magenta
Write-Host "May 2024: $($mayDays -join ', ')" -ForegroundColor Yellow
Write-Host "June 2024: $($juneDays -join ', ')" -ForegroundColor Yellow

# Sort days for processing
$mayDays = $mayDays | Sort-Object
$juneDays = $juneDays | Sort-Object

Write-Host "`nStarting removal process..." -ForegroundColor Red

# Process May 2024 removals
Write-Host "`nProcessing May 2024 removals..." -ForegroundColor Magenta
foreach ($day in $mayDays) {
    $dateStr = "2024-05-{0:D2}" -f $day
    Remove-CommitsForDate $dateStr
}

# Process June 2024 removals
Write-Host "`nProcessing June 2024 removals..." -ForegroundColor Magenta
foreach ($day in $juneDays) {
    $dateStr = "2024-06-{0:D2}" -f $day
    Remove-CommitsForDate $dateStr
}

Write-Host "`nContribution removal completed!" -ForegroundColor Green
Write-Host "Removed contributions for:" -ForegroundColor Cyan
Write-Host "May 2024: $($mayDays -join ', ')" -ForegroundColor Yellow
Write-Host "June 2024: $($juneDays -join ', ')" -ForegroundColor Yellow

# Show git log summary
Write-Host "`nGit log summary after removal:" -ForegroundColor Cyan
git log --oneline --since="2024-05-01" --until="2024-06-30" | Measure-Object | ForEach-Object { Write-Host "Total commits remaining in May-June 2024: $($_.Count)" -ForegroundColor Green }