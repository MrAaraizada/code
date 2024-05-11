import React from 'react';

interface GlobalSearchProps {
  children?: React.ReactNode;
  className?: string;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default GlobalSearch;
