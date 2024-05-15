import React from 'react';

interface CodeExampleProps {
  children?: React.ReactNode;
  className?: string;
}

export const CodeExample: React.FC<CodeExampleProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default CodeExample;
