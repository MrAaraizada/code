import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ImagePickerProps {
  onImageSelected?: (image: any) => void;
  allowsEditing?: boolean;
  quality?: number;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({ 
  onImageSelected, allowsEditing = true, quality = 0.8 
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => onImageSelected?.({})}>
        <Text style={styles.buttonText}>ðŸ“· Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onImageSelected?.({})}>
        <Text style={styles.buttonText}>ðŸ–¼ï¸ Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', padding: 16 },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, minWidth: 100, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16 },
});

export default ImagePicker;
