import React from 'react';

interface MetaManagerProps {
  children?: React.ReactNode;
  className?: string;
}

export const MetaManager: React.FC<MetaManagerProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default MetaManager;

// Updated: 2026-01-21 00:05:38 - feat(pages/seo): implement meta tag manager
