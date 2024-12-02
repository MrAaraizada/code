import React, { useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated";

export type AnimationType = 
  | "fadeIn" 
  | "fadeOut" 
  | "slideInLeft" 
  | "slideInRight" 
  | "slideInUp" 
  | "slideInDown"
  | "scaleIn" 
  | "scaleOut" 
  | "bounce" 
  | "pulse";

export interface AnimatedViewProps {
  children: React.ReactNode;
  animation: AnimationType;
  duration?: number;
  delay?: number;
  style?: ViewStyle;
  onAnimationComplete?: () => void;
}

export const AnimatedView: React.FC<AnimatedViewProps> = ({
  children,
  animation,
  duration = 300,
  delay = 0,
  style,
  onAnimationComplete,
}) => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    const runAnimation = () => {
      switch (animation) {
        case "fadeIn":
          opacity.value = withDelay(
            delay,
            withTiming(1, { duration }, onAnimationComplete)
          );
          break;

        case "fadeOut":
          opacity.value = withDelay(
            delay,
            withTiming(0, { duration }, onAnimationComplete)
          );
          break;

        case "slideInLeft":
          translateX.value = -100;
          opacity.value = 0;
          translateX.value = withDelay(delay, withSpring(0));
          opacity.value = withDelay(
            delay,
            withTiming(1, { duration }, onAnimationComplete)
          );
          break;

        case "slideInRight":
          translateX.value = 100;
          opacity.value = 0;
          translateX.value = withDelay(delay, withSpring(0));
          opacity.value = withDelay(
            delay,
            withTiming(1, { duration }, onAnimationComplete)
          );
          break;

        case "slideInUp":
          translateY.value = 100;
          opacity.value = 0;
          translateY.value = withDelay(delay, withSpring(0));
          opacity.value = withDelay(
            delay,
            withTiming(1, { duration }, onAnimationComplete)
          );
          break;

        case "slideInDown":
          translateY.value = -100;
          opacity.value = 0;
          translateY.value = withDelay(delay, withSpring(0));
          opacity.value = withDelay(
            delay,
            withTiming(1, { duration }, onAnimationComplete)
          );
          break;

        case "scaleIn":
          scale.value = 0;
          opacity.value = 0;
          scale.value = withDelay(delay, withSpring(1));
          opacity.value = withDelay(
            delay,
            withTiming(1, { duration }, onAnimationComplete)
          );
          break;

        case "scaleOut":
          scale.value = withDelay(
            delay,
            withTiming(0, { duration }, onAnimationComplete)
          );
          opacity.value = withDelay(delay, withTiming(0, { duration }));
          break;

        case "bounce":
          scale.value = withDelay(
            delay,
            withSequence(
              withTiming(1.2, { duration: duration / 2 }),
              withSpring(1, {}, onAnimationComplete)
            )
          );
          break;

        case "pulse":
          scale.value = withDelay(
            delay,
            withSequence(
              withTiming(1.1, { duration: duration / 2 }),
              withTiming(1, { duration: duration / 2 }, onAnimationComplete)
            )
          );
          break;
      }
    };

    runAnimation();
  }, [animation, duration, delay, onAnimationComplete]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedView;
