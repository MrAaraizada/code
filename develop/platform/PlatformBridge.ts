import { NativeModules, Platform } from "react-native";

export interface BridgeModule {
  name: string;
  methods: string[];
  isAvailable: boolean;
}

export class PlatformBridge {
  private static instance: PlatformBridge;
  private modules: Map<string, BridgeModule> = new Map();

  private constructor() {
    this.initializeModules();
  }

  public static getInstance(): PlatformBridge {
    if (!PlatformBridge.instance) {
      PlatformBridge.instance = new PlatformBridge();
    }
    return PlatformBridge.instance;
  }

  private initializeModules(): void {
    // Register common native modules
    this.registerModule("DeviceInfo", ["getDeviceId", "getSystemVersion", "getBundleId"]);
    this.registerModule("FileSystem", ["readFile", "writeFile", "deleteFile", "exists"]);
    this.registerModule("Camera", ["takePicture", "recordVideo", "hasPermission"]);
    this.registerModule("Location", ["getCurrentPosition", "watchPosition", "requestPermission"]);
    this.registerModule("Biometrics", ["authenticate", "isAvailable", "getSupportedTypes"]);
  }

  private registerModule(name: string, methods: string[]): void {
    const nativeModule = NativeModules[name];
    
    this.modules.set(name, {
      name,
      methods,
      isAvailable: !!nativeModule,
    });
  }

  public async callNativeMethod(
    moduleName: string,
    methodName: string,
    ...args: any[]
  ): Promise<any> {
    const module = this.modules.get(moduleName);
    
    if (!module) {
      throw new Error(`Module ${moduleName} not found`);
    }

    if (!module.isAvailable) {
      throw new Error(`Module ${moduleName} not available on ${Platform.OS}`);
    }

    if (!module.methods.includes(methodName)) {
      throw new Error(`Method ${methodName} not found in module ${moduleName}`);
    }

    const nativeModule = NativeModules[moduleName];
    
    if (!nativeModule[methodName]) {
      throw new Error(`Native method ${methodName} not implemented`);
    }

    try {
      return await nativeModule[methodName](...args);
    } catch (error) {
      throw new Error(`Native method call failed: ${error}`);
    }
  }

  public isModuleAvailable(moduleName: string): boolean {
    const module = this.modules.get(moduleName);
    return module ? module.isAvailable : false;
  }

  public getAvailableModules(): BridgeModule[] {
    return Array.from(this.modules.values()).filter(module => module.isAvailable);
  }

  public getPlatformCapabilities(): Record<string, boolean> {
    return {
      hasCamera: this.isModuleAvailable("Camera"),
      hasLocation: this.isModuleAvailable("Location"),
      hasBiometrics: this.isModuleAvailable("Biometrics"),
      hasFileSystem: this.isModuleAvailable("FileSystem"),
      hasDeviceInfo: this.isModuleAvailable("DeviceInfo"),
    };
  }
}
