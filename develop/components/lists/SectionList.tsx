import React from 'react';

interface SectionListProps {
  children?: React.ReactNode;
  className?: string;
}

export const SectionList: React.FC<SectionListProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default SectionList;
