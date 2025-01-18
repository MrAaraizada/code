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
