
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
