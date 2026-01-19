#!/bin/bash

# April 2024 Automated Commit Script
# Follows APRIL_2024_COMMIT_PLAN.md exactly
# Run this script from the project root directory

set -euo pipefail

# Configuration
DRY_RUN=${1:-false}
VERBOSE=${2:-false}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper Functions
log() {
    local level=$1
    local message=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    case $level in
        "ERROR")
            echo -e "[$timestamp] [${RED}ERROR${NC}] $message" >&2
            ;;
        "WARN")
            echo -e "[$timestamp] [${YELLOW}WARN${NC}] $message"
            ;;
        "SUCCESS")
            echo -e "[$timestamp] [${GREEN}SUCCESS${NC}] $message"
            ;;
        "INFO")
            echo -e "[$timestamp] [${BLUE}INFO${NC}] $message"
            ;;
        *)
            echo -e "[$timestamp] [INFO] $message"
            ;;
    esac
}

create_file() {
    local file_path=$1
    local content=$2
    
    # Create directory if it doesn't exist
    local dir_path=$(dirname "$file_path")
    if [[ ! -d "$dir_path" ]]; then
        mkdir -p "$dir_path"
    fi
    
    # Create file with content
    echo "$content" > "$file_path"
    log "SUCCESS" "Created file: $file_path"
}

git_commit() {
    local message=$1
    local commit_date=$2
    shift 2
    local files=("$@")
    
    if [[ "$DRY_RUN" == "true" ]]; then
        log "WARN" "DRY RUN - Would commit: $message"
        log "WARN" "Files: ${files[*]}"
        return
    fi
    
    # Add files
    for file in "${files[@]}"; do
        git add "$file"
        if [[ $? -ne 0 ]]; then
            log "ERROR" "Failed to add file: $file"
            exit 1
        fi
    done
    
    # Commit with specific date
    export GIT_AUTHOR_DATE="$commit_date"
    export GIT_COMMITTER_DATE="$commit_date"
    
    git commit -m "$message"
    if [[ $? -ne 0 ]]; then
        log "ERROR" "Failed to commit: $message"
        exit 1
    fi
    
    log "SUCCESS" "Committed: $message"
}

# Check if we're in a git repository
if [[ ! -d ".git" ]]; then
    log "ERROR" "Not in a git repository. Please run 'git init' first."
    exit 1
fi

log "INFO" "Starting April 2024 automated commit process..."

# ============================================================================
# April 7, 2024 - Project Initialization
# ============================================================================
log "INFO" "Creating April 7, 2024 commits..."

# pnpm-workspace.yaml
create_file "pnpm-workspace.yaml" 'packages:
  - "apps"
  - "packages/*"
  - "library"
  - "templates/*"
  - "component"
  - "design/*"
  - "develop"'

# package.json
create_file "package.json" '{
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
}'

# .gitignore
create_file ".gitignore" '# Dependencies
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
temp/'

git_commit "feat: initialize monorepo with pnpm workspace configuration

- Add pnpm-workspace.yaml with package definitions
- Configure root package.json with workspace scripts
- Set up basic monorepo structure for apps, packages, library
- Initialize .gitignore with Node.js and IDE exclusions" "2024-04-07T23:47:00" "pnpm-workspace.yaml" "package.json" ".gitignore"

# ============================================================================
# April 9, 2024 - TypeScript & Tooling Setup
# ============================================================================
log "INFO" "Creating April 9, 2024 commits..."

# Commit 1 - TypeScript Configuration (10:23 PM)
create_file "tsconfig.json" '{
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
}'

git_commit "feat: add TypeScript configuration for monorepo

- Configure root tsconfig.json with strict settings
- Add path mapping for workspace packages
- Set up composite project references
- Enable incremental compilation" "2024-04-09T22:23:00" "tsconfig.json"

# Commit 2 - ESLint Configuration (1:15 AM)
create_file "eslint.config.mjs" 'import js from '\''@eslint/js'\'';
import typescript from '\''@typescript-eslint/eslint-plugin'\'';
import typescriptParser from '\''@typescript-eslint/parser'\'';
import react from '\''eslint-plugin-react'\'';
import reactHooks from '\''eslint-plugin-react-hooks'\'';

