export interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  componentCount: number;
  reRenderCount: number;
}

export class PerformanceTestUtils {
  private static metrics: Map<string, PerformanceMetrics> = new Map();
  private static observers: Map<string, PerformanceObserver> = new Map();

  public static startMeasurement(testName: string): void {
    const startTime = performance.now();
    
    this.metrics.set(testName, {
      renderTime: startTime,
      memoryUsage: this.getMemoryUsage(),
      componentCount: 0,
      reRenderCount: 0,
    });

    // Start performance observer if available
    if (typeof PerformanceObserver !== "undefined") {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name.includes(testName)) {
            const metrics = this.metrics.get(testName);
            if (metrics) {
              metrics.renderTime = entry.duration;
            }
          }
        });
      });

      observer.observe({ entryTypes: ["measure"] });
      this.observers.set(testName, observer);
    }
  }

  public static endMeasurement(testName: string): PerformanceMetrics | null {
    const metrics = this.metrics.get(testName);
    if (!metrics) return null;

    const endTime = performance.now();
    metrics.renderTime = endTime - metrics.renderTime;
    metrics.memoryUsage = this.getMemoryUsage() - metrics.memoryUsage;

    // Clean up observer
    const observer = this.observers.get(testName);
    if (observer) {
      observer.disconnect();
      this.observers.delete(testName);
    }

    return metrics;
  }

  public static measureComponentRender<T>(
    testName: string,
    renderFunction: () => T
  ): { result: T; metrics: PerformanceMetrics } {
    this.startMeasurement(testName);
    const result = renderFunction();
    const metrics = this.endMeasurement(testName) || {
      renderTime: 0,
      memoryUsage: 0,
      componentCount: 0,
      reRenderCount: 0,
    };

    return { result, metrics };
  }

  private static getMemoryUsage(): number {
    if (typeof performance !== "undefined" && (performance as any).memory) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }

  public static createPerformanceReport(
    measurements: Map<string, PerformanceMetrics>
  ): string {
    let report = "Performance Test Report\n";
    report += "========================\n\n";

    measurements.forEach((metrics, testName) => {
      report += `Test: ${testName}\n`;
      report += `  Render Time: ${metrics.renderTime.toFixed(2)}ms\n`;
      report += `  Memory Usage: ${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB\n`;
      report += `  Component Count: ${metrics.componentCount}\n`;
      report += `  Re-render Count: ${metrics.reRenderCount}\n\n`;
    });

    return report;
  }
}

// Updated: 2026-01-20 23:51:11 - test(develop/testing): implement performance testing

// Updated: 2026-01-21 00:00:52 - test(develop/testing): implement performance test utilities
