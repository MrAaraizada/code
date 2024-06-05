import React from 'react';

interface ComponentShowcaseProps {
  children?: React.ReactNode;
  className?: string;
}

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ComponentShowcase;
