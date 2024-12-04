import React, { useRef, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  ViewStyle,
} from "react-native";

export interface DoubleTappableProps {
  children: React.ReactNode;
  onDoubleTap: () => void;
  onSingleTap?: () => void;
  doubleTapDelay?: number;
  style?: ViewStyle;
  disabled?: boolean;
  scaleOnTap?: boolean;
}

export const DoubleTappable: React.FC<DoubleTappableProps> = ({
  children,
  onDoubleTap,
  onSingleTap,
  doubleTapDelay = 300,
  style,
  disabled = false,
  scaleOnTap = true,
}) => {
  const [tapCount, setTapCount] = useState(0);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const tapTimer = useRef<NodeJS.Timeout>();
  const lastTapTime = useRef(0);

  const animateScale = (toValue: number) => {
    if (!scaleOnTap) return;
    
    Animated.spring(scaleValue, {
      toValue,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePress = () => {
    if (disabled) return;

    const now = Date.now();
    const timeSinceLastTap = now - lastTapTime.current;

    animateScale(0.95);
    setTimeout(() => animateScale(1), 100);

    if (timeSinceLastTap < doubleTapDelay && tapCount === 1) {
      // Double tap detected
      setTapCount(0);
      if (tapTimer.current) {
        clearTimeout(tapTimer.current);
        tapTimer.current = undefined;
      }
      onDoubleTap();
    } else {
      // First tap or tap after delay
      setTapCount(1);
      lastTapTime.current = now;

      // Clear existing timer
      if (tapTimer.current) {
        clearTimeout(tapTimer.current);
      }

      // Set timer for single tap
      tapTimer.current = setTimeout(() => {
        if (tapCount === 1) {
          setTapCount(0);
          onSingleTap?.();
        }
      }, doubleTapDelay);
    }
  };

  const animatedStyle = scaleOnTap ? {
    transform: [{ scale: scaleValue }],
  } : {};

  return (
    <TouchableWithoutFeedback onPress={handlePress} disabled={disabled}>
      <Animated.View style={[style, animatedStyle]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default DoubleTappable;
