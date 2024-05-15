import React from 'react';

interface LivePreviewProps {
  children?: React.ReactNode;
  className?: string;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default LivePreview;
