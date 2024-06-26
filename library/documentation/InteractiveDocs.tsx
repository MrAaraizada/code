import React from 'react';

interface InteractiveDocsProps {
  children?: React.ReactNode;
  className?: string;
}

export const InteractiveDocs: React.FC<InteractiveDocsProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default InteractiveDocs;
