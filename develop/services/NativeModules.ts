import { NativeModules, Platform } from 'react-native';

export interface NativeModuleInterface {
  isAvailable(): boolean;
  getVersion(): string;
  initialize(config?: any): Promise<void>;
}

export class NativeModuleManager {
  private static instance: NativeModuleManager;
  private modules: Map<string, NativeModuleInterface> = new Map();

  public static getInstance(): NativeModuleManager {
    if (!NativeModuleManager.instance) {
      NativeModuleManager.instance = new NativeModuleManager();
    }
    return NativeModuleManager.instance;
  }

  public registerModule(name: string, module: NativeModuleInterface): void {
    this.modules.set(name, module);
  }

  public getModule(name: string): NativeModuleInterface | undefined {
    return this.modules.get(name);
  }

  public async initializeAll(): Promise<void> {
    const initPromises = Array.from(this.modules.values()).map(module => 
      module.initialize()
    );
    
    await Promise.all(initPromises);
  }

  public getAvailableModules(): string[] {
    return Array.from(this.modules.keys()).filter(name => {
      const module = this.modules.get(name);
      return module?.isAvailable() || false;
    });
  }

  public getPlatformSpecificModule(name: string): any {
    const platformName = `${name}${Platform.OS.charAt(0).toUpperCase() + Platform.OS.slice(1)}`;
    return NativeModules[platformName] || NativeModules[name];
  }
}

// Common native modules wrapper
export const CommonNativeModules = {
  DeviceInfo: NativeModules.DeviceInfo,
  NetworkInfo: NativeModules.NetworkInfo,
  FileSystem: NativeModules.FileSystem,
  Permissions: NativeModules.Permissions,
  Biometrics: NativeModules.Biometrics,
  Camera: NativeModules.Camera,
  Location: NativeModules.Location,
};

export default NativeModuleManager;
