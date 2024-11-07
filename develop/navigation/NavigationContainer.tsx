import React from 'react';
import { View, StyleSheet } from 'react-native';

interface NavigationContainerProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
}

export const NavigationContainer: React.FC<NavigationContainerProps> = ({ 
  children, theme = 'light' 
}) => {
  return (
    <View style={[styles.container, theme === 'dark' && styles.dark]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  dark: { backgroundColor: '#000000' },
});

export default NavigationContainer;
