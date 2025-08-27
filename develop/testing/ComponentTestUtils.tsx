import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "../styles/theme";

export interface TestWrapperProps {
  children: React.ReactNode;
  theme?: any;
}

export const TestWrapper: React.FC<TestWrapperProps> = ({ 
  children, 
  theme = {} 
}) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export const renderWithTheme = (
  component: React.ReactElement,
  options: any = {}
) => {
  return render(component, {
    wrapper: ({ children }) => (
      <TestWrapper theme={options.theme}>
        {children}
      </TestWrapper>
    ),
    ...options,
  });
};

export const mockAnimatedValue = (initialValue: number = 0) => {
  const AnimatedValue = jest.fn(() => ({
    setValue: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
    stopAnimation: jest.fn(),
    resetAnimation: jest.fn(),
    _value: initialValue,
  }));
  
  return new AnimatedValue();
};

export const mockGestureHandler = () => ({
  onGestureEvent: jest.fn(),
  onHandlerStateChange: jest.fn(),
});

export const createMockComponent = (name: string) => {
  return React.forwardRef((props: any, ref: any) => {
    return React.createElement(name, { ...props, ref });
  });
};

export const waitForAnimation = (duration: number = 300) => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

// Updated: 2026-01-20 23:51:10 - test(develop/testing): implement component testing utilities

// Updated: 2026-01-21 00:00:50 - test(develop/testing): enhance component test utils

// Updated: 2026-01-21 00:41:35 - feat(develop/testing): add component test utils
