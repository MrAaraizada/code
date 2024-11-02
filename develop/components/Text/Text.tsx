import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

interface TextProps {
  children: React.ReactNode;
  variant?: 'body' | 'heading' | 'caption';
  color?: string;
  style?: any;
}

export const Text: React.FC<TextProps> = ({ 
  children, 
  variant = 'body',
  color = '#000000',
  style 
}) => {
  return (
    <RNText style={[styles[variant], { color }, style]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.7,
  },
});

export default Text;
