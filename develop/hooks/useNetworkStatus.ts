import { useState, useEffect } from 'react';
import { NetworkDetection, NetworkState } from '../utils/NetworkDetection';

export const useNetworkStatus = () => {
  const [networkState, setNetworkState] = useState<NetworkState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNetworkState = async () => {
      try {
        const state = await NetworkDetection.getCurrentNetworkState();
        setNetworkState(state);
      } catch (error) {
        console.error('Failed to load network state:', error);
        setNetworkState({
          type: 'none',
          isConnected: false,
          isInternetReachable: false,
          details: null,
        });
      } finally {
        setLoading(false);
      }
    };

    loadNetworkState();

    // Set up network state listener
    const unsubscribe = NetworkDetection.addNetworkListener((state) => {
      setNetworkState(state);
    });

    return unsubscribe;
  }, []);

  const isConnected = networkState?.isConnected || false;
  const isWiFi = networkState?.type === 'wifi';
  const isCellular = networkState?.type === 'cellular';
  const hasInternetAccess = networkState?.isInternetReachable === true;

  return {
    networkState,
    loading,
    isConnected,
    isWiFi,
    isCellular,
    hasInternetAccess,
  };
};

export default useNetworkStatus;
