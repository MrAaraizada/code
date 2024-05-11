import React from 'react';

interface AdvancedTableProps {
  children?: React.ReactNode;
  className?: string;
}

export const AdvancedTable: React.FC<AdvancedTableProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default AdvancedTable;
