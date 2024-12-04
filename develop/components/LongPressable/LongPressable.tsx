import React, { useRef, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  ViewStyle,
} from "react-native";

export interface LongPressableProps {
  children: React.ReactNode;
  onLongPress: () => void;
  onPress?: () => void;
  delayLongPress?: number;
  style?: ViewStyle;
  disabled?: boolean;
  hapticFeedback?: boolean;
  scaleOnPress?: boolean;
}

export const LongPressable: React.FC<LongPressableProps> = ({
  children,
  onLongPress,
  onPress,
  delayLongPress = 500,
  style,
  disabled = false,
  hapticFeedback = true,
  scaleOnPress = true,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isLongPressed, setIsLongPressed] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const longPressTimer = useRef<NodeJS.Timeout>();

  const startLongPressTimer = () => {
    longPressTimer.current = setTimeout(() => {
      setIsLongPressed(true);
      if (hapticFeedback) {
        // Haptic feedback would be implemented here
        // HapticFeedback.impact(HapticFeedbackTypes.impactMedium);
      }
      onLongPress();
    }, delayLongPress);
  };

  const clearLongPressTimer = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = undefined;
    }
  };

  const handlePressIn = () => {
    if (disabled) return;

    setIsPressed(true);
    setIsLongPressed(false);
    
    if (scaleOnPress) {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }).start();
    }

    startLongPressTimer();
  };

  const handlePressOut = () => {
    if (disabled) return;

    setIsPressed(false);
    clearLongPressTimer();

    if (scaleOnPress) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }).start();
    }

    // Only trigger onPress if it wasn\'t a long press
    if (!isLongPressed && onPress) {
      onPress();
    }
    
    setIsLongPressed(false);
  };

  const animatedStyle = scaleOnPress ? {
    transform: [{ scale: scaleValue }],
  } : {};

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View style={[style, animatedStyle]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default LongPressable;
