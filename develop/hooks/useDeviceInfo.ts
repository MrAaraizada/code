import { useState, useEffect } from 'react';
import { DeviceDetection } from '../services/DeviceDetection';
import { DeviceOrientation } from '../utils/DeviceOrientation';
import { NetworkDetection } from '../utils/NetworkDetection';
import { BatteryStatus } from '../utils/BatteryStatus';

export interface DeviceInfo {
  platform: 'ios' | 'android' | 'web';
  isTablet: boolean;
  orientation: 'portrait' | 'landscape';
  screenDimensions: { width: number; height: number };
  networkState: {
    isConnected: boolean;
    type: string;
  };
  batteryLevel: number;
  isCharging: boolean;
}

export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDeviceInfo = async () => {
      try {
        const detector = DeviceDetection.getInstance();
        const networkState = await NetworkDetection.getCurrentNetworkState();
        const batteryInfo = await BatteryStatus.getBatteryInfo();
        
        const info: DeviceInfo = {
          platform: detector.isIOS() ? 'ios' : detector.isAndroid() ? 'android' : 'web',
          isTablet: detector.isTablet(),
          orientation: DeviceOrientation.getCurrentOrientation(),
          screenDimensions: detector.getScreenDimensions(),
          networkState: {
            isConnected: networkState.isConnected,
            type: networkState.type,
          },
          batteryLevel: Math.round(batteryInfo.level * 100),
          isCharging: batteryInfo.isCharging,
        };

        setDeviceInfo(info);
      } catch (error) {
        console.error('Failed to load device info:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDeviceInfo();

    // Set up listeners for dynamic updates
    const orientationUnsubscribe = DeviceOrientation.addOrientationListener((orientation) => {
      setDeviceInfo(prev => prev ? { ...prev, orientation } : null);
    });

    const networkUnsubscribe = NetworkDetection.addNetworkListener((networkState) => {
      setDeviceInfo(prev => prev ? {
        ...prev,
        networkState: {
          isConnected: networkState.isConnected,
          type: networkState.type,
        }
      } : null);
    });

    const batteryUnsubscribe = BatteryStatus.addBatteryListener((batteryInfo) => {
      setDeviceInfo(prev => prev ? {
        ...prev,
        batteryLevel: Math.round(batteryInfo.level * 100),
        isCharging: batteryInfo.isCharging,
      } : null);
    });

    return () => {
      orientationUnsubscribe();
      networkUnsubscribe();
      batteryUnsubscribe();
    };
  }, []);

  return { deviceInfo, loading };
};

export default useDeviceInfo;
