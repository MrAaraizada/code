import React from 'react';

interface PairProgrammingProps {
  children?: React.ReactNode;
  className?: string;
}

export const PairProgramming: React.FC<PairProgrammingProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default PairProgramming;
