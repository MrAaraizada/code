import { Platform, NativeModules } from "react-native";

export interface PlatformCapabilities {
  hasCamera: boolean;
  hasGPS: boolean;
  hasBiometrics: boolean;
  hasNFC: boolean;
  supportsBackgroundTasks: boolean;
  supportsDeepLinking: boolean;
}

export class CrossPlatformBridge {
  private static instance: CrossPlatformBridge;
  private capabilities: PlatformCapabilities;

  private constructor() {
    this.capabilities = this.detectCapabilities();
  }

  public static getInstance(): CrossPlatformBridge {
    if (!CrossPlatformBridge.instance) {
      CrossPlatformBridge.instance = new CrossPlatformBridge();
    }
    return CrossPlatformBridge.instance;
  }

  private detectCapabilities(): PlatformCapabilities {
    return {
      hasCamera: this.checkCameraSupport(),
      hasGPS: this.checkGPSSupport(),
      hasBiometrics: this.checkBiometricSupport(),
      hasNFC: this.checkNFCSupport(),
      supportsBackgroundTasks: this.checkBackgroundTaskSupport(),
      supportsDeepLinking: this.checkDeepLinkingSupport(),
    };
  }

  private checkCameraSupport(): boolean {
    if (Platform.OS === "web") return false;
    return true; // Most mobile devices have cameras
  }

  private checkGPSSupport(): boolean {
    return Platform.OS !== "web" || "geolocation" in navigator;
  }

  private checkBiometricSupport(): boolean {
    if (Platform.OS === "web") return false;
    return NativeModules.Biometrics !== undefined;
  }

  private checkNFCSupport(): boolean {
    if (Platform.OS === "ios") return false; // Limited NFC on iOS
    return Platform.OS === "android";
  }

  private checkBackgroundTaskSupport(): boolean {
    return Platform.OS !== "web";
  }

  private checkDeepLinkingSupport(): boolean {
    return true; // All platforms support some form of deep linking
  }

  public getCapabilities(): PlatformCapabilities {
    return { ...this.capabilities };
  }

  public isCapabilitySupported(capability: keyof PlatformCapabilities): boolean {
    return this.capabilities[capability];
  }

  public getPlatformInfo() {
    return {
      os: Platform.OS,
      version: Platform.Version,
      isTV: Platform.isTV,
      isTesting: Platform.isTesting,
      capabilities: this.capabilities,
    };
  }
}

export default CrossPlatformBridge;
