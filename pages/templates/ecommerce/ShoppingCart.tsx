import React from 'react';

interface ShoppingCartProps {
  children?: React.ReactNode;
  className?: string;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ShoppingCart;
