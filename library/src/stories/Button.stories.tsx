import React from 'react';

interface Button.storiesProps {
  children?: React.ReactNode;
  className?: string;
}

export const Button.stories: React.FC<Button.storiesProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default Button.stories;
