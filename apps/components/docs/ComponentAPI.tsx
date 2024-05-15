import React from 'react';

interface ComponentAPIProps {
  children?: React.ReactNode;
  className?: string;
}

export const ComponentAPI: React.FC<ComponentAPIProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ComponentAPI;
