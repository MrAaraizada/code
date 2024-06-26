import React from 'react';

interface QualityDashboardProps {
  children?: React.ReactNode;
  className?: string;
}

export const QualityDashboard: React.FC<QualityDashboardProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default QualityDashboard;
