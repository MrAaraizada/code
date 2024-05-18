import React from 'react';

interface ProfilePageProps {
  children?: React.ReactNode;
  className?: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ProfilePage;
