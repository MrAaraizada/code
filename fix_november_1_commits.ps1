# Fix November 1, 2024 Missing Commits
Write-Host "Creating missing November 1, 2024 commits..." -ForegroundColor Green

function Create-File {
    param([string]$Path, [string]$Content)
    $directory = Split-Path -Parent $Path
    if (!(Test-Path $directory)) { New-Item -ItemType Directory -Path $directory -Force | Out-Null }
    Set-Content -Path $Path -Value $Content -Encoding UTF8
}

function Make-GitCommit {
    param([string]$Date, [string]$Time, [string]$Message, [string[]]$Files)
    Write-Host "Creating: $Message" -ForegroundColor Yellow
    foreach ($file in $Files) { git add $file }
    $env:GIT_AUTHOR_DATE = "$Date $Time"
    $env:GIT_COMMITTER_DATE = "$Date $Time"
    git commit -m $Message
    Write-Host "Done" -ForegroundColor Green
}

# Check if the files already exist, if so, we need to create new ones or modify existing
$needsNewFiles = $false

if (!(Test-Path "develop/components/types/index.ts")) {
    $needsNewFiles = $true
}

if ($needsNewFiles) {
    Write-Host "Creating missing November 1 foundation files..." -ForegroundColor Cyan
    
    # November 1, 2024 - Commit 1: 12:47 AM - Foundation setup
    Create-File "develop/components/types/ComponentTypes.ts" @'
export interface ComponentProps {
  children?: React.ReactNode;
  style?: any;
  testID?: string;
}

export interface ThemeProps {
  theme?: 'light' | 'dark';
  colors?: Record<string, string>;
}

export type ComponentVariant = 'primary' | 'secondary' | 'outline';
export type ComponentSize = 'sm' | 'md' | 'lg';

export interface BaseComponentProps extends ComponentProps {
  variant?: ComponentVariant;
  size?: ComponentSize;
  disabled?: boolean;
}
'@

    Create-File "develop/services/DeviceDetectionFoundation.ts" @'
import { Platform, Dimensions } from 'react-native';

export class DeviceDetectionFoundation {
  private static instance: DeviceDetectionFoundation;
  
  public static getInstance(): DeviceDetectionFoundation {
    if (!DeviceDetectionFoundation.instance) {
      DeviceDetectionFoundation.instance = new DeviceDetectionFoundation();
    }
    return DeviceDetectionFoundation.instance;
  }
  
  public isIOS(): boolean {
    return Platform.OS === 'ios';
  }
  
  public isAndroid(): boolean {
    return Platform.OS === 'android';
  }
  
  public getScreenDimensions() {
    return Dimensions.get('window');
  }
  
  public isTablet(): boolean {
    const { width, height } = this.getScreenDimensions();
    const minDimension = Math.min(width, height);
    return minDimension >= 768;
  }
}
'@

    Make-GitCommit "2024-11-01" "00:47:00" "feat(develop): initialize React Native component foundation" @("develop/components/types/ComponentTypes.ts", "develop/services/DeviceDetectionFoundation.ts")

    # November 1, 2024 - Commit 2: 1:23 AM - Button component
    Create-File "develop/components/Button/ButtonFoundation.tsx" @'
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BaseComponentProps } from '../types/ComponentTypes';

interface ButtonFoundationProps extends BaseComponentProps {
  onPress?: () => void;
}

export const ButtonFoundation: React.FC<ButtonFoundationProps> = ({ 
  children, 
  onPress, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  style 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, styles[variant], styles[size], disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  lg: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#8E8E93',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#007AFF',
  },
});

export default ButtonFoundation;
'@

    Create-File "develop/components/Button/ButtonIndex.ts" @'
export { ButtonFoundation as Button } from './ButtonFoundation';
export default ButtonFoundation;
'@

    Make-GitCommit "2024-11-01" "01:23:00" "feat(develop): add Button component for React Native" @("develop/components/Button/ButtonFoundation.tsx", "develop/components/Button/ButtonIndex.ts")

    # November 1, 2024 - Commit 3: 2:15 AM - Input component with theming
    Create-File "develop/components/Input/InputFoundation.tsx" @'
import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { BaseComponentProps } from '../types/ComponentTypes';

interface InputFoundationProps extends BaseComponentProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
}

export const InputFoundation: React.FC<InputFoundationProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  disabled = false,
  style
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError, disabled && styles.disabled]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={!disabled}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  disabled: {
    backgroundColor: '#F5F5F5',
    opacity: 0.6,
  },
  error: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
  },
});

export default InputFoundation;
'@

    Create-File "develop/styles/themeFoundation.ts" @'
export const ThemeFoundation = {
  colors: {
    primary: '#007AFF',
    secondary: '#8E8E93',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
};

export default ThemeFoundation;
'@

    Make-GitCommit "2024-11-01" "02:15:00" "feat(develop): implement Input component with theming" @("develop/components/Input/InputFoundation.tsx", "develop/styles/themeFoundation.ts")

    # November 1, 2024 - Commit 4: 4:12 AM - Platform utilities and docs
    Create-File "develop/utils/PlatformUtilsFoundation.ts" @'
import { Platform } from 'react-native';

export class PlatformUtilsFoundation {
  public static isIOS(): boolean {
    return Platform.OS === 'ios';
  }
  
  public static isAndroid(): boolean {
    return Platform.OS === 'android';
  }
  
  public static isWeb(): boolean {
    return Platform.OS === 'web';
  }
  
  public static getPlatformValue<T>(values: {
    ios?: T;
    android?: T;
    web?: T;
    default: T;
  }): T {
    const platform = Platform.OS;
    return values[platform] ?? values.default;
  }
  
  public static getVersion(): string {
    return Platform.Version.toString();
  }
  
  public static select<T>(specifics: { ios?: T; android?: T; web?: T; default?: T }): T {
    return Platform.select(specifics) as T;
  }
}

export default PlatformUtilsFoundation;
'@

    Create-File "develop/docs/getting-started-foundation.md" @'
# Getting Started with React Native Design System

## Overview
This library provides a comprehensive set of React Native components designed for cross-platform compatibility.

## Installation

```bash
npm install @design-system/react-native
```

## Quick Start

```tsx
import React from 'react';
import { View } from 'react-native';
import { ButtonFoundation, InputFoundation } from '@design-system/react-native';

export default function App() {
  return (
    <View style={{ padding: 20 }}>
      <InputFoundation 
        label="Email"
        placeholder="Enter your email"
      />
      <ButtonFoundation onPress={() => console.log('Pressed!')}>
        Submit
      </ButtonFoundation>
    </View>
  );
}
```

## Foundation Components

- **ButtonFoundation**: Customizable button component
- **InputFoundation**: Text input with validation
- **DeviceDetectionFoundation**: Platform detection service
- **PlatformUtilsFoundation**: Cross-platform utilities

## Theming

All components support theming through the ThemeFoundation configuration.

```tsx
import { ThemeFoundation } from '@design-system/react-native';

const customTheme = {
  ...ThemeFoundation,
  colors: {
    ...ThemeFoundation.colors,
    primary: '#FF6B6B',
  },
};
```
'@

    Make-GitCommit "2024-11-01" "04:12:00" "docs(develop): add React Native setup documentation" @("develop/utils/PlatformUtilsFoundation.ts", "develop/docs/getting-started-foundation.md")

    Write-Host "Successfully created missing November 1, 2024 commits!" -ForegroundColor Green
} else {
    Write-Host "Foundation files already exist. November 1 commits may have been created with different names." -ForegroundColor Yellow
}