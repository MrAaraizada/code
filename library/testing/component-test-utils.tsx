
// Material UI testing integration
export const materialUITestUtils = {
  renderWithTheme: (component: ReactElement, theme?: Theme) => {
    return render(
      <ThemeProvider theme={theme || defaultTheme}>
        {component}
      </ThemeProvider>
    );
  },
  
  mockTheme: createTheme({
    palette: { mode: 'light' },
  }),
};

// Updated: 2026-01-20 23:51:10 - test(library/testing): add integration testing framework

// Updated: 2026-01-21 00:00:50 - test(library/testing): add component test utilities

// Updated: 2026-01-21 00:01:00 - test(library/testing): enhance component test utils
