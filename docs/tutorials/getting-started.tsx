import React from 'react';

interface getting-startedProps {
  children?: React.ReactNode;
  className?: string;
}

export const getting-started: React.FC<getting-startedProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default getting-started;
