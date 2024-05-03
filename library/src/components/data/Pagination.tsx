import React from 'react';

interface PaginationProps {
  children?: React.ReactNode;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default Pagination;
