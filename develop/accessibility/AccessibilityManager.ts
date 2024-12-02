import { AccessibilityInfo, findNodeHandle } from 'react-native';

export class AccessibilityManager {
  private static instance: AccessibilityManager;

  public static getInstance(): AccessibilityManager {
    if (!AccessibilityManager.instance) {
      AccessibilityManager.instance = new AccessibilityManager();
    }
    return AccessibilityManager.instance;
  }

  public async isScreenReaderEnabled(): Promise<boolean> {
    return AccessibilityInfo.isScreenReaderEnabled();
  }

  public async isReduceMotionEnabled(): Promise<boolean> {
    return AccessibilityInfo.isReduceMotionEnabled();
  }

  public announceForAccessibility(message: string): void {
    AccessibilityInfo.announceForAccessibility(message);
  }

  public setAccessibilityFocus(reactTag: any): void {
    AccessibilityInfo.setAccessibilityFocus(findNodeHandle(reactTag));
  }

  public addEventListener(eventName: string, handler: (event: any) => void) {
    return AccessibilityInfo.addEventListener(eventName, handler);
  }

  public removeEventListener(eventName: string, handler: (event: any) => void) {
    AccessibilityInfo.removeEventListener(eventName, handler);
  }

  public getAccessibilityLabel(text: string, role?: string): string {
    if (role) {
      return `${text}, ${role}`;
    }
    return text;
  }

  public getAccessibilityHint(action: string): string {
    return `Double tap to ${action}`;
  }

  public validateAccessibility(component: any): {
    isValid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];

    if (!component.accessibilityLabel && !component.children) {
      issues.push('Component missing accessibility label');
    }

    if (component.onPress && !component.accessibilityRole) {
      issues.push('Interactive component missing accessibility role');
    }

    if (component.disabled && !component.accessibilityState?.disabled) {
      issues.push('Disabled component not properly marked for accessibility');
    }

    return {
      isValid: issues.length === 0,
      issues,
    };
  }
}

export default AccessibilityManager;
