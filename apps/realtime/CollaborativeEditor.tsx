import React from 'react';

interface CollaborativeEditorProps {
  children?: React.ReactNode;
  className?: string;
}

export const CollaborativeEditor: React.FC<CollaborativeEditorProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default CollaborativeEditor;