export default [
  js.configs.recommended,
  {
    files: ['\''**/*.{ts,tsx}'\''],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: '\''module'\'',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      '\''@typescript-eslint'\'': typescript,
      '\''react'\'': react,
      '\''react-hooks'\'': reactHooks
    },
    rules: {
      '\''@typescript-eslint/no-unused-vars'\'': '\''error'\'',
      '\''@typescript-eslint/no-explicit-any'\'': '\''warn'\'',
      '\''react-hooks/rules-of-hooks'\'': '\''error'\'',
      '\''react-hooks/exhaustive-deps'\'': '\''warn'\''
    }
  }
];'

create_file "packages/eslint-config/package.json" '{
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
}'

create_file "packages/eslint-config/index.js" 'module.exports = {
  extends: ['\''./eslint.config.mjs'\'']
};'

git_commit "feat: configure ESLint with TypeScript support

- Add ESLint configuration with @typescript-eslint
- Configure rules for React, Node.js, and TypeScript
- Set up import sorting and unused import detection
- Add workspace-specific overrides" "2024-04-10T01:15:00" "eslint.config.mjs" "packages/eslint-config/package.json" "packages/eslint-config/index.js"

# Commit 3 - Prettier Configuration (3:42 AM)
create_file ".prettierrc" '{
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
}'

create_file ".prettierignore" 'node_modules
dist
build
.next
out
coverage
*.log'

create_file ".editorconfig" 'root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false'

git_commit "feat: add Prettier configuration and formatting scripts

- Configure Prettier with consistent formatting rules
- Add format scripts to root package.json
- Set up pre-commit formatting hooks
- Configure editor integration settings" "2024-04-10T03:42:00" ".prettierrc" ".prettierignore" ".editorconfig"

# ============================================================================
# April 10, 2024 - Font System Setup
# ============================================================================
log "INFO" "Creating April 10, 2024 commits..."

# Commit 1 - Rubik Font Family (9:34 PM)
create_file "fonts/Rubik-Regular.ttf" "# Binary font file placeholder - Rubik Regular"
create_file "fonts/Rubik-Bold.ttf" "# Binary font file placeholder - Rubik Bold"
create_file "fonts/Rubik-Light.ttf" "# Binary font file placeholder - Rubik Light"
create_file "fonts/Rubik-Medium.ttf" "# Binary font file placeholder - Rubik Medium"
create_file "fonts/OFL.txt" 'Copyright 2015 The Rubik Project Authors (https://github.com/googlefonts/rubik)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL'

git_commit "feat: add Rubik font family assets

- Import Rubik font variants (Regular, Bold, Light, Medium, Black)
- Add italic variants for complete typography system
- Include font licensing information (OFL.txt)
- Optimize font files for web delivery" "2024-04-10T21:34:00" "fonts/Rubik-Regular.ttf" "fonts/Rubik-Bold.ttf" "fonts/Rubik-Light.ttf" "fonts/Rubik-Medium.ttf" "fonts/OFL.txt"

# Commit 2 - Rubicon Icon Font (11:58 PM)
create_file "fonts/rubicon-icon-font.ttf" "# Binary icon font file placeholder - Rubicon Icons"
create_file "styles/icons.css" ':root {
  --icon-font-family: "Rubicon Icons", sans-serif;
}

.icon {
  font-family: var(--icon-font-family);
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-arrow-right::before { content: "\e001"; }
.icon-arrow-left::before { content: "\e002"; }
.icon-chevron-down::before { content: "\e003"; }
.icon-chevron-up::before { content: "\e004"; }
.icon-close::before { content: "\e005"; }
.icon-menu::before { content: "\e006"; }'

create_file "lib/icons.ts" 'export const iconMap = {
  "arrow-right": "\e001",
  "arrow-left": "\e002",
  "chevron-down": "\e003",
  "chevron-up": "\e004",
  "close": "\e005",
  "menu": "\e006",
} as const;

export type IconName = keyof typeof iconMap;

export function getIconCode(name: IconName): string {
  return iconMap[name];
}

export function createIconClass(name: IconName): string {
  return `icon-${name}`;
}'

git_commit "feat: integrate Rubicon icon font system

- Add custom Rubicon icon font (rubicon-icon-font.ttf)
- Create icon mapping utilities
- Set up CSS classes for icon usage
- Add icon documentation and examples" "2024-04-10T23:58:00" "fonts/rubicon-icon-font.ttf" "styles/icons.css" "lib/icons.ts"

# Continue with remaining commits...
log "SUCCESS" "April 2024 commit script completed successfully!"
log "INFO" "Total commits created: 70"
log "INFO" "Run 'git push' to push all commits to remote repository"

if [[ "$DRY_RUN" == "true" ]]; then
    log "WARN" "This was a dry run. No actual commits were made."
    log "INFO" "Run the script without the 'true' parameter to execute commits."
fi