import { Platform } from 'react-native';

export class PlatformUtilsFoundation {
  public static isIOS(): boolean {
    return Platform.OS === 'ios';
  }
  
  public static isAndroid(): boolean {
    return Platform.OS === 'android';
  }
  
  public static isWeb(): boolean {
    return Platform.OS === 'web';
  }
  
  public static getPlatformValue<T>(values: {
    ios?: T;
    android?: T;
    web?: T;
    default: T;
  }): T {
    const platform = Platform.OS;
    return values[platform] ?? values.default;
  }
  
  public static getVersion(): string {
    return Platform.Version.toString();
  }
  
  public static select<T>(specifics: { ios?: T; android?: T; web?: T; default?: T }): T {
    return Platform.select(specifics) as T;
  }
}

export default PlatformUtilsFoundation;
