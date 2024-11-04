import React from 'react';
import { ActivityIndicator as RNActivityIndicator, View, StyleSheet } from 'react-native';

interface ActivityIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
  animating?: boolean;
  style?: any;
}

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({ 
  size = 'small', color = '#007AFF', animating = true, style 
}) => {
  return (
    <View style={[styles.container, style]}>
      <RNActivityIndicator size={size} color={color} animating={animating} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
});

export default ActivityIndicator;
