import React from 'react';

interface ProductGridProps {
  children?: React.ReactNode;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ProductGrid;
