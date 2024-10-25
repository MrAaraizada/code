import React, { lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

export const CodeSplittingExamples = () => {
  return <div><LazyComponent /></div>;
};
