import React from 'react';

interface CompoundComponentProps {
  children?: React.ReactNode;
  className?: string;
}

export const CompoundComponent: React.FC<CompoundComponentProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default CompoundComponent;
