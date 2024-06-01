import React from 'react';

interface ContextComposerProps {
  children?: React.ReactNode;
  className?: string;
}

export const ContextComposer: React.FC<ContextComposerProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ContextComposer;
