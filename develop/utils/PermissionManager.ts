export type PermissionType = 
  | 'camera'
  | 'microphone'
  | 'location'
  | 'photos'
  | 'contacts'
  | 'calendar'
  | 'reminders'
  | 'notifications'
  | 'bluetooth'
  | 'storage'
  | 'phone';

export type PermissionStatus = 
  | 'granted'
  | 'denied'
  | 'blocked'
  | 'limited'
  | 'unavailable'
  | 'undetermined';

export interface PermissionResult {
  status: PermissionStatus;
  canAskAgain: boolean;
}

export class PermissionManager {
  private static instance: PermissionManager;

  public static getInstance(): PermissionManager {
    if (!PermissionManager.instance) {
      PermissionManager.instance = new PermissionManager();
    }
    return PermissionManager.instance;
  }

  public async checkPermission(permission: PermissionType): Promise<PermissionStatus> {
    try {
      // Check permission status
      // This would use native permission checking APIs
      return 'granted'; // Mock value
    } catch (error) {
      console.error(`Failed to check ${permission} permission:`, error);
      return 'unavailable';
    }
  }

  public async requestPermission(permission: PermissionType): Promise<PermissionResult> {
    try {
      // Request permission
      // This would use native permission request APIs
      
      const result: PermissionResult = {
        status: 'granted',
        canAskAgain: true,
      };
      
      return result;
    } catch (error) {
      console.error(`Failed to request ${permission} permission:`, error);
      return {
        status: 'denied',
        canAskAgain: false,
      };
    }
  }

  public async requestMultiplePermissions(
    permissions: PermissionType[]
  ): Promise<Record<PermissionType, PermissionResult>> {
    const results: Record<string, PermissionResult> = {};
    
    for (const permission of permissions) {
      results[permission] = await this.requestPermission(permission);
    }
    
    return results as Record<PermissionType, PermissionResult>;
  }

  public async openSettings(): Promise<void> {
    try {
      // Open app settings
      // This would use native settings opening APIs
      console.log('Opening app settings');
    } catch (error) {
      console.error('Failed to open settings:', error);
    }
  }

  public async shouldShowRequestPermissionRationale(
    permission: PermissionType
  ): Promise<boolean> {
    try {
      // Check if should show rationale
      // This would use native rationale checking APIs
      return false;
    } catch (error) {
      return false;
    }
  }

  public isPermissionGranted(status: PermissionStatus): boolean {
    return status === 'granted' || status === 'limited';
  }

  public isPermissionDenied(status: PermissionStatus): boolean {
    return status === 'denied' || status === 'blocked';
  }

  public canRequestPermission(result: PermissionResult): boolean {
    return result.canAskAgain && result.status !== 'granted';
  }

  public getPermissionMessage(permission: PermissionType): string {
    const messages: Record<PermissionType, string> = {
      camera: 'This app needs camera access to take photos and videos.',
      microphone: 'This app needs microphone access to record audio.',
      location: 'This app needs location access to provide location-based features.',
      photos: 'This app needs photo library access to save and select images.',
      contacts: 'This app needs contacts access to find and connect with friends.',
      calendar: 'This app needs calendar access to create and manage events.',
      reminders: 'This app needs reminders access to create and manage tasks.',
      notifications: 'This app needs notification permission to send you updates.',
      bluetooth: 'This app needs Bluetooth access to connect with nearby devices.',
      storage: 'This app needs storage access to save and read files.',
      phone: 'This app needs phone access to make and manage calls.',
    };
    
    return messages[permission] || `This app needs ${permission} permission.`;
  }
}

export default PermissionManager;
