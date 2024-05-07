import React from 'react';

interface NativeSectionListProps {
  children?: React.ReactNode;
  className?: string;
}

export const NativeSectionList: React.FC<NativeSectionListProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default NativeSectionList;
