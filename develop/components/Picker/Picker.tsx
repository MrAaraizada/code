import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PickerItem {
  label: string;
  value: any;
}

interface PickerProps {
  selectedValue: any;
  onValueChange: (value: any) => void;
  items: PickerItem[];
  label?: string;
}

export const Picker: React.FC<PickerProps> = ({ 
  selectedValue, onValueChange, items, label 
}) => {
  const selectedItem = items.find(item => item.value === selectedValue);
  
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.picker}>
        <Text style={styles.selectedText}>
          {selectedItem ? selectedItem.label : 'Select an option'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  label: { fontSize: 16, marginBottom: 4 },
  picker: { borderWidth: 1, borderColor: '#CCCCCC', borderRadius: 8, padding: 12 },
  selectedText: { fontSize: 16 },
});

export default Picker;
