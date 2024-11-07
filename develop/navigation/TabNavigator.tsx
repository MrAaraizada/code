import React from 'react';
import { View, StyleSheet } from 'react-native';

interface TabNavigatorProps {
  children: React.ReactNode;
  tabBarPosition?: 'top' | 'bottom';
}

export const TabNavigator: React.FC<TabNavigatorProps> = ({ 
  children, tabBarPosition = 'bottom' 
}) => {
  return <View style={styles.tabs}>{children}</View>;
};

const styles = StyleSheet.create({
  tabs: { flex: 1 },
});

export default TabNavigator;
