import React from 'react';

interface ComponentTestingProps {
  children?: React.ReactNode;
  className?: string;
}

export const ComponentTesting: React.FC<ComponentTestingProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ComponentTesting;
