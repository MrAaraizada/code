import React from 'react';

interface RootNavigatorProps {
  children?: React.ReactNode;
  className?: string;
}

export const RootNavigator: React.FC<RootNavigatorProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default RootNavigator;
