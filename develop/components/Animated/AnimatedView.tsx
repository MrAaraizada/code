import React from 'react';
import { Animated, ViewStyle } from 'react-native';

interface AnimatedViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  animationType?: 'fadeIn' | 'slideIn' | 'scaleIn';
  duration?: number;
  delay?: number;
}

export const AnimatedView: React.FC<AnimatedViewProps> = ({
  children,
  style,
  animationType = 'fadeIn',
  duration = 300,
  delay = 0,
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, duration, delay]);

  const getAnimatedStyle = () => {
    switch (animationType) {
      case 'fadeIn':
        return { opacity: animatedValue };
      case 'slideIn':
        return {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        };
      case 'scaleIn':
        return {
          opacity: animatedValue,
          transform: [{ scale: animatedValue }],
        };
      default:
        return { opacity: animatedValue };
    }
  };

  return (
    <Animated.View style={[style, getAnimatedStyle()]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedView;
