import React from 'react';

interface FeatureGridProps {
  children?: React.ReactNode;
  className?: string;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default FeatureGrid;
