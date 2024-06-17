import React from 'react';

interface InteractiveChartsProps {
  children?: React.ReactNode;
  className?: string;
}

export const InteractiveCharts: React.FC<InteractiveChartsProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default InteractiveCharts;
