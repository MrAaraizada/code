import React from 'react';

interface StepperProps {
  children?: React.ReactNode;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default Stepper;
