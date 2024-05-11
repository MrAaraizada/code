import React from 'react';

interface MetricCardProps {
  children?: React.ReactNode;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default MetricCard;
