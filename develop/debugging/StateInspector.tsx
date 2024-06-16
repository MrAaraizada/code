import React from 'react';

interface StateInspectorProps {
  children?: React.ReactNode;
  className?: string;
}

export const StateInspector: React.FC<StateInspectorProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default StateInspector;
