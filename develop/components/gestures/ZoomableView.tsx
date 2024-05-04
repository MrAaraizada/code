import React from 'react';

interface ZoomableViewProps {
  children?: React.ReactNode;
  className?: string;
}

export const ZoomableView: React.FC<ZoomableViewProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ZoomableView;
