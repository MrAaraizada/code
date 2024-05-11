import React from 'react';

interface LineChartProps {
  children?: React.ReactNode;
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default LineChart;
