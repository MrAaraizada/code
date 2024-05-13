import React from 'react';

interface render-utilsProps {
  children?: React.ReactNode;
  className?: string;
}

export const render-utils: React.FC<render-utilsProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default render-utils;
