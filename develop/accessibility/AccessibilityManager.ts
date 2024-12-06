import { AccessibilityInfo, Platform } from "react-native";

export interface AccessibilityState {
  isScreenReaderEnabled: boolean;
  isReduceMotionEnabled: boolean;
  isReduceTransparencyEnabled: boolean;
  isInvertColorsEnabled: boolean;
  isBoldTextEnabled: boolean;
  isGrayscaleEnabled: boolean;
}

export class AccessibilityManager {
  private static instance: AccessibilityManager;
  private listeners: ((state: AccessibilityState) => void)[] = [];
  private currentState: AccessibilityState = {
    isScreenReaderEnabled: false,
    isReduceMotionEnabled: false,
    isReduceTransparencyEnabled: false,
    isInvertColorsEnabled: false,
    isBoldTextEnabled: false,
    isGrayscaleEnabled: false,
  };

  public static getInstance(): AccessibilityManager {
    if (!AccessibilityManager.instance) {
      AccessibilityManager.instance = new AccessibilityManager();
    }
    return AccessibilityManager.instance;
  }

  public async initialize(): Promise<void> {
    try {
      // Check screen reader status
      const isScreenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled();
      
      // Check reduce motion (iOS only)
      let isReduceMotionEnabled = false;
      if (Platform.OS === "ios") {
        isReduceMotionEnabled = await AccessibilityInfo.isReduceMotionEnabled();
      }

      // Check reduce transparency (iOS only)
      let isReduceTransparencyEnabled = false;
      if (Platform.OS === "ios") {
        isReduceTransparencyEnabled = await AccessibilityInfo.isReduceTransparencyEnabled();
      }

      // Check invert colors (iOS only)
      let isInvertColorsEnabled = false;
      if (Platform.OS === "ios") {
        isInvertColorsEnabled = await AccessibilityInfo.isInvertColorsEnabled();
      }

      // Check bold text (iOS only)
      let isBoldTextEnabled = false;
      if (Platform.OS === "ios") {
        isBoldTextEnabled = await AccessibilityInfo.isBoldTextEnabled();
      }

      // Check grayscale (iOS only)
      let isGrayscaleEnabled = false;
      if (Platform.OS === "ios") {
        isGrayscaleEnabled = await AccessibilityInfo.isGrayscaleEnabled();
      }

      this.currentState = {
        isScreenReaderEnabled,
        isReduceMotionEnabled,
        isReduceTransparencyEnabled,
        isInvertColorsEnabled,
        isBoldTextEnabled,
        isGrayscaleEnabled,
      };

      this.setupListeners();
    } catch (error) {
      console.error("Failed to initialize accessibility manager:", error);
    }
  }

  private setupListeners(): void {
    // Screen reader change listener
    AccessibilityInfo.addEventListener("screenReaderChanged", (isEnabled) => {
      this.updateState({ isScreenReaderEnabled: isEnabled });
    });

    // Reduce motion change listener (iOS only)
    if (Platform.OS === "ios") {
      AccessibilityInfo.addEventListener("reduceMotionChanged", (isEnabled) => {
        this.updateState({ isReduceMotionEnabled: isEnabled });
      });

      AccessibilityInfo.addEventListener("reduceTransparencyChanged", (isEnabled) => {
        this.updateState({ isReduceTransparencyEnabled: isEnabled });
      });

      AccessibilityInfo.addEventListener("invertColorsChanged", (isEnabled) => {
        this.updateState({ isInvertColorsEnabled: isEnabled });
      });

      AccessibilityInfo.addEventListener("boldTextChanged", (isEnabled) => {
        this.updateState({ isBoldTextEnabled: isEnabled });
      });

      AccessibilityInfo.addEventListener("grayscaleChanged", (isEnabled) => {
        this.updateState({ isGrayscaleEnabled: isEnabled });
      });
    }
  }

  private updateState(updates: Partial<AccessibilityState>): void {
    this.currentState = { ...this.currentState, ...updates };
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentState));
  }

  public getState(): AccessibilityState {
    return { ...this.currentState };
  }

  public addListener(listener: (state: AccessibilityState) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  public isScreenReaderEnabled(): boolean {
    return this.currentState.isScreenReaderEnabled;
  }

  public isReduceMotionEnabled(): boolean {
    return this.currentState.isReduceMotionEnabled;
  }

  public isReduceTransparencyEnabled(): boolean {
    return this.currentState.isReduceTransparencyEnabled;
  }

  public shouldUseReducedMotion(): boolean {
    return this.currentState.isReduceMotionEnabled;
  }

  public shouldUseHighContrast(): boolean {
    return this.currentState.isInvertColorsEnabled || this.currentState.isGrayscaleEnabled;
  }

  public shouldUseBoldText(): boolean {
    return this.currentState.isBoldTextEnabled;
  }

  public announceForAccessibility(message: string): void {
    AccessibilityInfo.announceForAccessibility(message);
  }

  public setAccessibilityFocus(reactTag: number): void {
    AccessibilityInfo.setAccessibilityFocus(reactTag);
  }
}

export default AccessibilityManager;
