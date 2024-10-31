import { Platform, Dimensions } from 'react-native';

export class DeviceDetectionFoundation {
  private static instance: DeviceDetectionFoundation;
  
  public static getInstance(): DeviceDetectionFoundation {
    if (!DeviceDetectionFoundation.instance) {
      DeviceDetectionFoundation.instance = new DeviceDetectionFoundation();
    }
    return DeviceDetectionFoundation.instance;
  }
  
  public isIOS(): boolean {
    return Platform.OS === 'ios';
  }
  
  public isAndroid(): boolean {
    return Platform.OS === 'android';
  }
  
  public getScreenDimensions() {
    return Dimensions.get('window');
  }
  
  public isTablet(): boolean {
    const { width, height } = this.getScreenDimensions();
    const minDimension = Math.min(width, height);
    return minDimension >= 768;
  }
}
