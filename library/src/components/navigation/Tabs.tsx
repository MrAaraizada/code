import React from 'react';

interface TabsProps {
  children?: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default Tabs;
