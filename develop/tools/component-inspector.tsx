import React from 'react';

interface component-inspectorProps {
  children?: React.ReactNode;
  className?: string;
}

export const component-inspector: React.FC<component-inspectorProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default component-inspector;
