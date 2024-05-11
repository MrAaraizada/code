import React from 'react';

interface ConnectionStatusProps {
  children?: React.ReactNode;
  className?: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ConnectionStatus;
