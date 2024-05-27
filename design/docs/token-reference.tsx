import React from 'react';

interface token-referenceProps {
  children?: React.ReactNode;
  className?: string;
}

export const token-reference: React.FC<token-referenceProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default token-reference;
