import React, { useState, useRef, useCallback } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

export interface CarouselProps {
  data: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  itemWidth?: number;
  spacing?: number;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onIndexChange?: (index: number) => void;
  showIndicators?: boolean;
  style?: ViewStyle;
}

const { width: screenWidth } = Dimensions.get("window");

export const Carousel: React.FC<CarouselProps> = ({
  data,
  renderItem,
  itemWidth = screenWidth * 0.8,
  spacing = 16,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 3000,
  onIndexChange,
  showIndicators = true,
  style,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const translateX = useSharedValue(0);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const totalWidth = itemWidth + spacing;

  const startAutoPlay = useCallback(() => {
    if (autoPlay && data.length > 1) {
      autoPlayRef.current = setInterval(() => {
        const nextIndex = loop 
          ? (currentIndex + 1) % data.length
          : Math.min(currentIndex + 1, data.length - 1);
        
        scrollToIndex(nextIndex);
      }, autoPlayInterval);
    }
  }, [autoPlay, currentIndex, data.length, loop, autoPlayInterval]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * totalWidth,
        animated: true,
      });
    }
  }, [totalWidth]);

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / totalWidth);
    
    if (index !== currentIndex) {
      setCurrentIndex(index);
      onIndexChange?.(index);
    }
  }, [currentIndex, totalWidth, onIndexChange]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  React.useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  return (
    <View style={[{ alignItems: "center" }, style]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={totalWidth}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: (screenWidth - itemWidth) / 2,
        }}
        onScrollBeginDrag={stopAutoPlay}
        onScrollEndDrag={startAutoPlay}
      >
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              width: itemWidth,
              marginRight: index < data.length - 1 ? spacing : 0,
            }}
          >
            {renderItem(item, index)}
          </View>
        ))}
      </ScrollView>

      {showIndicators && (
        <View
          style={{
            flexDirection: "row",
            marginTop: 16,
            alignItems: "center",
          }}
        >
          {data.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: index === currentIndex ? "#007AFF" : "#C7C7CC",
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default Carousel;
