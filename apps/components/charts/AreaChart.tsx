import React from 'react';

interface AreaChartProps {
  children?: React.ReactNode;
  className?: string;
}

export const AreaChart: React.FC<AreaChartProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default AreaChart;
