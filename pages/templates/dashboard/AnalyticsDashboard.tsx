import React from 'react';

interface AnalyticsDashboardProps {
  children?: React.ReactNode;
  className?: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default AnalyticsDashboard;
