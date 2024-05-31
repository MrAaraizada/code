import React from 'react';

interface common-issuesProps {
  children?: React.ReactNode;
  className?: string;
}

export const common-issues: React.FC<common-issuesProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default common-issues;
