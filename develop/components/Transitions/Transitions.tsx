import React, { useState, useEffect } from "react";
import { View, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  Easing,
} from "react-native-reanimated";

export type TransitionType = "fade" | "slide" | "scale" | "flip";

export interface TransitionProps {
  children: React.ReactNode;
  visible: boolean;
  type?: TransitionType;
  duration?: number;
  style?: ViewStyle;
  onTransitionComplete?: (visible: boolean) => void;
}

export const Transition: React.FC<TransitionProps> = ({
  children,
  visible,
  type = "fade",
  duration = 300,
  style,
  onTransitionComplete,
}) => {
  const [shouldRender, setShouldRender] = useState(visible);
  
  const opacity = useSharedValue(visible ? 1 : 0);
  const translateY = useSharedValue(visible ? 0 : 50);
  const scale = useSharedValue(visible ? 1 : 0.8);
  const rotateY = useSharedValue(visible ? 0 : 90);

  const handleAnimationComplete = (isVisible: boolean) => {
    if (!isVisible) {
      setShouldRender(false);
    }
    onTransitionComplete?.(isVisible);
  };

  useEffect(() => {
    if (visible && !shouldRender) {
      setShouldRender(true);
    }

    const config = {
      duration,
      easing: Easing.out(Easing.cubic),
    };

    switch (type) {
      case "fade":
        opacity.value = withTiming(
          visible ? 1 : 0,
          config,
          (finished) => {
            if (finished) {
              runOnJS(handleAnimationComplete)(visible);
            }
          }
        );
        break;

      case "slide":
        opacity.value = withTiming(visible ? 1 : 0, config);
        translateY.value = withTiming(
          visible ? 0 : 50,
          config,
          (finished) => {
            if (finished) {
              runOnJS(handleAnimationComplete)(visible);
            }
          }
        );
        break;

      case "scale":
        opacity.value = withTiming(visible ? 1 : 0, config);
        scale.value = withSpring(
          visible ? 1 : 0.8,
          {
            damping: 15,
            stiffness: 150,
          },
          (finished) => {
            if (finished) {
              runOnJS(handleAnimationComplete)(visible);
            }
          }
        );
        break;

      case "flip":
        opacity.value = withTiming(visible ? 1 : 0, config);
        rotateY.value = withTiming(
          visible ? 0 : 90,
          config,
          (finished) => {
            if (finished) {
              runOnJS(handleAnimationComplete)(visible);
            }
          }
        );
        break;
    }
  }, [visible, type, duration]);

  const animatedStyle = useAnimatedStyle(() => {
    const baseStyle = {
      opacity: opacity.value,
    };

    switch (type) {
      case "slide":
        return {
          ...baseStyle,
          transform: [{ translateY: translateY.value }],
        };
      case "scale":
        return {
          ...baseStyle,
          transform: [{ scale: scale.value }],
        };
      case "flip":
        return {
          ...baseStyle,
          transform: [{ rotateY: `${rotateY.value}deg` }],
        };
      default:
        return baseStyle;
    }
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

export default Transition;
