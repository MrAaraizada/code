import React from 'react';

interface ComponentPlaygroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const ComponentPlayground: React.FC<ComponentPlaygroundProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ComponentPlayground;
