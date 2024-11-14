export class PlatformBridge {
  private static instance: PlatformBridge;
  private nativeModules: Map<string, any> = new Map();

  public static getInstance(): PlatformBridge {
    if (!PlatformBridge.instance) {
      PlatformBridge.instance = new PlatformBridge();
    }
    return PlatformBridge.instance;
  }

  public registerNativeModule(name: string, module: any): void {
    this.nativeModules.set(name, module);
  }

  public getNativeModule(name: string): any {
    return this.nativeModules.get(name);
  }

  public async callNativeMethod(
    moduleName: string, 
    methodName: string, 
    ...args: any[]
  ): Promise<any> {
    const module = this.getNativeModule(moduleName);
    if (!module || !module[methodName]) {
      throw new Error(`Native method ${moduleName}.${methodName} not found`);
    }
    
    return module[methodName](...args);
  }

  public isNativeModuleAvailable(name: string): boolean {
    return this.nativeModules.has(name);
  }

  public listAvailableModules(): string[] {
    return Array.from(this.nativeModules.keys());
  }
}

export default PlatformBridge;
