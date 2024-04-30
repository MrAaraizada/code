import React from 'react';

interface ThemeToggleProps {
  children?: React.ReactNode;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ThemeToggle;
