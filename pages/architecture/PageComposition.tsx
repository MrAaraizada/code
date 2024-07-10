import React from 'react';

interface PageCompositionProps {
  children?: React.ReactNode;
  className?: string;
}

export const PageComposition: React.FC<PageCompositionProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default PageComposition;
