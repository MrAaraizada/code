import React from 'react';
import { Image as RNImage, StyleSheet } from 'react-native';

interface ImageProps {
  source: any;
  style?: any;
  resizeMode?: 'cover' | 'contain' | 'stretch';
  width?: number;
  height?: number;
}

export const Image: React.FC<ImageProps> = ({ 
  source, style, resizeMode = 'cover', width, height 
}) => {
  const dynamicStyle = { ...(width && { width }), ...(height && { height }) };
  return <RNImage source={source} style={[styles.image, dynamicStyle, style]} resizeMode={resizeMode} />;
};

const styles = StyleSheet.create({
  image: { borderRadius: 8 },
});

export default Image;
