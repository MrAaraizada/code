import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../hooks/useTheme';
import { ThemeConfig } from '../styles/theme';

export interface TestWrapperProps {
  children: React.ReactNode;
  theme?: typeof ThemeConfig;
}

export const TestWrapper: React.FC<TestWrapperProps> = ({ 
  children, 
  theme = ThemeConfig 
}) => {
  return (
    <ThemeProvider value={theme}>
      {children}
    </ThemeProvider>
  );
};

export const renderWithTheme = (
  component: React.ReactElement,
  options?: {
    theme?: typeof ThemeConfig;
    wrapper?: React.ComponentType<any>;
  }
) => {
  const Wrapper = options?.wrapper || TestWrapper;
  
  return render(component, {
    wrapper: ({ children }) => (
      <Wrapper theme={options?.theme}>
        {children}
      </Wrapper>
    ),
  });
};

export const createMockProps = <T extends object>(
  overrides: Partial<T> = {}
): T => {
  const defaultProps = {
    testID: 'test-component',
    onPress: jest.fn(),
    onChangeText: jest.fn(),
    onValueChange: jest.fn(),
    ...overrides,
  };
  
  return defaultProps as T;
};

export const waitForElement = async (
  getByTestId: (testId: string) => any,
  testId: string,
  timeout: number = 1000
) => {
  return waitFor(() => getByTestId(testId), { timeout });
};

export const simulatePress = (element: any) => {
  fireEvent.press(element);
};

export const simulateTextInput = (element: any, text: string) => {
  fireEvent.changeText(element, text);
};

export const simulateScroll = (element: any, offset: { x?: number; y?: number }) => {
  fireEvent.scroll(element, {
    nativeEvent: {
      contentOffset: { x: offset.x || 0, y: offset.y || 0 },
    },
  });
};

export const expectAccessibility = (element: any) => {
  return {
    toHaveAccessibilityLabel: (label: string) => {
      expect(element).toHaveProp('accessibilityLabel', label);
    },
    toHaveAccessibilityRole: (role: string) => {
      expect(element).toHaveProp('accessibilityRole', role);
    },
    toHaveAccessibilityState: (state: object) => {
      expect(element).toHaveProp('accessibilityState', state);
    },
  };
};

export const createPerformanceTest = (
  testName: string,
  testFn: () => void,
  maxDuration: number = 100
) => {
  return () => {
    const startTime = performance.now();
    testFn();
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (duration > maxDuration) {
      throw new Error(
        `Performance test "${testName}" took ${duration}ms, expected < ${maxDuration}ms`
      );
    }
  };
};

export default {
  TestWrapper,
  renderWithTheme,
  createMockProps,
  waitForElement,
  simulatePress,
  simulateTextInput,
  simulateScroll,
  expectAccessibility,
  createPerformanceTest,
};
