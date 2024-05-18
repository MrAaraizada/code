import React from 'react';

interface SignupFormProps {
  children?: React.ReactNode;
  className?: string;
}

export const SignupForm: React.FC<SignupFormProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default SignupForm;
