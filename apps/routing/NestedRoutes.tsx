import React from 'react';

interface NestedRoutesProps {
  children?: React.ReactNode;
  className?: string;
}

export const NestedRoutes: React.FC<NestedRoutesProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default NestedRoutes;
