import React from 'react';

interface BarChartProps {
  children?: React.ReactNode;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default BarChart;
