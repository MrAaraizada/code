import React from 'react';

interface DocumentationProps {
  children?: React.ReactNode;
  className?: string;
}

export const Documentation: React.FC<DocumentationProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default Documentation;
