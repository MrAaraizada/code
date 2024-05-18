import React from 'react';

interface ArticleLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ArticleLayout;
