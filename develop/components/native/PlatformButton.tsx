import React from 'react';

interface PlatformButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export const PlatformButton: React.FC<PlatformButtonProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default PlatformButton;
