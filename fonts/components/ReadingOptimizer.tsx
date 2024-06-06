import React from 'react';

interface ReadingOptimizerProps {
  children?: React.ReactNode;
  className?: string;
}

export const ReadingOptimizer: React.FC<ReadingOptimizerProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ReadingOptimizer;
