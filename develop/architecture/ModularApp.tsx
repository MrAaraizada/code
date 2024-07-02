import React from 'react';

interface ModularAppProps {
  children?: React.ReactNode;
  className?: string;
}

export const ModularApp: React.FC<ModularAppProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ModularApp;
