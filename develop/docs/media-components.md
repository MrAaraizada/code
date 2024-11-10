# Media Components Guide

## Overview
Comprehensive guide for using media components in React Native applications.

## Video Component

### Basic Usage
```tsx
import { Video } from '@design-system/react-native';

<Video 
  source={{ uri: 'https://example.com/video.mp4' }}
  controls={true}
  autoplay={false}
  style={{ width: 300, height: 200 }}
/>
```

### Props
- `source`: Video source object with uri
- `controls`: Show/hide video controls
- `autoplay`: Auto-start video playback
- `style`: Custom styling

## Audio Component

### Basic Usage
```tsx
import { Audio } from '@design-system/react-native';

<Audio 
  source={{ uri: 'https://example.com/audio.mp3' }}
  autoplay={false}
  loop={false}
/>
```

## Camera Component

### Basic Usage
```tsx
import { Camera } from '@design-system/react-native';

<Camera 
  type="back"
  onCapture={(photo) => console.log('Photo captured:', photo)}
  style={{ width: 300, height: 400 }}
/>
```

### Permissions
The Camera component automatically handles permission requests for camera access.

## ImagePicker Component

### Basic Usage
```tsx
import { ImagePicker } from '@design-system/react-native';

<ImagePicker 
  onImageSelected={(image) => console.log('Image selected:', image)}
  allowsEditing={true}
  quality={0.8}
/>
```

## Best Practices

1. **Permissions**: Always handle permission requests gracefully
2. **Performance**: Compress images and videos for better performance
3. **Accessibility**: Provide alternative text for media content
4. **Error Handling**: Implement proper error handling for media operations

## Platform Considerations

### iOS
- Uses native camera and photo library APIs
- Supports HEIC format
- Automatic permission dialogs

### Android
- Uses Camera2 API for modern devices
- Supports various image formats
- Runtime permission handling

### Web
- Uses HTML5 media APIs
- Limited camera access
- File input fallbacks
