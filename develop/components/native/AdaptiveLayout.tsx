import React from 'react';

interface AdaptiveLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export const AdaptiveLayout: React.FC<AdaptiveLayoutProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default AdaptiveLayout;
