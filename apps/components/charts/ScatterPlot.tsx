import React from 'react';

interface ScatterPlotProps {
  children?: React.ReactNode;
  className?: string;
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ScatterPlot;
