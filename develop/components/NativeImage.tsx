import React from 'react';
import { Image } from 'react-native';

export const NativeImage = () => {
  return <Image source={{uri: 'https://example.com/image.jpg'}} style={{width: 100, height: 100}} />;
};
