import React from 'react';

interface interactive-demosProps {
  children?: React.ReactNode;
  className?: string;
}

export const interactive-demos: React.FC<interactive-demosProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default interactive-demos;
