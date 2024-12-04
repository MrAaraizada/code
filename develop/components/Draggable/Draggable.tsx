import React, { useRef } from "react";
import { View, PanResponder, Animated, ViewStyle, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export interface DraggableProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onDragStart?: () => void;
  onDragEnd?: (x: number, y: number) => void;
  onDrag?: (x: number, y: number) => void;
  bounds?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
  snapToGrid?: {
    x: number;
    y: number;
  };
  disabled?: boolean;
}

export const Draggable: React.FC<DraggableProps> = ({
  children,
  style,
  onDragStart,
  onDragEnd,
  onDrag,
  bounds,
  snapToGrid,
  disabled = false,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const lastOffset = useRef({ x: 0, y: 0 });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,

    onPanResponderGrant: () => {
      onDragStart?.();
      pan.setOffset({
        x: lastOffset.current.x,
        y: lastOffset.current.y,
      });
      pan.setValue({ x: 0, y: 0 });
    },

    onPanResponderMove: (_, gestureState) => {
      let { dx, dy } = gestureState;

      // Apply bounds
      if (bounds) {
        const currentX = lastOffset.current.x + dx;
        const currentY = lastOffset.current.y + dy;

        if (bounds.left !== undefined && currentX < bounds.left) {
          dx = bounds.left - lastOffset.current.x;
        }
        if (bounds.right !== undefined && currentX > bounds.right) {
          dx = bounds.right - lastOffset.current.x;
        }
        if (bounds.top !== undefined && currentY < bounds.top) {
          dy = bounds.top - lastOffset.current.y;
        }
        if (bounds.bottom !== undefined && currentY > bounds.bottom) {
          dy = bounds.bottom - lastOffset.current.y;
        }
      }

      pan.setValue({ x: dx, y: dy });
      onDrag?.(lastOffset.current.x + dx, lastOffset.current.y + dy);
    },

    onPanResponderRelease: (_, gestureState) => {
      let { dx, dy } = gestureState;
      let finalX = lastOffset.current.x + dx;
      let finalY = lastOffset.current.y + dy;

      // Apply bounds to final position
      if (bounds) {
        if (bounds.left !== undefined && finalX < bounds.left) {
          finalX = bounds.left;
        }
        if (bounds.right !== undefined && finalX > bounds.right) {
          finalX = bounds.right;
        }
        if (bounds.top !== undefined && finalY < bounds.top) {
          finalY = bounds.top;
        }
        if (bounds.bottom !== undefined && finalY > bounds.bottom) {
          finalY = bounds.bottom;
        }
      }

      // Apply snap to grid
      if (snapToGrid) {
        finalX = Math.round(finalX / snapToGrid.x) * snapToGrid.x;
        finalY = Math.round(finalY / snapToGrid.y) * snapToGrid.y;
      }

      // Update last offset
      lastOffset.current = { x: finalX, y: finalY };

      // Animate to final position
      pan.flattenOffset();
      Animated.spring(pan, {
        toValue: { x: finalX, y: finalY },
        useNativeDriver: false,
      }).start();

      onDragEnd?.(finalX, finalY);
    },
  });

  return (
    <Animated.View
      style={[
        {
          transform: pan.getTranslateTransform(),
        },
        style,
      ]}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};

export default Draggable;
