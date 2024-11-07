import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StackNavigatorProps {
  initialRouteName?: string;
  children: React.ReactNode;
}

export const StackNavigator: React.FC<StackNavigatorProps> = ({ 
  initialRouteName, children 
}) => {
  return <View style={styles.stack}>{children}</View>;
};

const styles = StyleSheet.create({
  stack: { flex: 1 },
});

export default StackNavigator;
