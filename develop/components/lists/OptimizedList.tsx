import React from 'react';

interface OptimizedListProps {
  children?: React.ReactNode;
  className?: string;
}

export const OptimizedList: React.FC<OptimizedListProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default OptimizedList;
