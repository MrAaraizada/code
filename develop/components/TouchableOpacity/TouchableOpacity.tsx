import React from 'react';
import { TouchableOpacity as RNTouchableOpacity, StyleSheet } from 'react-native';

interface TouchableOpacityProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  activeOpacity?: number;
  style?: any;
}

export const TouchableOpacity: React.FC<TouchableOpacityProps> = ({ 
  children, onPress, disabled = false, activeOpacity = 0.7, style 
}) => {
  return (
    <RNTouchableOpacity
      style={[styles.touchable, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
    >
      {children}
    </RNTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: { borderRadius: 8 },
  disabled: { opacity: 0.5 },
});

export default TouchableOpacity;
