import React from 'react';

interface TabNavigatorProps {
  children?: React.ReactNode;
  className?: string;
}

export const TabNavigator: React.FC<TabNavigatorProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default TabNavigator;
