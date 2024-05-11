import React from 'react';

interface KPIWidgetProps {
  children?: React.ReactNode;
  className?: string;
}

export const KPIWidget: React.FC<KPIWidgetProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default KPIWidget;
