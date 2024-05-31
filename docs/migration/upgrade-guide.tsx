import React from 'react';

interface upgrade-guideProps {
  children?: React.ReactNode;
  className?: string;
}

export const upgrade-guide: React.FC<upgrade-guideProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default upgrade-guide;
