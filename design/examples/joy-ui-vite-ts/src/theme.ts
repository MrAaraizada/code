import { extendTheme } from '@mui/joy/styles';

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#e3f2fd',
          500: '#1976d2',
          900: '#0d47a1',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          50: '#e3f2fd',
          500: '#90caf9',
          900: '#0d47a1',
        },
      },
    },
  },
});
