import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface VideoProps {
  source: { uri: string };
  style?: any;
  controls?: boolean;
  autoplay?: boolean;
}

export const Video: React.FC<VideoProps> = ({ 
  source, style, controls = true, autoplay = false 
}) => {
  return (
    <View style={[styles.video, style]}>
      <Text>Video Player - {source.uri}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  video: { backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', minHeight: 200 },
});

export default Video;
