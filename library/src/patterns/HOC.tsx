import React from 'react';

interface HOCProps {
  children?: React.ReactNode;
  className?: string;
}

export const HOC: React.FC<HOCProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default HOC;
