import { useState, useEffect, useRef } from 'react';

export interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  fps: number;
  bundleSize: number;
  networkRequests: number;
  cacheHitRate: number;
}

export interface PerformanceAlert {
  type: 'warning' | 'error';
  metric: keyof PerformanceMetrics;
  value: number;
  threshold: number;
  message: string;
}

export const usePerformanceMonitor = (options: {
  enableFPSMonitoring?: boolean;
  enableMemoryMonitoring?: boolean;
  enableNetworkMonitoring?: boolean;
  alertThresholds?: Partial<PerformanceMetrics>;
} = {}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    fps: 60,
    bundleSize: 0,
    networkRequests: 0,
    cacheHitRate: 1,
  });

  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  const renderStartTime = useRef<number>(0);
  const frameCount = useRef<number>(0);
  const lastFrameTime = useRef<number>(0);
  const monitoringInterval = useRef<NodeJS.Timeout | null>(null);

  const defaultThresholds: PerformanceMetrics = {
    renderTime: 16, // 16ms for 60fps
    memoryUsage: 100 * 1024 * 1024, // 100MB
    fps: 30, // Minimum acceptable FPS
    bundleSize: 5 * 1024 * 1024, // 5MB
    networkRequests: 10, // Max concurrent requests
    cacheHitRate: 0.8, // 80% cache hit rate
  };

  const thresholds = { ...defaultThresholds, ...options.alertThresholds };

  useEffect(() => {
    if (isMonitoring) {
      startMonitoring();
    } else {
      stopMonitoring();
    }

    return () => stopMonitoring();
  }, [isMonitoring, options]);

  const startMonitoring = () => {
    if (options.enableFPSMonitoring) {
      startFPSMonitoring();
    }

    if (options.enableMemoryMonitoring) {
      startMemoryMonitoring();
    }

    if (options.enableNetworkMonitoring) {
      startNetworkMonitoring();
    }

    monitoringInterval.current = setInterval(() => {
      checkThresholds();
    }, 1000);
  };

  const stopMonitoring = () => {
    if (monitoringInterval.current) {
      clearInterval(monitoringInterval.current);
      monitoringInterval.current = null;
    }
  };

  const startFPSMonitoring = () => {
    const measureFPS = () => {
      const now = performance.now();
      frameCount.current++;

      if (lastFrameTime.current) {
        const delta = now - lastFrameTime.current;
        const fps = 1000 / delta;
        
        setMetrics(prev => ({ ...prev, fps: Math.round(fps) }));
      }

      lastFrameTime.current = now;
      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  };

  const startMemoryMonitoring = () => {
    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: memory.usedJSHeapSize,
        }));
      }
    };

    setInterval(measureMemory, 5000); // Every 5 seconds
  };

  const startNetworkMonitoring = () => {
    // Monitor network requests
    let activeRequests = 0;
    
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      activeRequests++;
      setMetrics(prev => ({ ...prev, networkRequests: activeRequests }));
      
      try {
        const response = await originalFetch(...args);
        return response;
      } finally {
        activeRequests--;
        setMetrics(prev => ({ ...prev, networkRequests: activeRequests }));
      }
    };
  };

  const measureRenderTime = () => {
    renderStartTime.current = performance.now();
  };

  const recordRenderTime = () => {
    if (renderStartTime.current) {
      const renderTime = performance.now() - renderStartTime.current;
      setMetrics(prev => ({ ...prev, renderTime }));
      renderStartTime.current = 0;
    }
  };

  const checkThresholds = () => {
    const newAlerts: PerformanceAlert[] = [];

    Object.entries(thresholds).forEach(([metric, threshold]) => {
      const value = metrics[metric as keyof PerformanceMetrics];
      
      if (metric === 'fps' && value < threshold) {
        newAlerts.push({
          type: 'warning',
          metric: metric as keyof PerformanceMetrics,
          value,
          threshold,
          message: `Low FPS detected: ${value} (threshold: ${threshold})`,
        });
      } else if (metric !== 'fps' && value > threshold) {
        newAlerts.push({
          type: value > threshold * 1.5 ? 'error' : 'warning',
          metric: metric as keyof PerformanceMetrics,
          value,
          threshold,
          message: `High ${metric} detected: ${value} (threshold: ${threshold})`,
        });
      }
    });

    setAlerts(newAlerts);
  };

  const getPerformanceScore = (): number => {
    let score = 100;
    
    // Deduct points for poor performance
    if (metrics.fps < 30) score -= 20;
    if (metrics.renderTime > 16) score -= 15;
    if (metrics.memoryUsage > 50 * 1024 * 1024) score -= 15;
    if (metrics.networkRequests > 5) score -= 10;
    if (metrics.cacheHitRate < 0.8) score -= 10;
    
    return Math.max(0, score);
  };

  const generateReport = (): string => {
    const score = getPerformanceScore();
    
    return `
Performance Report
==================
Score: ${score}/100

Metrics:
- Render Time: ${metrics.renderTime.toFixed(2)}ms
- Memory Usage: ${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB
- FPS: ${metrics.fps}
- Network Requests: ${metrics.networkRequests}
- Cache Hit Rate: ${(metrics.cacheHitRate * 100).toFixed(1)}%

Alerts: ${alerts.length}
${alerts.map(alert => `- ${alert.message}`).join('\n')}
    `.trim();
  };

  return {
    metrics,
    alerts,
    isMonitoring,
    startMonitoring: () => setIsMonitoring(true),
    stopMonitoring: () => setIsMonitoring(false),
    measureRenderTime,
    recordRenderTime,
    getPerformanceScore,
    generateReport,
  };
};

export default usePerformanceMonitor;
