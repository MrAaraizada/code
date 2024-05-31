import React from 'react';

interface complete-referenceProps {
  children?: React.ReactNode;
  className?: string;
}

export const complete-reference: React.FC<complete-referenceProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default complete-reference;
