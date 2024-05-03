import React from 'react';

interface DrawerProps {
  children?: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default Drawer;
