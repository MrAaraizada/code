import React from 'react';

interface NativeTextInputProps {
  children?: React.ReactNode;
  className?: string;
}

export const NativeTextInput: React.FC<NativeTextInputProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default NativeTextInput;
