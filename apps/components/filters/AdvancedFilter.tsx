import React from 'react';

interface AdvancedFilterProps {
  children?: React.ReactNode;
  className?: string;
}

export const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default AdvancedFilter;
