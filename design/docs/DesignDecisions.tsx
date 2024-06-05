import React from 'react';

interface DesignDecisionsProps {
  children?: React.ReactNode;
  className?: string;
}

export const DesignDecisions: React.FC<DesignDecisionsProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default DesignDecisions;
