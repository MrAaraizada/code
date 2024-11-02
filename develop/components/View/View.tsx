import React from 'react';
import { View as RNView, StyleSheet } from 'react-native';

interface ViewProps {
  children?: React.ReactNode;
  style?: any;
  padding?: number;
  margin?: number;
  backgroundColor?: string;
}

export const View: React.FC<ViewProps> = ({ 
  children, 
  style,
  padding,
  margin,
  backgroundColor 
}) => {
  const dynamicStyle = {
    ...(padding && { padding }),
    ...(margin && { margin }),
    ...(backgroundColor && { backgroundColor }),
  };

  return (
    <RNView style={[dynamicStyle, style]}>
      {children}
    </RNView>
  );
};

export default View;
