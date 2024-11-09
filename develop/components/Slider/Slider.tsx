import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  label?: string;
}

export const Slider: React.FC<SliderProps> = ({ 
  value, onValueChange, minimumValue = 0, maximumValue = 100, step = 1, label 
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}: {value}</Text>}
      <View style={styles.slider}>
        {/* Slider implementation would go here */}
        <Text>Slider Component</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  slider: { height: 40, justifyContent: 'center' },
});

export default Slider;
