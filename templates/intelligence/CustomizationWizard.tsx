import React from 'react';

interface CustomizationWizardProps {
  children?: React.ReactNode;
  className?: string;
}

export const CustomizationWizard: React.FC<CustomizationWizardProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default CustomizationWizard;
