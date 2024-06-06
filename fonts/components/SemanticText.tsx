import React from 'react';

interface SemanticTextProps {
  children?: React.ReactNode;
  className?: string;
}

export const SemanticText: React.FC<SemanticTextProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default SemanticText;
