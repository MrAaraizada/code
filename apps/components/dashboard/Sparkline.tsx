import React from 'react';

interface SparklineProps {
  children?: React.ReactNode;
  className?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default Sparkline;
