import React from 'react';

interface PopoverProps {
  children?: React.ReactNode;
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default Popover;
