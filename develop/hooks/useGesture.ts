import { useRef, useCallback } from "react";
import {
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";

export interface GestureConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onRotate?: (rotation: number) => void;
  onTap?: () => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  swipeThreshold?: number;
  velocityThreshold?: number;
  longPressDelay?: number;
}

export const useGesture = (config: GestureConfig = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPinch,
    onRotate,
    onTap,
    onDoubleTap,
    onLongPress,
    swipeThreshold = 50,
    velocityThreshold = 0.3,
    longPressDelay = 500,
  } = config;

  const lastTap = useRef<number>(0);
  const longPressTimer = useRef<NodeJS.Timeout>();
  const initialDistance = useRef<number>(0);
  const initialAngle = useRef<number>(0);

  const calculateDistance = (
    touches: PanResponderGestureState["numberActiveTouches"] extends 2 
      ? [GestureResponderEvent, GestureResponderEvent] 
      : never
  ): number => {
    if (!touches || touches.length < 2) return 0;
    
    const [touch1, touch2] = touches;
    const dx = touch1.nativeEvent.pageX - touch2.nativeEvent.pageX;
    const dy = touch1.nativeEvent.pageY - touch2.nativeEvent.pageY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const calculateAngle = (
    touches: PanResponderGestureState["numberActiveTouches"] extends 2 
      ? [GestureResponderEvent, GestureResponderEvent] 
      : never
  ): number => {
    if (!touches || touches.length < 2) return 0;
    
    const [touch1, touch2] = touches;
    const dx = touch1.nativeEvent.pageX - touch2.nativeEvent.pageX;
    const dy = touch1.nativeEvent.pageY - touch2.nativeEvent.pageY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = undefined;
    }
  }, []);

  const panResponder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: (evt, gestureState) => {
      const now = Date.now();
      
      // Handle double tap
      if (onDoubleTap && now - lastTap.current < 300) {
        onDoubleTap();
        lastTap.current = 0;
        return;
      }
      
      lastTap.current = now;

      // Start long press timer
      if (onLongPress) {
        longPressTimer.current = setTimeout(() => {
          onLongPress();
        }, longPressDelay);
      }

      // Initialize multi-touch values
      if (gestureState.numberActiveTouches === 2) {
        // For pinch and rotate gestures
        // Note: This is simplified - real implementation would need touch event data
        initialDistance.current = 100; // Mock initial distance
        initialAngle.current = 0; // Mock initial angle
      }
    },

    onPanResponderMove: (evt, gestureState) => {
      clearLongPressTimer();

      // Handle pinch gesture
      if (gestureState.numberActiveTouches === 2 && onPinch) {
        const currentDistance = 120; // Mock current distance
        const scale = currentDistance / initialDistance.current;
        onPinch(scale);
      }

      // Handle rotate gesture
      if (gestureState.numberActiveTouches === 2 && onRotate) {
        const currentAngle = 15; // Mock current angle
        const rotation = currentAngle - initialAngle.current;
        onRotate(rotation);
      }
    },

    onPanResponderRelease: (evt, gestureState) => {
      clearLongPressTimer();

      const { dx, dy, vx, vy } = gestureState;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      const absVx = Math.abs(vx);
      const absVy = Math.abs(vy);

      // Check for swipe gestures
      if (absDx > swipeThreshold || absVx > velocityThreshold) {
        if (dx > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (dx < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      } else if (absDy > swipeThreshold || absVy > velocityThreshold) {
        if (dy > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (dy < 0 && onSwipeUp) {
          onSwipeUp();
        }
      } else if (absDx < 10 && absDy < 10 && onTap) {
        // Small movement, consider it a tap
        setTimeout(() => {
          if (Date.now() - lastTap.current >= 300) {
            onTap();
          }
        }, 300);
      }
    },

    onPanResponderTerminate: () => {
      clearLongPressTimer();
    },
  });

  return {
    panHandlers: panResponder.panHandlers,
    clearLongPressTimer,
  };
};

export default useGesture;
