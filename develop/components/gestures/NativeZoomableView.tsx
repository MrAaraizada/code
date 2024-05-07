import React from 'react';

interface NativeZoomableViewProps {
  children?: React.ReactNode;
  className?: string;
}

export const NativeZoomableView: React.FC<NativeZoomableViewProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default NativeZoomableView;
