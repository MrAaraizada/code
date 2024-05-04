import React from 'react';

interface DrawerNavigatorProps {
  children?: React.ReactNode;
  className?: string;
}

export const DrawerNavigator: React.FC<DrawerNavigatorProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default DrawerNavigator;
