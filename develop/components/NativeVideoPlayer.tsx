import React from 'react';
import Video from 'react-native-video';

export const NativeVideoPlayer = () => {
  return <Video source={{uri: 'https://example.com/video.mp4'}} />;
};
