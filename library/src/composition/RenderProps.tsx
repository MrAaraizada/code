import React from 'react';

interface RenderPropsProps {
  children?: React.ReactNode;
  className?: string;
}

export const RenderProps: React.FC<RenderPropsProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default RenderProps;
