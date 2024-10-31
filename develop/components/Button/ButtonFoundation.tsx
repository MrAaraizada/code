import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BaseComponentProps } from '../types/ComponentTypes';

interface ButtonFoundationProps extends BaseComponentProps {
  onPress?: () => void;
}

export const ButtonFoundation: React.FC<ButtonFoundationProps> = ({ 
  children, 
  onPress, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  style 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, styles[variant], styles[size], disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  lg: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#8E8E93',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#007AFF',
  },
});

export default ButtonFoundation;
