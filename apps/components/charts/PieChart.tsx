import React from 'react';

interface PieChartProps {
  children?: React.ReactNode;
  className?: string;
}

export const PieChart: React.FC<PieChartProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default PieChart;
