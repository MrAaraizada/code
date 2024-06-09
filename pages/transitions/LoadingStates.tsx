import React from 'react';

interface LoadingStatesProps {
  children?: React.ReactNode;
  className?: string;
}

export const LoadingStates: React.FC<LoadingStatesProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default LoadingStates;
