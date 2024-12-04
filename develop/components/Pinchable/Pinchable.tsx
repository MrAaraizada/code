import React, { useRef } from "react";
import { View, ViewStyle } from "react-native";
import {
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

export interface PinchableProps {
  children: React.ReactNode;
  minScale?: number;
  maxScale?: number;
  onPinchStart?: () => void;
  onPinchEnd?: (scale: number) => void;
  onRotationStart?: () => void;
  onRotationEnd?: (rotation: number) => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export const Pinchable: React.FC<PinchableProps> = ({
  children,
  minScale = 0.5,
  maxScale = 3,
  onPinchStart,
  onPinchEnd,
  onRotationStart,
  onRotationEnd,
  style,
  disabled = false,
}) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const baseScale = useSharedValue(1);
  const baseRotation = useSharedValue(0);

  const pinchRef = useRef();
  const rotationRef = useRef();

  const pinchHandler = useAnimatedGestureHandler({
    onStart: () => {
      baseScale.value = scale.value;
      if (onPinchStart) {
        onPinchStart();
      }
    },
    onActive: (event) => {
      const newScale = baseScale.value * event.scale;
      scale.value = Math.min(Math.max(newScale, minScale), maxScale);
    },
    onEnd: () => {
      if (onPinchEnd) {
        onPinchEnd(scale.value);
      }
    },
  });

  const rotationHandler = useAnimatedGestureHandler({
    onStart: () => {
      baseRotation.value = rotation.value;
      if (onRotationStart) {
        onRotationStart();
      }
    },
    onActive: (event) => {
      rotation.value = baseRotation.value + event.rotation;
    },
    onEnd: () => {
      if (onRotationEnd) {
        onRotationEnd(rotation.value);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}rad` },
    ],
  }));

  const reset = () => {
    scale.value = withSpring(1);
    rotation.value = withSpring(0);
    baseScale.value = 1;
    baseRotation.value = 0;
  };

  if (disabled) {
    return <View style={style}>{children}</View>;
  }

  return (
    <View style={style}>
      <RotationGestureHandler
        ref={rotationRef}
        simultaneousHandlers={pinchRef}
        onGestureEvent={rotationHandler}
      >
        <Animated.View>
          <PinchGestureHandler
            ref={pinchRef}
            simultaneousHandlers={rotationRef}
            onGestureEvent={pinchHandler}
          >
            <Animated.View style={animatedStyle}>
              {children}
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </RotationGestureHandler>
    </View>
  );
};

export default Pinchable;
