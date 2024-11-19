export const OptimizationConfig = {
  // Bundle optimization settings
  bundle: {
    enableCodeSplitting: true,
    enableTreeShaking: true,
    enableMinification: true,
    enableCompression: true,
    chunkSizeLimit: 244 * 1024, // 244KB
    asyncChunkSizeLimit: 500 * 1024, // 500KB
    enableSourceMaps: false, // Disable in production
  },

  // Image optimization settings
  images: {
    enableLazyLoading: true,
    enableWebP: true,
    enableResponsiveImages: true,
    defaultQuality: 0.8,
    thumbnailSizes: [150, 300, 600, 1200],
    maxUploadSize: 5 * 1024 * 1024, // 5MB
    compressionQuality: {
      thumbnail: 0.6,
      medium: 0.8,
      large: 0.9,
    },
  },

  // Performance monitoring settings
  performance: {
    enableFPSMonitoring: true,
    enableMemoryMonitoring: true,
    enableNetworkMonitoring: true,
    enableRenderTimeTracking: true,
    alertThresholds: {
      renderTime: 16, // 16ms for 60fps
      memoryUsage: 100 * 1024 * 1024, // 100MB
      fps: 30,
      networkRequests: 10,
      cacheHitRate: 0.8,
    },
    sampleRate: 0.1, // 10% sampling in production
  },

  // Caching settings
  cache: {
    enableServiceWorker: true,
    enableMemoryCache: true,
    enableDiskCache: true,
    maxMemoryCacheSize: 50 * 1024 * 1024, // 50MB
    maxDiskCacheSize: 200 * 1024 * 1024, // 200MB
    defaultTTL: 5 * 60 * 1000, // 5 minutes
    imageCacheTTL: 24 * 60 * 60 * 1000, // 24 hours
    apiCacheTTL: 60 * 1000, // 1 minute
  },

  // Network optimization settings
  network: {
    enableRequestDeduplication: true,
    enableRetryLogic: true,
    maxRetries: 3,
    retryDelay: 1000,
    requestTimeout: 10000, // 10 seconds
    enableCompression: true,
    enableKeepAlive: true,
    maxConcurrentRequests: 6,
  },

  // Rendering optimization settings
  rendering: {
    enableVirtualization: true,
    virtualizationThreshold: 100, // Items
    enableMemoization: true,
    enableLazyComponents: true,
    enableIntersectionObserver: true,
    intersectionThreshold: 0.1,
    intersectionRootMargin: '50px',
  },

  // Animation optimization settings
  animations: {
    useNativeDriver: true,
    enableInteractionManager: true,
    enableLayoutAnimation: false, // Can be expensive
    defaultDuration: 250,
    enableReducedMotion: true, // Respect user preferences
    enableGPUAcceleration: true,
  },

  // Memory management settings
  memory: {
    enableGarbageCollection: true,
    gcThreshold: 0.8, // 80% memory usage
    enableMemoryPressureHandling: true,
    enableComponentUnmounting: true,
    enableEventListenerCleanup: true,
    maxComponentInstances: 1000,
  },

  // Development settings
  development: {
    enablePerformanceDevTools: true,
    enableBundleAnalyzer: true,
    enableHotReload: true,
    enableFastRefresh: true,
    enableSourceMaps: true,
    enableProfiling: true,
  },

  // Production settings
  production: {
    enableMinification: true,
    enableCompression: true,
    enableTreeShaking: true,
    enableDeadCodeElimination: true,
    enableAssetOptimization: true,
    enableCDN: true,
    enableServiceWorker: true,
  },
} as const;

export type OptimizationConfigType = typeof OptimizationConfig;

// Environment-specific configurations
export const getOptimizationConfig = (env: 'development' | 'production' | 'test') => {
  const baseConfig = OptimizationConfig;
  
  switch (env) {
    case 'development':
      return {
        ...baseConfig,
        bundle: {
          ...baseConfig.bundle,
          enableMinification: false,
          enableSourceMaps: true,
        },
        performance: {
          ...baseConfig.performance,
          sampleRate: 1.0, // 100% sampling in development
        },
      };
      
    case 'production':
      return {
        ...baseConfig,
        bundle: {
          ...baseConfig.bundle,
          enableMinification: true,
          enableSourceMaps: false,
        },
        performance: {
          ...baseConfig.performance,
          sampleRate: 0.01, // 1% sampling in production
        },
      };
      
    case 'test':
      return {
        ...baseConfig,
        performance: {
          ...baseConfig.performance,
          enableFPSMonitoring: false,
          enableMemoryMonitoring: false,
          enableNetworkMonitoring: false,
        },
      };
      
    default:
      return baseConfig;
  }
};

export default OptimizationConfig;
