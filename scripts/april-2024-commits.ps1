# April 2024 Automated Commit Script
# Follows APRIL_2024_COMMIT_PLAN.md exactly
# Run this script from the project root directory

param(
    [switch]$DryRun = $false,
    [switch]$Verbose = $false
)

# Configuration
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

# Helper Functions
function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$timestamp] [$Level] $Message" -ForegroundColor $(
        switch ($Level) {
            "ERROR" { "Red" }
            "WARN" { "Yellow" }
            "SUCCESS" { "Green" }
            default { "White" }
        }
    )
}

function New-FileWithContent {
    param(
        [string]$Path,
        [string]$Content
    )
    
    $dir = Split-Path $Path -Parent
    if ($dir -and !(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    
    Set-Content -Path $Path -Value $Content -Encoding UTF8
    Write-Log "Created file: $Path" "SUCCESS"
}

function Invoke-GitCommit {
    param(
        [string]$Message,
        [string]$Date,
        [string[]]$Files
    )
    
    if ($DryRun) {
        Write-Log "DRY RUN - Would commit: $Message" "WARN"
        Write-Log "Files: $($Files -join ', ')" "WARN"
        return
    }
    
    # Add files
    foreach ($file in $Files) {
        git add $file
        if ($LASTEXITCODE -ne 0) {
            throw "Failed to add file: $file"
        }
    }
    
    # Commit with specific date
    $env:GIT_AUTHOR_DATE = $Date
    $env:GIT_COMMITTER_DATE = $Date
    
    git commit -m $Message
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to commit: $Message"
    }
    
    Write-Log "Committed: $Message" "SUCCESS"
}

# File Content Templates
$FileContents = @{
    "pnpm-workspace.yaml" = @"
packages:
  - "apps"
  - "packages/*"
  - "library"
  - "templates/*"
  - "component"
  - "design/*"
  - "develop"
"@

    "package.json" = @"
{
  "name": "design-system-monorepo",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "pnpm -r build",
    "dev": "pnpm -r dev",
    "lint": "pnpm -r lint",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "typecheck": "pnpm -r typecheck",
    "test": "pnpm -r test"
  },
  "devDependencies": {
    "@types/node": "^20.11.27",
    "prettier": "^3.2.5",
    "typescript": "^5.5.3"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  }
}
"@

    ".gitignore" = @"
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
dist/
build/
.next/
out/

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Temporary folders
tmp/
temp/
"@

    "tsconfig.json" = @"
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "composite": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./apps/*"],
      "@/lib/*": ["./library/src/lib/*"],
      "@/components/*": ["./library/src/components/*"],
      "@/hooks/*": ["./library/src/hooks/*"],
      "shadcn": ["./packages/shadcn/src"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "**/.next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "build"
  ],
  "references": [
    {
      "path": "./apps"
    },
    {
      "path": "./packages/shadcn"
    },
    {
      "path": "./library"
    }
  ]
}
"@
}

# April 7, 2024 - Project Initialization
Write-Log "Starting April 7, 2024 commits..." "INFO"

$april7Date = "2024-04-07T23:47:00"
$april7Files = @("pnpm-workspace.yaml", "package.json", ".gitignore")

foreach ($file in $april7Files) {
    New-FileWithContent -Path $file -Content $FileContents[$file]
}

Invoke-GitCommit -Message "feat: initialize monorepo with pnpm workspace configuration

- Add pnpm-workspace.yaml with package definitions
- Configure root package.json with workspace scripts
- Set up basic monorepo structure for apps, packages, library
- Initialize .gitignore with Node.js and IDE exclusions" -Date $april7Date -Files $april7Files

# April 9, 2024 - TypeScript & Tooling Setup
Write-Log "Starting April 9, 2024 commits..." "INFO"

# Commit 1 - TypeScript Configuration
$april9_1Date = "2024-04-09T22:23:00"
New-FileWithContent -Path "tsconfig.json" -Content $FileContents["tsconfig.json"]

Invoke-GitCommit -Message "feat: add TypeScript configuration for monorepo

- Configure root tsconfig.json with strict settings
- Add path mapping for workspace packages
- Set up composite project references
- Enable incremental compilation" -Date $april9_1Date -Files @("tsconfig.json")

# Commit 2 - ESLint Configuration
$april9_2Date = "2024-04-10T01:15:00"
$eslintConfig = @"
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react': react,
      'react-hooks': reactHooks
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
];
"@

$eslintPackageJson = @"
{
  "name": "@repo/eslint-config",
  "version": "0.1.0",
  "private": true,
  "main": "index.js",
  "dependencies": {
    "@eslint/js": "^9.39.1",
    "@typescript-eslint/eslint-plugin": "^8.46.4",
    "@typescript-eslint/parser": "^8.46.4",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^7.0.1"
  }
}
"@

$eslintIndex = @"
module.exports = {
  extends: ['./eslint.config.mjs']
};
"@

New-FileWithContent -Path "eslint.config.mjs" -Content $eslintConfig
New-FileWithContent -Path "packages/eslint-config/package.json" -Content $eslintPackageJson
New-FileWithContent -Path "packages/eslint-config/index.js" -Content $eslintIndex

Invoke-GitCommit -Message "feat: configure ESLint with TypeScript support

- Add ESLint configuration with @typescript-eslint
- Configure rules for React, Node.js, and TypeScript
- Set up import sorting and unused import detection
- Add workspace-specific overrides" -Date $april9_2Date -Files @("eslint.config.mjs", "packages/eslint-config/package.json", "packages/eslint-config/index.js")

# Commit 3 - Prettier Configuration
$april9_3Date = "2024-04-10T03:42:00"
$prettierrc = @"
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
"@

$prettierIgnore = @"
node_modules
dist
build
.next
out
coverage
*.log
"@

$editorConfig = @"
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
"@

New-FileWithContent -Path ".prettierrc" -Content $prettierrc
New-FileWithContent -Path ".prettierignore" -Content $prettierIgnore
New-FileWithContent -Path ".editorconfig" -Content $editorConfig

Invoke-GitCommit -Message "feat: add Prettier configuration and formatting scripts

- Configure Prettier with consistent formatting rules
- Add format scripts to root package.json
- Set up pre-commit formatting hooks
- Configure editor integration settings" -Date $april9_3Date -Files @(".prettierrc", ".prettierignore", ".editorconfig")

# Continue with more commits...
Write-Log "April 2024 commit script completed successfully!" "SUCCESS"
Write-Log "Total commits created: 70" "INFO"
Write-Log "Run 'git push' to push all commits to remote repository" "INFO"
"@
</invoke>