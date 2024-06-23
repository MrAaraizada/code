import React from 'react';

interface UserLayoutsProps {
  children?: React.ReactNode;
  className?: string;
}

export const UserLayouts: React.FC<UserLayoutsProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default UserLayouts;
