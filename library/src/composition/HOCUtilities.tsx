import React from 'react';

interface HOCUtilitiesProps {
  children?: React.ReactNode;
  className?: string;
}

export const HOCUtilities: React.FC<HOCUtilitiesProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default HOCUtilities;
