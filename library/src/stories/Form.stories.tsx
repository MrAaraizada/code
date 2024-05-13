import React from 'react';

interface Form.storiesProps {
  children?: React.ReactNode;
  className?: string;
}

export const Form.stories: React.FC<Form.storiesProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default Form.stories;
