import React from 'react';

interface RealtimeDashboardProps {
  children?: React.ReactNode;
  className?: string;
}

export const RealtimeDashboard: React.FC<RealtimeDashboardProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default RealtimeDashboard;
