import React from 'react';

interface StreamingVizProps {
  children?: React.ReactNode;
  className?: string;
}

export const StreamingViz: React.FC<StreamingVizProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default StreamingViz;
