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

// Updated: 2026-01-20 23:51:15 - docs(design/docs): add token explorer
