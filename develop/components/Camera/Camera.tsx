import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CameraProps {
  onCapture?: (photo: any) => void;
  type?: 'front' | 'back';
  style?: any;
}

export const Camera: React.FC<CameraProps> = ({ 
  onCapture, type = 'back', style 
}) => {
  return (
    <View style={[styles.camera, style]}>
      <Text style={styles.cameraText}>Camera View ({type})</Text>
      <TouchableOpacity style={styles.captureButton} onPress={() => onCapture?.({})}>
        <Text style={styles.captureText}>ðŸ“·</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  camera: { backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', minHeight: 300 },
  cameraText: { color: '#FFFFFF', fontSize: 16, marginBottom: 20 },
  captureButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  captureText: { fontSize: 24 },
});

export default Camera;
