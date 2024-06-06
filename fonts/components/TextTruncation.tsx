import React from 'react';

interface TextTruncationProps {
  children?: React.ReactNode;
  className?: string;
}

export const TextTruncation: React.FC<TextTruncationProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default TextTruncation;
