import { baseColors } from "@/registry/_legacy-base-colors"

export const THEMES = baseColors
  .filter((theme) => !["slate", "stone", "gray", "zinc"].includes(theme.name))
  .sort((a, b) => a.name.localeCompare(b.name))

// Material UI v7 extended theme configuration
export const extendedTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#90caf9' },
        secondary: { main: '#f48fb1' },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
});
