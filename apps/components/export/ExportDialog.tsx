import React from 'react';

interface ExportDialogProps {
  children?: React.ReactNode;
  className?: string;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ExportDialog;
