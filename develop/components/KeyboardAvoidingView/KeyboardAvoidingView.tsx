import React from 'react';
import { KeyboardAvoidingView as RNKeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

interface KeyboardAvoidingViewProps {
  children: React.ReactNode;
  behavior?: 'height' | 'position' | 'padding';
  style?: any;
}

export const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({ 
  children, behavior, style 
}) => {
  const defaultBehavior = Platform.OS === 'ios' ? 'padding' : 'height';
  
  return (
    <RNKeyboardAvoidingView
      behavior={behavior || defaultBehavior}
      style={[styles.container, style]}
    >
      {children}
    </RNKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default KeyboardAvoidingView;
