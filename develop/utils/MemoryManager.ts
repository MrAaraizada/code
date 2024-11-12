export class MemoryManager {
  private static instance: MemoryManager;
  private cache: Map<string, any> = new Map();
  private maxCacheSize: number = 100;

  public static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }

  public setMaxCacheSize(size: number): void {
    this.maxCacheSize = size;
    this.enforceMaxSize();
  }

  public set(key: string, value: any): void {
    if (this.cache.size >= this.maxCacheSize) {
      // Remove oldest entry (first in Map)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  public get(key: string): any {
    return this.cache.get(key);
  }

  public has(key: string): boolean {
    return this.cache.has(key);
  }

  public delete(key: string): boolean {
    return this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }

  public getMemoryUsage(): { cacheSize: number; maxSize: number } {
    return {
      cacheSize: this.cache.size,
      maxSize: this.maxCacheSize,
    };
  }

  private enforceMaxSize(): void {
    while (this.cache.size > this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }

  public cleanup(): void {
    // Perform memory cleanup operations
    this.clear();
    if (global.gc) {
      global.gc();
    }
  }
}

export default MemoryManager;
