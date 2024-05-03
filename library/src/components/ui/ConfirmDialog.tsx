import React from 'react';

interface ConfirmDialogProps {
  children?: React.ReactNode;
  className?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ConfirmDialog;
