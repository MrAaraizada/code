export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  public startTimer(key: string): void {
    this.metrics.set(key, Date.now());
  }

  public endTimer(key: string): number {
    const startTime = this.metrics.get(key);
    if (!startTime) return 0;
    const duration = Date.now() - startTime;
    this.metrics.delete(key);
    return duration;
  }

  public logPerformance(operation: string, duration: number): void {
    console.log(`[Performance] ${operation}: ${duration}ms`);
  }
}

export default PerformanceMonitor;
