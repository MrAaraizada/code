import React from 'react';

interface NativeStackNavigatorProps {
  children?: React.ReactNode;
  className?: string;
}

export const NativeStackNavigator: React.FC<NativeStackNavigatorProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default NativeStackNavigator;
