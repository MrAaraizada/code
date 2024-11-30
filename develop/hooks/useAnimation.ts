import { useRef, useCallback } from "react";
import { Animated, Easing } from "react-native";

export interface AnimationConfig {
  duration?: number;
  easing?: (value: number) => number;
  useNativeDriver?: boolean;
  delay?: number;
}

export interface SpringConfig {
  tension?: number;
  friction?: number;
  useNativeDriver?: boolean;
  delay?: number;
}

export const useAnimation = (initialValue: number = 0) => {
  const animatedValue = useRef(new Animated.Value(initialValue)).current;

  const animate = useCallback((
    toValue: number,
    config: AnimationConfig = {}
  ): Promise<void> => {
    const {
      duration = 300,
      easing = Easing.inOut(Easing.ease),
      useNativeDriver = true,
      delay = 0,
    } = config;

    return new Promise((resolve) => {
      Animated.timing(animatedValue, {
        toValue,
        duration,
        easing,
        useNativeDriver,
        delay,
      }).start(() => resolve());
    });
  }, [animatedValue]);

  const spring = useCallback((
    toValue: number,
    config: SpringConfig = {}
  ): Promise<void> => {
    const {
      tension = 100,
      friction = 8,
      useNativeDriver = true,
      delay = 0,
    } = config;

    return new Promise((resolve) => {
      Animated.spring(animatedValue, {
        toValue,
        tension,
        friction,
        useNativeDriver,
        delay,
      }).start(() => resolve());
    });
  }, [animatedValue]);

  const sequence = useCallback((
    animations: Array<{
      toValue: number;
      config?: AnimationConfig;
    }>
  ): Promise<void> => {
    return new Promise((resolve) => {
      const animationSequence = animations.map(({ toValue, config = {} }) =>
        Animated.timing(animatedValue, {
          toValue,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
          ...config,
        })
      );

      Animated.sequence(animationSequence).start(() => resolve());
    });
  }, [animatedValue]);

  const loop = useCallback((
    toValue: number,
    config: AnimationConfig & { iterations?: number } = {}
  ) => {
    const {
      duration = 1000,
      easing = Easing.linear,
      useNativeDriver = true,
      iterations = -1, // -1 for infinite
    } = config;

    const animation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue,
        duration,
        easing,
        useNativeDriver,
      }),
      { iterations }
    );

    animation.start();
    return animation;
  }, [animatedValue]);

  const reset = useCallback((value: number = initialValue) => {
    animatedValue.setValue(value);
  }, [animatedValue, initialValue]);

  const stop = useCallback(() => {
    animatedValue.stopAnimation();
  }, [animatedValue]);

  return {
    value: animatedValue,
    animate,
    spring,
    sequence,
    loop,
    reset,
    stop,
  };
};

export default useAnimation;
