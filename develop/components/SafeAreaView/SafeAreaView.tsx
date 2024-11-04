import React from 'react';
import { SafeAreaView as RNSafeAreaView, StyleSheet } from 'react-native';

interface SafeAreaViewProps {
  children: React.ReactNode;
  style?: any;
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
}

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({ 
  children, style, edges = ['top', 'bottom'] 
}) => {
  return (
    <RNSafeAreaView style={[styles.safeArea, style]}>
      {children}
    </RNSafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
});

export default SafeAreaView;
