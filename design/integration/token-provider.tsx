import React from 'react';

interface token-providerProps {
  children?: React.ReactNode;
  className?: string;
}

export const token-provider: React.FC<token-providerProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default token-provider;
