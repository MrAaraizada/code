import React from 'react';

interface CommentSystemProps {
  children?: React.ReactNode;
  className?: string;
}

export const CommentSystem: React.FC<CommentSystemProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default CommentSystem;
