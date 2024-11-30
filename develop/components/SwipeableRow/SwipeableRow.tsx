import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  ViewStyle,
} from "react-native";

export interface SwipeAction {
  text: string;
  backgroundColor: string;
  color?: string;
  onPress: () => void;
  width?: number;
}

export interface SwipeableRowProps {
  children: React.ReactNode;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
  swipeThreshold?: number;
  style?: ViewStyle;
}

const { width: screenWidth } = Dimensions.get("window");

export const SwipeableRow: React.FC<SwipeableRowProps> = ({
  children,
  leftActions = [],
  rightActions = [],
  onSwipeStart,
  onSwipeEnd,
  swipeThreshold = 0.3,
  style,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const rowRef = useRef<View>(null);

  const leftActionsWidth = leftActions.reduce((sum, action) => sum + (action.width || 80), 0);
  const rightActionsWidth = rightActions.reduce((sum, action) => sum + (action.width || 80), 0);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
    },

    onPanResponderGrant: () => {
      onSwipeStart?.();
    },

    onPanResponderMove: (_, gestureState) => {
      let newTranslateX = gestureState.dx;

      // Limit swipe distance
      if (newTranslateX > leftActionsWidth) {
        newTranslateX = leftActionsWidth;
      } else if (newTranslateX < -rightActionsWidth) {
        newTranslateX = -rightActionsWidth;
      }

      translateX.setValue(newTranslateX);
    },

    onPanResponderRelease: (_, gestureState) => {
      const { dx, vx } = gestureState;
      const swipeDistance = Math.abs(dx);
      const swipeVelocity = Math.abs(vx);

      let finalPosition = 0;

      if (dx > 0 && leftActions.length > 0) {
        // Swiping right
        if (swipeDistance > leftActionsWidth * swipeThreshold || swipeVelocity > 0.5) {
          finalPosition = leftActionsWidth;
        }
      } else if (dx < 0 && rightActions.length > 0) {
        // Swiping left
        if (swipeDistance > rightActionsWidth * swipeThreshold || swipeVelocity > 0.5) {
          finalPosition = -rightActionsWidth;
        }
      }

      Animated.spring(translateX, {
        toValue: finalPosition,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start(() => {
        onSwipeEnd?.();
      });
    },
  });

  const renderActions = (actions: SwipeAction[], isLeft: boolean) => {
    if (actions.length === 0) return null;

    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          [isLeft ? "left" : "right"]: 0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: action.backgroundColor,
              width: action.width || 80,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              action.onPress();
              // Reset position after action
              Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            }}
          >
            <Text
              style={{
                color: action.color || "white",
                fontWeight: "600",
                fontSize: 14,
              }}
            >
              {action.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={[{ overflow: "hidden" }, style]}>
      {renderActions(leftActions, true)}
      {renderActions(rightActions, false)}
      
      <Animated.View
        ref={rowRef}
        style={{
          transform: [{ translateX }],
          backgroundColor: "white",
        }}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default SwipeableRow;
