import React from 'react';

interface RouteTransitionsProps {
  children?: React.ReactNode;
  className?: string;
}

export const RouteTransitions: React.FC<RouteTransitionsProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default RouteTransitions;
