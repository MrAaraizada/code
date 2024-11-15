export type BiometricType = 'fingerprint' | 'face' | 'iris' | 'voice';

export interface BiometricAuthOptions {
  title?: string;
  subtitle?: string;
  description?: string;
  fallbackLabel?: string;
  negativeButtonText?: string;
  disableDeviceFallback?: boolean;
}

export interface BiometricAuthResult {
  success: boolean;
  error?: string;
  biometryType?: BiometricType;
}

export class BiometricAuth {
  private static instance: BiometricAuth;

  public static getInstance(): BiometricAuth {
    if (!BiometricAuth.instance) {
      BiometricAuth.instance = new BiometricAuth();
    }
    return BiometricAuth.instance;
  }

  public async isAvailable(): Promise<boolean> {
    try {
      // This would typically use a native module like react-native-biometrics
      // For now, return mock availability
      return true;
    } catch (error) {
      return false;
    }
  }

  public async getSupportedBiometrics(): Promise<BiometricType[]> {
    try {
      // Mock supported biometrics
      const supported: BiometricType[] = ['fingerprint'];
      
      // Add face recognition for newer devices
      if (this.isModernDevice()) {
        supported.push('face');
      }
      
      return supported;
    } catch (error) {
      return [];
    }
  }

  public async authenticate(
    options: BiometricAuthOptions = {}
  ): Promise<BiometricAuthResult> {
    try {
      const isAvailable = await this.isAvailable();
      if (!isAvailable) {
        return {
          success: false,
          error: 'Biometric authentication not available',
        };
      }

      // Mock authentication process
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulate successful authentication
          resolve({
            success: true,
            biometryType: 'fingerprint',
          });
        }, 1000);
      });
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      };
    }
  }

  public async createKeys(): Promise<boolean> {
    try {
      // This would create biometric keys in the secure keystore
      return true;
    } catch (error) {
      return false;
    }
  }

  public async deleteKeys(): Promise<boolean> {
    try {
      // This would delete biometric keys from the secure keystore
      return true;
    } catch (error) {
      return false;
    }
  }

  public async biometricKeysExist(): Promise<boolean> {
    try {
      // Check if biometric keys exist in the keystore
      return true;
    } catch (error) {
      return false;
    }
  }

  private isModernDevice(): boolean {
    // Mock logic to determine if device supports face recognition
    return true;
  }
}

export default BiometricAuth;
