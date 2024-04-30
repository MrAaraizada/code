import React from 'react';

interface AppLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default AppLayout;
