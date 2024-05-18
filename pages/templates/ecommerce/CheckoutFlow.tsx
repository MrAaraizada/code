import React from 'react';

interface CheckoutFlowProps {
  children?: React.ReactNode;
  className?: string;
}

export const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default CheckoutFlow;
