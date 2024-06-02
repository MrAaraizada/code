import React from 'react';

interface UpdateNotifierProps {
  children?: React.ReactNode;
  className?: string;
}

export const UpdateNotifier: React.FC<UpdateNotifierProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default UpdateNotifier;
