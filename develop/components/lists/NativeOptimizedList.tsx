import React from 'react';

interface NativeOptimizedListProps {
  children?: React.ReactNode;
  className?: string;
}

export const NativeOptimizedList: React.FC<NativeOptimizedListProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default NativeOptimizedList;
