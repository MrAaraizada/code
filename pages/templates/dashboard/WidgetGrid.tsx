import React from 'react';

interface WidgetGridProps {
  children?: React.ReactNode;
  className?: string;
}

export const WidgetGrid: React.FC<WidgetGridProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default WidgetGrid;
