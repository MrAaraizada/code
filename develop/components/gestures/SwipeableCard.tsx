import React from 'react';

interface SwipeableCardProps {
  children?: React.ReactNode;
  className?: string;
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default SwipeableCard;
