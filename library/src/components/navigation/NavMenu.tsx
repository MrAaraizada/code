import React from 'react';

interface NavMenuProps {
  children?: React.ReactNode;
  className?: string;
}

export const NavMenu: React.FC<NavMenuProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default NavMenu;
