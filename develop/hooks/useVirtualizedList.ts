import { useState, useCallback, useMemo } from 'react';

interface VirtualizedListOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export const useVirtualizedList = <T>(
  items: T[],
  options: VirtualizedListOptions
) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const { itemHeight, containerHeight, overscan = 5 } = options;

  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollOffset / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollOffset + containerHeight) / itemHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollOffset, itemHeight, containerHeight, overscan, items.length]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [items, visibleRange]);

  const totalHeight = items.length * itemHeight;

  const onScroll = useCallback((event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  }, []);

  return {
    visibleItems,
    visibleRange,
    totalHeight,
    onScroll,
  };
};

export default useVirtualizedList;
