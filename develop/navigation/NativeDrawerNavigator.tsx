import React from 'react';

interface NativeDrawerNavigatorProps {
  children?: React.ReactNode;
  className?: string;
}

export const NativeDrawerNavigator: React.FC<NativeDrawerNavigatorProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default NativeDrawerNavigator;
