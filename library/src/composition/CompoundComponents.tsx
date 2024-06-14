import React from 'react';

interface CompoundComponentsProps {
  children?: React.ReactNode;
  className?: string;
}

export const CompoundComponents: React.FC<CompoundComponentsProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default CompoundComponents;
