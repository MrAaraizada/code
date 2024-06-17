import React from 'react';

interface FacetedSearchProps {
  children?: React.ReactNode;
  className?: string;
}

export const FacetedSearch: React.FC<FacetedSearchProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default FacetedSearch;
