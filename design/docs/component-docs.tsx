import React from 'react';

interface component-docsProps {
  children?: React.ReactNode;
  className?: string;
}

export const component-docs: React.FC<component-docsProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default component-docs;
