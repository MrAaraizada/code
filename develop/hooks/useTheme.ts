import { useContext, createContext } from 'react';
import { ThemeConfig } from '../styles/theme';

const ThemeContext = createContext(ThemeConfig);

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return theme;
};

export const ThemeProvider = ThemeContext.Provider;

export default useTheme;
