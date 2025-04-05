import { AccessibilityInfo } from "react-native";

export interface AccessibilityTestResult {
  hasAccessibilityLabel: boolean;
  hasAccessibilityHint: boolean;
  hasAccessibilityRole: boolean;
  isAccessible: boolean;
  hasProperContrast: boolean;
  hasFocusableElements: boolean;
  score: number;
}

export class AccessibilityTestUtils {
  public static async testComponentAccessibility(
    component: any
  ): Promise<AccessibilityTestResult> {
    const result: AccessibilityTestResult = {
      hasAccessibilityLabel: false,
      hasAccessibilityHint: false,
      hasAccessibilityRole: false,
      isAccessible: false,
      hasProperContrast: false,
      hasFocusableElements: false,
      score: 0,
    };

    // Check for accessibility properties
    if (component.props) {
      result.hasAccessibilityLabel = !!component.props.accessibilityLabel;
      result.hasAccessibilityHint = !!component.props.accessibilityHint;
      result.hasAccessibilityRole = !!component.props.accessibilityRole;
      result.isAccessible = component.props.accessible !== false;
    }

    // Check for proper contrast (simplified)
    result.hasProperContrast = this.checkColorContrast(component);

    // Check for focusable elements
    result.hasFocusableElements = this.checkFocusableElements(component);

    // Calculate score
    result.score = this.calculateAccessibilityScore(result);

    return result;
  }

  private static checkColorContrast(component: any): boolean {
    // Simplified contrast check
    // In a real implementation, this would analyze actual colors
    if (component.props && component.props.style) {
      const style = component.props.style;
      return !!(style.color && style.backgroundColor);
    }
    return true; // Assume good contrast if no specific colors set
  }

  private static checkFocusableElements(component: any): boolean {
    // Check if component or children are focusable
    if (component.props) {
      if (component.props.focusable || 
          component.props.accessible || 
          component.props.onPress) {
        return true;
      }
    }
    return false;
  }

  private static calculateAccessibilityScore(result: AccessibilityTestResult): number {
    let score = 0;
    
    if (result.hasAccessibilityLabel) score += 25;
    if (result.hasAccessibilityRole) score += 20;
    if (result.isAccessible) score += 20;
    if (result.hasProperContrast) score += 20;
    if (result.hasFocusableElements) score += 10;
    if (result.hasAccessibilityHint) score += 5;

    return score;
  }

  public static async isScreenReaderEnabled(): Promise<boolean> {
    try {
      return await AccessibilityInfo.isScreenReaderEnabled();
    } catch {
      return false;
    }
  }

  public static announceForAccessibility(message: string): void {
    AccessibilityInfo.announceForAccessibility(message);
  }

  public static generateAccessibilityReport(
    results: AccessibilityTestResult[]
  ): string {
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    const averageScore = totalScore / results.length;

    let report = "Accessibility Test Report\n";
    report += "=========================\n\n";
    report += `Average Score: ${averageScore.toFixed(1)}/100\n`;
    report += `Components Tested: ${results.length}\n\n`;

    results.forEach((result, index) => {
      report += `Component ${index + 1}: ${result.score}/100\n`;
      if (!result.hasAccessibilityLabel) report += "  âš ï¸  Missing accessibility label\n";
      if (!result.hasAccessibilityRole) report += "  âš ï¸  Missing accessibility role\n";
      if (!result.hasProperContrast) report += "  âš ï¸  Poor color contrast\n";
      if (!result.hasFocusableElements) report += "  âš ï¸  No focusable elements\n";
    });

    return report;
  }
}

// Updated: 2026-01-20 23:51:07 - test(develop/testing): add accessibility testing utilities

// Updated: 2026-01-21 00:00:53 - test(develop/testing): add accessibility test utilities
