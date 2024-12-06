import { useState, useEffect } from "react";
import { AccessibilityManager, AccessibilityState } from "../accessibility/AccessibilityManager";

export const useAccessibility = () => {
  const [accessibilityState, setAccessibilityState] = useState<AccessibilityState>({
    isScreenReaderEnabled: false,
    isReduceMotionEnabled: false,
    isReduceTransparencyEnabled: false,
    isInvertColorsEnabled: false,
    isBoldTextEnabled: false,
    isGrayscaleEnabled: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const manager = AccessibilityManager.getInstance();

    const initializeAccessibility = async () => {
      try {
        await manager.initialize();
        setAccessibilityState(manager.getState());
      } catch (error) {
        console.error("Failed to initialize accessibility:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAccessibility();

    // Listen for accessibility changes
    const unsubscribe = manager.addListener((state) => {
      setAccessibilityState(state);
    });

    return unsubscribe;
  }, []);

  const announceForAccessibility = (message: string) => {
    const manager = AccessibilityManager.getInstance();
    manager.announceForAccessibility(message);
  };

  const setAccessibilityFocus = (reactTag: number) => {
    const manager = AccessibilityManager.getInstance();
    manager.setAccessibilityFocus(reactTag);
  };

  return {
    ...accessibilityState,
    loading,
    announceForAccessibility,
    setAccessibilityFocus,
    shouldUseReducedMotion: accessibilityState.isReduceMotionEnabled,
    shouldUseHighContrast: accessibilityState.isInvertColorsEnabled || accessibilityState.isGrayscaleEnabled,
    shouldUseBoldText: accessibilityState.isBoldTextEnabled,
  };
};

export default useAccessibility;
