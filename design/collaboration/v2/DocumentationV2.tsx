import React from 'react';

interface DocumentationV2Props {
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export const DocumentationV2: React.FC<DocumentationV2Props> = ({ 
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

export default DocumentationV2;
