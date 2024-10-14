import React from 'react';
import { View } from 'react-native';

export const NativeFormWrapper = ({ children }: any) => {
  return <View style={{padding: 16}}>{children}</View>;
};
