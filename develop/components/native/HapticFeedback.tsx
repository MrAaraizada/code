import React from 'react';

interface HapticFeedbackProps {
  children?: React.ReactNode;
  className?: string;
}

export const HapticFeedback: React.FC<HapticFeedbackProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default HapticFeedback;
