export interface BatteryInfo {
  level: number; // 0-1
  isCharging: boolean;
  chargingTime?: number;
  dischargingTime?: number;
}

export class BatteryStatus {
  private static listeners: ((info: BatteryInfo) => void)[] = [];
  private static currentInfo: BatteryInfo | null = null;

  public static async getBatteryInfo(): Promise<BatteryInfo> {
    try {
      // This would typically use a native module
      // For now, return mock data
      const mockInfo: BatteryInfo = {
        level: 0.75,
        isCharging: false,
      };
      
      this.currentInfo = mockInfo;
      return mockInfo;
    } catch (error) {
      return {
        level: 1.0,
        isCharging: false,
      };
    }
  }

  public static addBatteryListener(
    listener: (info: BatteryInfo) => void
  ): () => void {
    this.listeners.push(listener);

    // Set up battery monitoring if this is the first listener
    if (this.listeners.length === 1) {
      this.setupBatteryMonitoring();
    }

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }

      // Clean up if no more listeners
      if (this.listeners.length === 0) {
        this.cleanupBatteryMonitoring();
      }
    };
  }

  public static async isLowBattery(threshold: number = 0.2): Promise<boolean> {
    const info = await this.getBatteryInfo();
    return info.level <= threshold;
  }

  public static async isCriticalBattery(threshold: number = 0.05): Promise<boolean> {
    const info = await this.getBatteryInfo();
    return info.level <= threshold;
  }

  public static async isCharging(): Promise<boolean> {
    const info = await this.getBatteryInfo();
    return info.isCharging;
  }

  public static async getBatteryPercentage(): Promise<number> {
    const info = await this.getBatteryInfo();
    return Math.round(info.level * 100);
  }

  public static async getEstimatedTimeRemaining(): Promise<number | null> {
    const info = await this.getBatteryInfo();
    if (info.isCharging && info.chargingTime) {
      return info.chargingTime;
    } else if (!info.isCharging && info.dischargingTime) {
      return info.dischargingTime;
    }
    return null;
  }

  private static setupBatteryMonitoring(): void {
    // Set up periodic battery status checking
    const interval = setInterval(async () => {
      const newInfo = await this.getBatteryInfo();
      
      if (this.hasSignificantChange(this.currentInfo, newInfo)) {
        this.currentInfo = newInfo;
        this.listeners.forEach(listener => listener(newInfo));
      }
    }, 30000); // Check every 30 seconds

    // Store interval for cleanup
    (this as any).batteryInterval = interval;
  }

  private static cleanupBatteryMonitoring(): void {
    if ((this as any).batteryInterval) {
      clearInterval((this as any).batteryInterval);
      (this as any).batteryInterval = null;
    }
  }

  private static hasSignificantChange(
    oldInfo: BatteryInfo | null,
    newInfo: BatteryInfo
  ): boolean {
    if (!oldInfo) return true;
    
    const levelChange = Math.abs(oldInfo.level - newInfo.level) >= 0.05; // 5% change
    const chargingChange = oldInfo.isCharging !== newInfo.isCharging;
    
    return levelChange || chargingChange;
  }
}

export default BatteryStatus;
