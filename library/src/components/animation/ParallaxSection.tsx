import React from 'react';

interface ParallaxSectionProps {
  children?: React.ReactNode;
  className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ParallaxSection;
