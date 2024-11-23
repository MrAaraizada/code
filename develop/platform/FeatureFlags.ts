import { Platform } from "react-native";

export interface FeatureFlag {
  name: string;
  enabled: boolean;
  platforms: string[];
  version?: string;
  rolloutPercentage?: number;
}

export class FeatureFlags {
  private static instance: FeatureFlags;
  private flags: Map<string, FeatureFlag> = new Map();

  private constructor() {
    this.initializeDefaultFlags();
  }

  public static getInstance(): FeatureFlags {
    if (!FeatureFlags.instance) {
      FeatureFlags.instance = new FeatureFlags();
    }
    return FeatureFlags.instance;
  }

  private initializeDefaultFlags(): void {
    this.addFlag({
      name: "biometric_auth",
      enabled: true,
      platforms: ["ios", "android"],
    });

    this.addFlag({
      name: "dark_mode",
      enabled: true,
      platforms: ["ios", "android", "web"],
    });

    this.addFlag({
      name: "push_notifications",
      enabled: true,
      platforms: ["ios", "android"],
    });

    this.addFlag({
      name: "offline_mode",
      enabled: false,
      platforms: ["ios", "android", "web"],
      rolloutPercentage: 25,
    });

    this.addFlag({
      name: "advanced_camera",
      enabled: Platform.OS !== "web",
      platforms: ["ios", "android"],
    });
  }

  public addFlag(flag: FeatureFlag): void {
    this.flags.set(flag.name, flag);
  }

  public isEnabled(flagName: string): boolean {
    const flag = this.flags.get(flagName);
    
    if (!flag) {
      console.warn(`Feature flag "${flagName}" not found`);
      return false;
    }

    // Check platform compatibility
    if (!flag.platforms.includes(Platform.OS)) {
      return false;
    }

    // Check rollout percentage
    if (flag.rolloutPercentage !== undefined) {
      const userHash = this.getUserHash();
      const threshold = (userHash % 100) + 1;
      if (threshold > flag.rolloutPercentage) {
        return false;
      }
    }

    return flag.enabled;
  }

  private getUserHash(): number {
    // Simple hash function for rollout percentage
    // In production, this would use a proper user identifier
    const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "default";
    let hash = 0;
    
    for (let i = 0; i < userAgent.length; i++) {
      const char = userAgent.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash);
  }

  public getAllFlags(): FeatureFlag[] {
    return Array.from(this.flags.values());
  }

  public getEnabledFlags(): FeatureFlag[] {
    return this.getAllFlags().filter(flag => this.isEnabled(flag.name));
  }

  public updateFlag(flagName: string, updates: Partial<FeatureFlag>): void {
    const flag = this.flags.get(flagName);
    
    if (flag) {
      this.flags.set(flagName, { ...flag, ...updates });
    }
  }

  public removeFlag(flagName: string): void {
    this.flags.delete(flagName);
  }
}
