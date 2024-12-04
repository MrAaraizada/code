import React, { useRef, useState } from "react";
import {
  View,
  PanResponder,
  Animated,
  Dimensions,
  ViewStyle,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export interface SwipeableProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  swipeThreshold?: number;
  velocityThreshold?: number;
  style?: ViewStyle;
  disabled?: boolean;
}

export const Swipeable: React.FC<SwipeableProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  swipeThreshold = 50,
  velocityThreshold = 0.3,
  style,
  disabled = false,
}) => {
  const [swiping, setSwiping] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return !disabled && (Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5);
    },

    onPanResponderGrant: () => {
      setSwiping(true);
    },

    onPanResponderMove: (_, gestureState) => {
      translateX.setValue(gestureState.dx * 0.3); // Damping effect
      translateY.setValue(gestureState.dy * 0.3);
    },

    onPanResponderRelease: (_, gestureState) => {
      setSwiping(false);
      
      const { dx, dy, vx, vy } = gestureState;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      const absVx = Math.abs(vx);
      const absVy = Math.abs(vy);

      // Reset position
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();

      // Determine swipe direction
      if (absDx > absDy) {
        // Horizontal swipe
        if (absDx > swipeThreshold || absVx > velocityThreshold) {
          if (dx > 0) {
            onSwipeRight?.();
          } else {
            onSwipeLeft?.();
          }
        }
      } else {
        // Vertical swipe
        if (absDy > swipeThreshold || absVy > velocityThreshold) {
          if (dy > 0) {
            onSwipeDown?.();
          } else {
            onSwipeUp?.();
          }
        }
      }
    },

    onPanResponderTerminate: () => {
      setSwiping(false);
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    },
  });

  return (
    <Animated.View
      style={[
        {
          transform: [
            { translateX },
            { translateY },
          ],
        },
        style,
      ]}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};

export default Swipeable;
