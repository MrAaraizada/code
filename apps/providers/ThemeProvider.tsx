import React from 'react';

interface ThemeProviderProps {
  children?: React.ReactNode;
  className?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ThemeProvider;
