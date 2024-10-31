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
