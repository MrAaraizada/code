import React from 'react';

interface GridSystemProps {
  children?: React.ReactNode;
  className?: string;
}

export const GridSystem: React.FC<GridSystemProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default GridSystem;
