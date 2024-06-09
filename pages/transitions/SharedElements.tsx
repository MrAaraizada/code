import React from 'react';

interface SharedElementsProps {
  children?: React.ReactNode;
  className?: string;
}

export const SharedElements: React.FC<SharedElementsProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default SharedElements;
