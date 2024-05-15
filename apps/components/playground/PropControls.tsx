import React from 'react';

interface PropControlsProps {
  children?: React.ReactNode;
  className?: string;
}

export const PropControls: React.FC<PropControlsProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default PropControls;
