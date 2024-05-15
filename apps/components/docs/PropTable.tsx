import React from 'react';

interface PropTableProps {
  children?: React.ReactNode;
  className?: string;
}

export const PropTable: React.FC<PropTableProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default PropTable;
