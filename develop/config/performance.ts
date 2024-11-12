export const PerformanceConfig = {
  // Memory management
  memory: {
    maxCacheSize: 100,
    gcThreshold: 0.8, // Trigger cleanup at 80% memory usage
    cleanupInterval: 30000, // 30 seconds
  },

  // Image optimization
  images: {
    defaultQuality: 0.8,
    maxWidth: 1920,
    maxHeight: 1080,
    compressionFormat: 'jpeg' as const,
    enableLazyLoading: true,
  },

  // List virtualization
  lists: {
    defaultItemHeight: 50,
    overscanCount: 5,
    enableVirtualization: true,
    recycleThreshold: 100, // Start recycling after 100 items
  },

  // Network optimization
  network: {
    requestTimeout: 10000, // 10 seconds
    retryAttempts: 3,
    cacheTimeout: 300000, // 5 minutes
    enableCompression: true,
  },

  // Animation performance
  animations: {
    useNativeDriver: true,
    enableInteractionManager: true,
    defaultDuration: 250,
    enableReducedMotion: false,
  },

  // Bundle optimization
  bundle: {
    enableCodeSplitting: true,
    lazyLoadThreshold: 1000, // KB
    enableTreeShaking: true,
    minifyEnabled: true,
  },

  // Monitoring
  monitoring: {
    enablePerformanceTracking: true,
    sampleRate: 0.1, // 10% sampling
    enableMemoryTracking: true,
    enableFPSTracking: true,
  },
} as const;

export type PerformanceConfigType = typeof PerformanceConfig;

export default PerformanceConfig;
