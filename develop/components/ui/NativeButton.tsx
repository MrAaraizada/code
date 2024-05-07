import React from 'react';

interface NativeButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export const NativeButton: React.FC<NativeButtonProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default NativeButton;
