import React from 'react';

interface AppProvidersProps {
  children?: React.ReactNode;
  className?: string;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default AppProviders;
