import React from 'react';

interface ComponentTestingV2Props {
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export const ComponentTestingV2: React.FC<ComponentTestingV2Props> = ({ 
  children, 
  className, 
  variant = 'primary' 
}) => {
  return (
    <div className={${fileName.ToLower()}-component  }>
      {children}
    </div>
  );
};

export default ComponentTestingV2;
