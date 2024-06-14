import React from 'react';

interface LazyComponentsProps {
  children?: React.ReactNode;
  className?: string;
}

export const LazyComponents: React.FC<LazyComponentsProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default LazyComponents;
