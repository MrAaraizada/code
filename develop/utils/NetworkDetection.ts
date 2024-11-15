import { NetInfo } from '@react-native-async-storage/async-storage';

export type NetworkType = 'wifi' | 'cellular' | 'ethernet' | 'other' | 'none';
export type NetworkState = {
  type: NetworkType;
  isConnected: boolean;
  isInternetReachable: boolean | null;
  details: any;
};

export class NetworkDetection {
  private static listeners: ((state: NetworkState) => void)[] = [];
  private static currentState: NetworkState | null = null;

  public static async getCurrentNetworkState(): Promise<NetworkState> {
    try {
      const state = await NetInfo.fetch();
      this.currentState = {
        type: state.type as NetworkType,
        isConnected: state.isConnected || false,
        isInternetReachable: state.isInternetReachable,
        details: state.details,
      };
      return this.currentState;
    } catch (error) {
      return {
        type: 'none',
        isConnected: false,
        isInternetReachable: false,
        details: null,
      };
    }
  }

  public static addNetworkListener(
    listener: (state: NetworkState) => void
  ): () => void {
    this.listeners.push(listener);

    // Set up NetInfo listener if this is the first listener
    if (this.listeners.length === 1) {
      this.setupNetInfoListener();
    }

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }

      // Clean up if no more listeners
      if (this.listeners.length === 0) {
        this.cleanupNetInfoListener();
      }
    };
  }

  public static async isConnected(): Promise<boolean> {
    const state = await this.getCurrentNetworkState();
    return state.isConnected;
  }

  public static async isWiFi(): Promise<boolean> {
    const state = await this.getCurrentNetworkState();
    return state.type === 'wifi';
  }

  public static async isCellular(): Promise<boolean> {
    const state = await this.getCurrentNetworkState();
    return state.type === 'cellular';
  }

  public static async hasInternetAccess(): Promise<boolean> {
    const state = await this.getCurrentNetworkState();
    return state.isInternetReachable === true;
  }

  public static async getConnectionSpeed(): Promise<string | null> {
    const state = await this.getCurrentNetworkState();
    if (state.type === 'cellular' && state.details) {
      return state.details.cellularGeneration || null;
    }
    return null;
  }

  private static setupNetInfoListener(): void {
    NetInfo.addEventListener(state => {
      const networkState: NetworkState = {
        type: state.type as NetworkType,
        isConnected: state.isConnected || false,
        isInternetReachable: state.isInternetReachable,
        details: state.details,
      };

      this.currentState = networkState;
      this.listeners.forEach(listener => listener(networkState));
    });
  }

  private static cleanupNetInfoListener(): void {
    // NetInfo cleanup would be handled by the unsubscribe function
  }
}

export default NetworkDetection;
