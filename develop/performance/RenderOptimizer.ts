import React from 'react';

export class RenderOptimizer {
  private static memoizedComponents: Map<string, React.ComponentType> = new Map();

  public static memoizeComponent<P extends object>(
    Component: React.ComponentType<P>,
    areEqual?: (prevProps: P, nextProps: P) => boolean
  ): React.ComponentType<P> {
    const componentName = Component.displayName || Component.name || 'Component';
    
    if (this.memoizedComponents.has(componentName)) {
      return this.memoizedComponents.get(componentName) as React.ComponentType<P>;
    }

    const MemoizedComponent = React.memo(Component, areEqual);
    this.memoizedComponents.set(componentName, MemoizedComponent);
    
    return MemoizedComponent;
  }

  public static createShallowEqual<T extends object>(
    keys?: (keyof T)[]
  ): (prev: T, next: T) => boolean {
    return (prev: T, next: T): boolean => {
      if (prev === next) return true;
      
      const keysToCheck = keys || Object.keys(prev) as (keyof T)[];
      
      for (const key of keysToCheck) {
        if (prev[key] !== next[key]) {
          return false;
        }
      }
      
      return true;
    };
  }

  public static createDeepEqual<T>(
    maxDepth: number = 3
  ): (prev: T, next: T) => boolean {
    return (prev: T, next: T): boolean => {
      return this.deepEqual(prev, next, maxDepth);
    };
  }

  private static deepEqual(a: any, b: any, depth: number): boolean {
    if (depth <= 0) return a === b;
    if (a === b) return true;
    if (a == null || b == null) return a === b;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object') return a === b;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!this.deepEqual(a[key], b[key], depth - 1)) return false;
    }

    return true;
  }

  public static optimizeListRendering<T>(
    data: T[],
    renderItem: (item: T, index: number) => React.ReactElement,
    keyExtractor: (item: T, index: number) => string
  ) {
    const MemoizedItem = React.memo(
      ({ item, index }: { item: T; index: number }) => renderItem(item, index),
      (prev, next) => prev.item === next.item && prev.index === next.index
    );

    return {
      data,
      renderItem: ({ item, index }: { item: T; index: number }) => (
        <MemoizedItem item={item} index={index} />
      ),
      keyExtractor,
      removeClippedSubviews: true,
      maxToRenderPerBatch: 10,
      updateCellsBatchingPeriod: 50,
      initialNumToRender: 10,
      windowSize: 10,
    };
  }
}

export default RenderOptimizer;
