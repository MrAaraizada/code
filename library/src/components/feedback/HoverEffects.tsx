import React from 'react';

interface HoverEffectsProps {
  children?: React.ReactNode;
  className?: string;
}

export const HoverEffects: React.FC<HoverEffectsProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default HoverEffects;
