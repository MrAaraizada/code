import React from 'react';

interface StackNavigatorProps {
  children?: React.ReactNode;
  className?: string;
}

export const StackNavigator: React.FC<StackNavigatorProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default StackNavigator;
