import React from 'react';

interface LayoutComposerProps {
  children?: React.ReactNode;
  className?: string;
}

export const LayoutComposer: React.FC<LayoutComposerProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default LayoutComposer;
