import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  Animated,
  PanResponder,
  ActivityIndicator,
  Text,
  ViewStyle,
} from "react-native";

export interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  refreshing?: boolean;
  pullDistance?: number;
  refreshThreshold?: number;
  refreshIndicatorColor?: string;
  refreshText?: string;
  releaseText?: string;
  style?: ViewStyle;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  refreshing = false,
  pullDistance = 100,
  refreshThreshold = 60,
  refreshIndicatorColor = "#007AFF",
  refreshText = "Pull to refresh",
  releaseText = "Release to refresh",
  style,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullState, setPullState] = useState<"idle" | "pulling" | "ready" | "refreshing">("idle");
  
  const pullValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      // Only handle pull down when at the top of scroll view
      return gestureState.dy > 0 && gestureState.dy > Math.abs(gestureState.dx);
    },

    onPanResponderGrant: () => {
      if (!isRefreshing) {
        setPullState("pulling");
      }
    },

    onPanResponderMove: (_, gestureState) => {
      if (isRefreshing) return;

      const { dy } = gestureState;
      const pullDistance = Math.max(0, Math.min(dy * 0.5, pullDistance));
      
      pullValue.setValue(pullDistance);
      
      if (pullDistance >= refreshThreshold) {
        setPullState("ready");
      } else {
        setPullState("pulling");
      }
    },

    onPanResponderRelease: async (_, gestureState) => {
      if (isRefreshing) return;

      const { dy } = gestureState;
      const pullDistance = Math.max(0, Math.min(dy * 0.5, pullDistance));

      if (pullDistance >= refreshThreshold) {
        setPullState("refreshing");
        setIsRefreshing(true);
        
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
          setPullState("idle");
          
          Animated.spring(pullValue, {
            toValue: 0,
            useNativeDriver: false,
            tension: 100,
            friction: 8,
          }).start();
        }
      } else {
        setPullState("idle");
        Animated.spring(pullValue, {
          toValue: 0,
          useNativeDriver: false,
          tension: 100,
          friction: 8,
        }).start();
      }
    },
  });

  const renderRefreshIndicator = () => {
    const opacity = pullValue.interpolate({
      inputRange: [0, refreshThreshold],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    const rotation = pullValue.interpolate({
      inputRange: [0, refreshThreshold],
      outputRange: ["0deg", "180deg"],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: pullDistance,
          justifyContent: "center",
          alignItems: "center",
          opacity,
          transform: [{ translateY: pullValue }],
        }}
      >
        {pullState === "refreshing" || isRefreshing ? (
          <ActivityIndicator size="small" color={refreshIndicatorColor} />
        ) : (
          <Animated.View
            style={{
              transform: [{ rotate: rotation }],
            }}
          >
            <Text style={{ fontSize: 18, color: refreshIndicatorColor }}>â†“</Text>
          </Animated.View>
        )}
        
        <Text
          style={{
            marginTop: 8,
            fontSize: 14,
            color: "#666",
            textAlign: "center",
          }}
        >
          {pullState === "ready" ? releaseText : refreshText}
        </Text>
      </Animated.View>
    );
  };

  return (
    <View style={[{ flex: 1 }, style]}>
      {renderRefreshIndicator()}
      
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateY: pullValue }],
        }}
        {...panResponder.panHandlers}
      >
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={16}
        >
          {children}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default PullToRefresh;
