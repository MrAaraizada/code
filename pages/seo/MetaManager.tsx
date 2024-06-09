import React from 'react';

interface MetaManagerProps {
  children?: React.ReactNode;
  className?: string;
}

export const MetaManager: React.FC<MetaManagerProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default MetaManager;
