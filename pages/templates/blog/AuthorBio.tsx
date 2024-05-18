import React from 'react';

interface AuthorBioProps {
  children?: React.ReactNode;
  className?: string;
}

export const AuthorBio: React.FC<AuthorBioProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default AuthorBio;
