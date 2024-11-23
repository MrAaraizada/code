import { Platform } from "react-native";

export interface AppConfig {
  apiUrl: string;
  apiTimeout: number;
  enableLogging: boolean;
  enableCrashReporting: boolean;
  enableAnalytics: boolean;
  maxRetries: number;
  cacheTimeout: number;
  features: Record<string, boolean>;
}

export interface PlatformConfig {
  ios: Partial<AppConfig>;
  android: Partial<AppConfig>;
  web: Partial<AppConfig>;
}

export class ConfigManager {
  private static instance: ConfigManager;
  private config: AppConfig;
  private platformConfig: PlatformConfig;

  private constructor() {
    this.platformConfig = this.getDefaultPlatformConfig();
    this.config = this.mergeConfigs();
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private getDefaultPlatformConfig(): PlatformConfig {
    return {
      ios: {
        apiUrl: "https://api.example.com/ios",
        enableCrashReporting: true,
        enableAnalytics: true,
        features: {
          biometrics: true,
          pushNotifications: true,
          backgroundSync: true,
        },
      },
      android: {
        apiUrl: "https://api.example.com/android",
        enableCrashReporting: true,
        enableAnalytics: true,
        features: {
          biometrics: true,
          pushNotifications: true,
          backgroundSync: true,
        },
      },
      web: {
        apiUrl: "https://api.example.com/web",
        enableCrashReporting: false,
        enableAnalytics: true,
        features: {
          biometrics: false,
          pushNotifications: false,
          backgroundSync: false,
        },
      },
    };
  }

  private getBaseConfig(): AppConfig {
    return {
      apiUrl: "https://api.example.com",
      apiTimeout: 10000,
      enableLogging: __DEV__,
      enableCrashReporting: !__DEV__,
      enableAnalytics: !__DEV__,
      maxRetries: 3,
      cacheTimeout: 300000, // 5 minutes
      features: {},
    };
  }

  private mergeConfigs(): AppConfig {
    const baseConfig = this.getBaseConfig();
    const platformSpecific = this.platformConfig[Platform.OS as keyof PlatformConfig] || {};

    return {
      ...baseConfig,
      ...platformSpecific,
      features: {
        ...baseConfig.features,
        ...platformSpecific.features,
      },
    };
  }

  public getConfig(): AppConfig {
    return { ...this.config };
  }

  public get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }

  public isFeatureEnabled(featureName: string): boolean {
    return this.config.features[featureName] === true;
  }

  public updateConfig(updates: Partial<AppConfig>): void {
    this.config = {
      ...this.config,
      ...updates,
      features: {
        ...this.config.features,
        ...updates.features,
      },
    };
  }

  public updatePlatformConfig(platform: keyof PlatformConfig, config: Partial<AppConfig>): void {
    this.platformConfig[platform] = {
      ...this.platformConfig[platform],
      ...config,
    };

    // Re-merge configs if updating current platform
    if (platform === Platform.OS) {
      this.config = this.mergeConfigs();
    }
  }

  public resetToDefaults(): void {
    this.platformConfig = this.getDefaultPlatformConfig();
    this.config = this.mergeConfigs();
  }

  public getEnvironmentConfig(): Record<string, any> {
    return {
      platform: Platform.OS,
      version: Platform.Version,
      isDev: __DEV__,
      config: this.config,
    };
  }
}
