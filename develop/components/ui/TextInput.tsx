import React from 'react';

interface TextInputProps {
  children?: React.ReactNode;
  className?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default TextInput;
