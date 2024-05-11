import React from 'react';

interface RadarChartProps {
  children?: React.ReactNode;
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default RadarChart;
