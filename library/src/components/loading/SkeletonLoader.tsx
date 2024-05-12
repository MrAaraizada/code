import React from 'react';

interface SkeletonLoaderProps {
  children?: React.ReactNode;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default SkeletonLoader;
