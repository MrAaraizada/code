import React from 'react';
import { Switch as RNSwitch, View, Text, StyleSheet } from 'react-native';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ 
  value, onValueChange, label, disabled = false 
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNSwitch value={value} onValueChange={onValueChange} disabled={disabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  label: { fontSize: 16, flex: 1 },
});

export default Switch;
