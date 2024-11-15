import { Dimensions } from 'react-native';

export type Orientation = 'portrait' | 'landscape';

export class DeviceOrientation {
  private static listeners: ((orientation: Orientation) => void)[] = [];
  private static currentOrientation: Orientation;

  public static getCurrentOrientation(): Orientation {
    const { width, height } = Dimensions.get('window');
    return width > height ? 'landscape' : 'portrait';
  }

  public static addOrientationListener(
    listener: (orientation: Orientation) => void
  ): () => void {
    this.listeners.push(listener);
    
    // Set up dimension change listener if this is the first listener
    if (this.listeners.length === 1) {
      this.setupDimensionListener();
    }

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
      
      // Clean up if no more listeners
      if (this.listeners.length === 0) {
        this.cleanupDimensionListener();
      }
    };
  }

  public static isPortrait(): boolean {
    return this.getCurrentOrientation() === 'portrait';
  }

  public static isLandscape(): boolean {
    return this.getCurrentOrientation() === 'landscape';
  }

  public static getScreenDimensions(): { width: number; height: number } {
    return Dimensions.get('screen');
  }

  public static getWindowDimensions(): { width: number; height: number } {
    return Dimensions.get('window');
  }

  private static setupDimensionListener(): void {
    this.currentOrientation = this.getCurrentOrientation();
    
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      const newOrientation = window.width > window.height ? 'landscape' : 'portrait';
      
      if (newOrientation !== this.currentOrientation) {
        this.currentOrientation = newOrientation;
        this.listeners.forEach(listener => listener(newOrientation));
      }
    });
  }

  private static cleanupDimensionListener(): void {
    // Cleanup would be handled by the subscription returned from addEventListener
  }
}

export default DeviceOrientation;
