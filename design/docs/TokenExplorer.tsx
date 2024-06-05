import React from 'react';

interface TokenExplorerProps {
  children?: React.ReactNode;
  className?: string;
}

export const TokenExplorer: React.FC<TokenExplorerProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default TokenExplorer;
