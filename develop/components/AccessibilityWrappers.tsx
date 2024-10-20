import React from 'react';

export const AccessibilityWrappers = ({ children }: any) => {
  return <div role='button' tabIndex={0}>{children}</div>;
};
