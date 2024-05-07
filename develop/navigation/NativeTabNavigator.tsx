import React from 'react';

interface NativeTabNavigatorProps {
  children?: React.ReactNode;
  className?: string;
}

export const NativeTabNavigator: React.FC<NativeTabNavigatorProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default NativeTabNavigator;
