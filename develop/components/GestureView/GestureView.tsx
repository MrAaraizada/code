import React from "react";
import { View, ViewStyle } from "react-native";
import { useGesture, GestureConfig } from "../../hooks/useGesture";

export interface GestureViewProps extends GestureConfig {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const GestureView: React.FC<GestureViewProps> = ({
  children,
  style,
  ...gestureConfig
}) => {
  const { panHandlers } = useGesture(gestureConfig);

  return (
    <View style={style} {...panHandlers}>
      {children}
    </View>
  );
};

export default GestureView;
