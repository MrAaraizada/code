import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  ViewStyle,
  TextStyle,
} from "react-native";

export interface FABAction {
  label: string;
  icon?: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export interface FloatingActionButtonProps {
  icon?: React.ReactNode;
  onPress?: () => void;
  actions?: FABAction[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  size?: "small" | "medium" | "large";
  backgroundColor?: string;
  iconColor?: string;
  style?: ViewStyle;
  animated?: boolean;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onPress,
  actions = [],
  position = "bottom-right",
  size = "medium",
  backgroundColor = "#007AFF",
  iconColor = "white",
  style,
  animated = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const rotationValue = useRef(new Animated.Value(0)).current;

  const sizeMap = {
    small: 48,
    medium: 56,
    large: 64,
  };

  const fabSize = sizeMap[size];

  const getPositionStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      position: "absolute",
      zIndex: 1000,
    };

    switch (position) {
      case "bottom-right":
        return { ...baseStyle, bottom: 16, right: 16 };
      case "bottom-left":
        return { ...baseStyle, bottom: 16, left: 16 };
      case "top-right":
        return { ...baseStyle, top: 16, right: 16 };
      case "top-left":
        return { ...baseStyle, top: 16, left: 16 };
      default:
        return { ...baseStyle, bottom: 16, right: 16 };
    }
  };

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;
    
    if (animated) {
      Animated.parallel([
        Animated.spring(animationValue, {
          toValue,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.spring(rotationValue, {
          toValue,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
      ]).start();
    }
    
    setIsExpanded(!isExpanded);
  };

  const handleMainPress = () => {
    if (actions.length > 0) {
      toggleExpanded();
    } else {
      onPress?.();
    }
  };

  const renderActions = () => {
    if (actions.length === 0) return null;

    return actions.map((action, index) => {
      const translateY = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -(fabSize + 16) * (index + 1)],
      });

      const opacity = animationValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1],
      });

      const scale = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      });

      return (
        <Animated.View
          key={index}
          style={{
            position: "absolute",
            transform: [
              { translateY },
              { scale },
            ],
            opacity,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {action.label && (
              <View
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 4,
                  marginRight: 12,
                }}
              >
                <Text
                  style={[
                    {
                      color: "white",
                      fontSize: 14,
                      fontWeight: "500",
                    },
                    action.labelStyle,
                  ]}
                >
                  {action.label}
                </Text>
              </View>
            )}
            
            <TouchableOpacity
              style={[
                {
                  width: fabSize * 0.8,
                  height: fabSize * 0.8,
                  borderRadius: (fabSize * 0.8) / 2,
                  backgroundColor: backgroundColor,
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 4,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                },
                action.style,
              ]}
              onPress={() => {
                action.onPress();
                toggleExpanded();
              }}
            >
              {action.icon}
            </TouchableOpacity>
          </View>
        </Animated.View>
      );
    });
  };

  const rotation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
    <View style={[getPositionStyle(), style]}>
      {renderActions()}
      
      <TouchableOpacity
        style={{
          width: fabSize,
          height: fabSize,
          borderRadius: fabSize / 2,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
          elevation: 6,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
        }}
        onPress={handleMainPress}
        activeOpacity={0.8}
      >
        <Animated.View
          style={{
            transform: [{ rotate: actions.length > 0 ? rotation : "0deg" }],
          }}
        >
          {icon || (
            <Text style={{ color: iconColor, fontSize: 24, fontWeight: "bold" }}>
              +
            </Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingActionButton;
