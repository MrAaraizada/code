import React from 'react';

interface LoginFormProps {
  children?: React.ReactNode;
  className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default LoginForm;
