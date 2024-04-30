import React from 'react';

interface BreadcrumbsProps {
  children?: React.ReactNode;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default Breadcrumbs;
