# Clean up commit history to remove planning files
Write-Host "Cleaning up commit history..." -ForegroundColor Yellow

# First, let's see what files we want to remove
$planningFiles = @(
    "APRIL_2024_COMMIT_PLAN.md",
    "COMMIT_AUTOMATION_GUIDE.md", 
    "PROJECT_DEVELOPMENT_PLAN.md"
)

Write-Host "Files to remove from history:" -ForegroundColor Red
$planningFiles | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }

# Check if files exist in current directory
Write-Host "`nChecking current directory..." -ForegroundColor Yellow
foreach ($file in $planningFiles) {
    if (Test-Path $file) {
        Write-Host "Found: $file - will be removed" -ForegroundColor Red
        Remove-Item $file -Force
    } else {
        Write-Host "Not found: $file" -ForegroundColor Green
    }
}

# Remove from git tracking if they exist
Write-Host "`nRemoving files from git..." -ForegroundColor Yellow
foreach ($file in $planningFiles) {
    try {
        git rm --cached $file 2>$null
        Write-Host "Removed from git: $file" -ForegroundColor Green
    } catch {
        Write-Host "File not in git: $file" -ForegroundColor Gray
    }
}

# Check git status
Write-Host "`nCurrent git status:" -ForegroundColor Yellow
git status --porcelain

# If there are changes, commit them
$status = git status --porcelain
if ($status) {
    Write-Host "`nCommitting cleanup..." -ForegroundColor Yellow
    git add -A
    git commit -m "cleanup: remove planning and automation files

- Remove APRIL_2024_COMMIT_PLAN.md
- Remove COMMIT_AUTOMATION_GUIDE.md  
- Remove PROJECT_DEVELOPMENT_PLAN.md
- Keep only actual project structure files"
    
    Write-Host "Cleanup committed!" -ForegroundColor Green
} else {
    Write-Host "No changes to commit" -ForegroundColor Green
}

Write-Host "`nCleanup completed!" -ForegroundColor Green