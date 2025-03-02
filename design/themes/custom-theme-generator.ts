import { createTheme, ThemeOptions } from '@mui/material/styles';

export interface CustomThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  borderRadius: number;
  fontFamily: string;
}

export const generateCustomTheme = (config: CustomThemeConfig) => {
  const themeOptions: ThemeOptions = {
    palette: {
      primary: { main: config.primaryColor },
      secondary: { main: config.secondaryColor },
    },
    shape: { borderRadius: config.borderRadius },
    typography: { fontFamily: config.fontFamily },
  };
  
  return createTheme(themeOptions);
};

// Updated: 2026-01-20 23:51:00 - feat(design/themes): implement custom theme generator
