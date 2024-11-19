import React, { Suspense, ComponentType } from 'react';

export interface LazyLoadOptions {
  fallback?: React.ComponentType;
  delay?: number;
  retries?: number;
  preload?: boolean;
}

export class LazyLoader {
  private static loadedComponents: Map<string, ComponentType> = new Map();
  private static loadingPromises: Map<string, Promise<ComponentType>> = new Map();

  public static lazy<T extends ComponentType<any>>(
    importFn: () => Promise<{ default: T }>,
    options: LazyLoadOptions = {}
  ): ComponentType<React.ComponentProps<T>> {
    const LazyComponent = React.lazy(async () => {
      try {
        if (options.delay) {
          await this.delay(options.delay);
        }

        const module = await this.retryImport(importFn, options.retries || 3);
        return module;
      } catch (error) {
        console.error('Failed to load component:', error);
        throw error;
      }
    });

    return (props: React.ComponentProps<T>) => (
      <Suspense fallback={options.fallback ? <options.fallback /> : <DefaultFallback />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  }

  public static preloadComponent<T extends ComponentType<any>>(
    key: string,
    importFn: () => Promise<{ default: T }>
  ): Promise<T> {
    if (this.loadedComponents.has(key)) {
      return Promise.resolve(this.loadedComponents.get(key) as T);
    }

    if (this.loadingPromises.has(key)) {
      return this.loadingPromises.get(key) as Promise<T>;
    }

    const promise = importFn().then(module => {
      const component = module.default;
      this.loadedComponents.set(key, component);
      this.loadingPromises.delete(key);
      return component;
    });

    this.loadingPromises.set(key, promise);
    return promise;
  }

  public static createLazyRoute<T extends ComponentType<any>>(
    importFn: () => Promise<{ default: T }>,
    options: LazyLoadOptions = {}
  ) {
    return {
      component: this.lazy(importFn, options),
      preload: () => this.preloadComponent('route', importFn),
    };
  }

  public static createIntersectionObserver(
    callback: (entries: IntersectionObserverEntry[]) => void,
    options: IntersectionObserverInit = {}
  ): IntersectionObserver {
    const defaultOptions: IntersectionObserverInit = {
      rootMargin: '50px',
      threshold: 0.1,
      ...options,
    };

    return new IntersectionObserver(callback, defaultOptions);
  }

  public static lazyLoadOnScroll<T extends ComponentType<any>>(
    importFn: () => Promise<{ default: T }>,
    triggerElement: Element
  ): ComponentType<React.ComponentProps<T>> {
    let hasLoaded = false;
    let LazyComponent: ComponentType<React.ComponentProps<T>> | null = null;

    const observer = this.createIntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasLoaded) {
          hasLoaded = true;
          LazyComponent = this.lazy(importFn);
          observer.disconnect();
        }
      });
    });

    observer.observe(triggerElement);

    return (props: React.ComponentProps<T>) => {
      if (LazyComponent) {
        return <LazyComponent {...props} />;
      }
      return <DefaultFallback />;
    };
  }

  private static async retryImport<T>(
    importFn: () => Promise<T>,
    retries: number
  ): Promise<T> {
    try {
      return await importFn();
    } catch (error) {
      if (retries > 0) {
        await this.delay(1000); // Wait 1 second before retry
        return this.retryImport(importFn, retries - 1);
      }
      throw error;
    }
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public static getLoadedComponentsCount(): number {
    return this.loadedComponents.size;
  }

  public static clearCache(): void {
    this.loadedComponents.clear();
    this.loadingPromises.clear();
  }
}

const DefaultFallback: React.FC = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100px' 
  }}>
    Loading...
  </div>
);

export default LazyLoader;
