import React from 'react';

interface CustomBuilderProps {
  children?: React.ReactNode;
  className?: string;
}

export const CustomBuilder: React.FC<CustomBuilderProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default CustomBuilder;
