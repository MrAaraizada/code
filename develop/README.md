# React Native Design System Library

A comprehensive React Native component library designed for cross-platform compatibility and optimal user experience.

## Features

- ðŸŽ¨ **Themeable Components**: Consistent design system with customizable themes
- ðŸ“± **Cross-Platform**: Works seamlessly on iOS, Android, and Web
- âš¡ **Performance Optimized**: Built with performance best practices
- â™¿ **Accessible**: WCAG compliant components with screen reader support
- ðŸ”§ **TypeScript**: Full TypeScript support with comprehensive type definitions
- ðŸ“š **Well Documented**: Extensive documentation and examples

## Installation

```bash
npm install @design-system/react-native
# or
yarn add @design-system/react-native
```

## Quick Start

```tsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Card, Text, ThemeProvider } from '@design-system/react-native';

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <Card>
          <Text variant="heading">Welcome!</Text>
          <Text>This is a sample React Native app using our design system.</Text>
          <Button onPress={() => console.log('Hello!')}>
            Get Started
          </Button>
        </Card>
      </SafeAreaView>
    </ThemeProvider>
  );
}
```

## Components

### Basic Components
- **Button**: Customizable button with multiple variants
- **Input**: Text input with validation and styling
- **Text**: Styled text component with typography variants
- **View**: Enhanced view component with theme support
- **Card**: Container component with elevation and styling

### Layout Components
- **SafeAreaView**: Safe area handling for all platforms
- **ScrollView**: Enhanced scrollable view
- **FlatList**: Optimized list component
- **SectionList**: Sectioned list with performance optimizations
- **KeyboardAvoidingView**: Keyboard-aware view component

### Media Components
- **Image**: Optimized image component
- **Video**: Video player with controls
- **Audio**: Audio playback component
- **Camera**: Camera component with capture functionality
- **ImagePicker**: Image selection from camera/gallery

### Navigation Components
- **Modal**: Animated modal component
- **Alert**: Notification alert component
- **ActionSheet**: Action sheet for options
- **NavigationContainer**: Navigation wrapper
- **StackNavigator**: Stack-based navigation
- **TabNavigator**: Tab-based navigation

### Form Components
- **Switch**: Toggle switch component
- **Slider**: Range slider component
- **Picker**: Selection picker component

## Theming

```tsx
import { ThemeProvider, ThemeConfig } from '@design-system/react-native';

const customTheme = {
  ...ThemeConfig,
  colors: {
    ...ThemeConfig.colors,
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
  },
};

export default function App() {
  return (
    <ThemeProvider value={customTheme}>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

## Platform Support

- âœ… iOS 11+
- âœ… Android API 21+
- âœ… Web (React Native Web)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.
