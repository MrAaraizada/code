import React from 'react';

export const AccessibilityWrappers = ({ children }: any) => {
  return <div role='button' tabIndex={0}>{children}</div>;
};

// Updated: 2026-01-20 23:51:06 - feat(develop/components): add accessibility wrappers
