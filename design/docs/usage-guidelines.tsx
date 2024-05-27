import React from 'react';

interface usage-guidelinesProps {
  children?: React.ReactNode;
  className?: string;
}

export const usage-guidelines: React.FC<usage-guidelinesProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default usage-guidelines;
