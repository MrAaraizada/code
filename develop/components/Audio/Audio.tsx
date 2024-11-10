import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AudioProps {
  source: { uri: string };
  autoplay?: boolean;
  loop?: boolean;
}

export const Audio: React.FC<AudioProps> = ({ 
  source, autoplay = false, loop = false 
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.playButton}>
        <Text style={styles.playText}>â–¶</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Audio: {source.uri}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#F5F5F5', borderRadius: 8 },
  playButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  playText: { color: '#FFFFFF', fontSize: 16 },
  title: { flex: 1, fontSize: 14 },
});

export default Audio;
