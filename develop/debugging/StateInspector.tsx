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

// Updated: 2026-01-20 23:51:17 - feat(develop/debugging): add state inspector tools
