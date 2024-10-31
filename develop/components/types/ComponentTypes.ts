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
