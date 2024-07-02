import React from 'react';

interface LazyLoadingProps {
  children?: React.ReactNode;
  className?: string;
}

export const LazyLoading: React.FC<LazyLoadingProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default LazyLoading;
