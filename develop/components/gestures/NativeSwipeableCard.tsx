import React from 'react';

interface NativeSwipeableCardProps {
  children?: React.ReactNode;
  className?: string;
}

export const NativeSwipeableCard: React.FC<NativeSwipeableCardProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default NativeSwipeableCard;
