import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, PanGestureHandler } from 'react-native';

interface SwipeAction {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  color?: string;
}

interface SwipeableRowProps {
  children: React.ReactNode;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  onSwipe?: (direction: 'left' | 'right') => void;
}

export const SwipeableRow: React.FC<SwipeableRowProps> = ({
  children,
  leftActions = [],
  rightActions = [],
  onSwipe,
}) => {
  const translateX = React.useRef(new Animated.Value(0)).current;

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    const { translationX } = event.nativeEvent;
    
    if (Math.abs(translationX) > 100) {
      const direction = translationX > 0 ? 'right' : 'left';
      onSwipe?.(direction);
    }

    // Reset position
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Left Actions */}
      {leftActions.length > 0 && (
        <View style={[styles.actionsContainer, styles.leftActions]}>
          {leftActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.action, { backgroundColor: action.backgroundColor || '#007AFF' }]}
              onPress={action.onPress}
            >
              <Text style={[styles.actionText, { color: action.color || '#FFFFFF' }]}>
                {action.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Main Content */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.content,
            { transform: [{ translateX }] },
          ]}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>

      {/* Right Actions */}
      {rightActions.length > 0 && (
        <View style={[styles.actionsContainer, styles.rightActions]}>
          {rightActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.action, { backgroundColor: action.backgroundColor || '#FF3B30' }]}
              onPress={action.onPress}
            >
              <Text style={[styles.actionText, { color: action.color || '#FFFFFF' }]}>
                {action.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'relative' },
  content: { backgroundColor: '#FFFFFF', zIndex: 1 },
  actionsContainer: { position: 'absolute', top: 0, bottom: 0, flexDirection: 'row' },
  leftActions: { left: 0 },
  rightActions: { right: 0 },
  action: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  actionText: { fontSize: 16, fontWeight: '600' },
});

export default SwipeableRow;
