import React from 'react';

interface accessibility.testProps {
  children?: React.ReactNode;
  className?: string;
}

export const accessibility.test: React.FC<accessibility.testProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default accessibility.test;
