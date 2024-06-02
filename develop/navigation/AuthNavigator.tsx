import React from 'react';

interface AuthNavigatorProps {
  children?: React.ReactNode;
  className?: string;
}

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default AuthNavigator;
