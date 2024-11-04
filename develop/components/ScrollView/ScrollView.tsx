import React from 'react';
import { ScrollView as RNScrollView, StyleSheet } from 'react-native';

interface ScrollViewProps {
  children: React.ReactNode;
  horizontal?: boolean;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  style?: any;
}

export const ScrollView: React.FC<ScrollViewProps> = ({ 
  children, horizontal = false, showsVerticalScrollIndicator = true, 
  showsHorizontalScrollIndicator = true, style 
}) => {
  return (
    <RNScrollView
      style={[styles.scrollView, style]}
      horizontal={horizontal}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
    >
      {children}
    </RNScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
});

export default ScrollView;
