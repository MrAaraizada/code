import React from 'react';

interface NativeCardProps {
  children?: React.ReactNode;
  className?: string;
}

export const NativeCard: React.FC<NativeCardProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default NativeCard;
