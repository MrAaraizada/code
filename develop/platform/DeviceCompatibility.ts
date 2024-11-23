import { Platform, Dimensions, PixelRatio } from "react-native";

export interface DeviceInfo {
  platform: string;
  version: string | number;
  screenWidth: number;
  screenHeight: number;
  pixelRatio: number;
  fontScale: number;
  isTablet: boolean;
  isTV: boolean;
  deviceType: "phone" | "tablet" | "tv" | "desktop";
}

export class DeviceCompatibility {
  private static deviceInfo: DeviceInfo;

  public static getDeviceInfo(): DeviceInfo {
    if (!this.deviceInfo) {
      this.deviceInfo = this.detectDeviceInfo();
    }
    return this.deviceInfo;
  }

  private static detectDeviceInfo(): DeviceInfo {
    const { width, height } = Dimensions.get("window");
    const pixelRatio = PixelRatio.get();
    const fontScale = PixelRatio.getFontScale();

    return {
      platform: Platform.OS,
      version: Platform.Version,
      screenWidth: width,
      screenHeight: height,
      pixelRatio,
      fontScale,
      isTablet: this.isTabletDevice(width, height),
      isTV: Platform.isTV || false,
      deviceType: this.getDeviceType(width, height),
    };
  }

  private static isTabletDevice(width: number, height: number): boolean {
    const minDimension = Math.min(width, height);
    const maxDimension = Math.max(width, height);
    
    if (Platform.OS === "ios") {
      return minDimension >= 768; // iPad minimum width
    } else if (Platform.OS === "android") {
      return minDimension >= 600; // Android tablet threshold
    }
    
    return maxDimension >= 1024; // Web/desktop threshold
  }

  private static getDeviceType(width: number, height: number): "phone" | "tablet" | "tv" | "desktop" {
    if (Platform.isTV) return "tv";
    if (Platform.OS === "web" && width >= 1024) return "desktop";
    if (this.isTabletDevice(width, height)) return "tablet";
    return "phone";
  }

  public static isCompatibleWithFeature(feature: string): boolean {
    const deviceInfo = this.getDeviceInfo();
    
    switch (feature) {
      case "camera":
        return deviceInfo.platform !== "web";
      case "biometrics":
        return deviceInfo.platform === "ios" || deviceInfo.platform === "android";
      case "push-notifications":
        return true; // All platforms support some form
      case "background-tasks":
        return deviceInfo.platform !== "web";
      case "file-system":
        return deviceInfo.platform !== "web";
      case "deep-linking":
        return true;
      default:
        return false;
    }
  }

  public static getRecommendedLayoutConfig() {
    const deviceInfo = this.getDeviceInfo();
    
    return {
      columns: deviceInfo.deviceType === "phone" ? 1 : 
               deviceInfo.deviceType === "tablet" ? 2 : 3,
      spacing: deviceInfo.deviceType === "phone" ? 16 : 24,
      fontSize: {
        small: deviceInfo.fontScale * 12,
        medium: deviceInfo.fontScale * 16,
        large: deviceInfo.fontScale * 20,
      },
      touchTargetSize: Math.max(44, 44 * deviceInfo.fontScale),
    };
  }
}
