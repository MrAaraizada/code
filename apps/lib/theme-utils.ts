export type Theme = 'dark' | 'light' | 'system'

export const getSystemTheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') return 'light'
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? 'dark' 
    : 'light'
}

export const resolveTheme = (theme: Theme): 'dark' | 'light' => {
  if (theme === 'system') {
    return getSystemTheme()
  }
  return theme
}

export const applyTheme = (theme: Theme, element?: HTMLElement) => {
  const root = element || document.documentElement
  const resolvedTheme = resolveTheme(theme)
  
  root.classList.remove('light', 'dark')
  root.classList.add(resolvedTheme)
  
  // Update CSS custom properties
  root.style.colorScheme = resolvedTheme
}

export const watchSystemTheme = (callback: (theme: 'dark' | 'light') => void) => {
  if (typeof window === 'undefined') return () => {}
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light')
  }
  
  mediaQuery.addEventListener('change', handler)
  
  return () => mediaQuery.removeEventListener('change', handler)
}

export const getThemeColors = (theme: 'dark' | 'light') => {
  return {
    background: theme === 'dark' ? 'hsl(222.2 84% 4.9%)' : 'hsl(0 0% 100%)',
    foreground: theme === 'dark' ? 'hsl(210 40% 98%)' : 'hsl(222.2 84% 4.9%)',
    primary: theme === 'dark' ? 'hsl(210 40% 98%)' : 'hsl(222.2 47.4% 11.2%)',
    secondary: theme === 'dark' ? 'hsl(217.2 32.6% 17.5%)' : 'hsl(210 40% 96%)',
    muted: theme === 'dark' ? 'hsl(217.2 32.6% 17.5%)' : 'hsl(210 40% 96%)',
    accent: theme === 'dark' ? 'hsl(217.2 32.6% 17.5%)' : 'hsl(210 40% 96%)',
    border: theme === 'dark' ? 'hsl(217.2 32.6% 17.5%)' : 'hsl(214.3 31.8% 91.4%)',
  }
}