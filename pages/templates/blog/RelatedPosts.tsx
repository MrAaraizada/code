import React from 'react';

interface RelatedPostsProps {
  children?: React.ReactNode;
  className?: string;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default RelatedPosts;
