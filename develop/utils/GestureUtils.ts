import { Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export interface Point {
  x: number;
  y: number;
}

export interface Bounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export class GestureUtils {
  /**
   * Calculate distance between two points
   */
  static calculateDistance(point1: Point, point2: Point): number {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Calculate angle between two points in degrees
   */
  static calculateAngle(point1: Point, point2: Point): number {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }

  /**
   * Calculate velocity from distance and time
   */
  static calculateVelocity(distance: number, time: number): number {
    return time > 0 ? distance / time : 0;
  }

  /**
   * Determine swipe direction from gesture
   */
  static getSwipeDirection(
    dx: number,
    dy: number,
    threshold: number = 30
  ): "left" | "right" | "up" | "down" | null {
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (absDx < threshold && absDy < threshold) {
      return null;
    }

    if (absDx > absDy) {
      return dx > 0 ? "right" : "left";
    } else {
      return dy > 0 ? "down" : "up";
    }
  }

  /**
   * Clamp value within bounds
   */
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * Check if point is within bounds
   */
  static isPointInBounds(point: Point, bounds: Bounds): boolean {
    return (
      point.x >= bounds.left &&
      point.x <= bounds.right &&
      point.y >= bounds.top &&
      point.y <= bounds.bottom
    );
  }

  /**
   * Constrain point within bounds
   */
  static constrainToBounds(point: Point, bounds: Bounds): Point {
    return {
      x: this.clamp(point.x, bounds.left, bounds.right),
      y: this.clamp(point.y, bounds.top, bounds.bottom),
    };
  }

  /**
   * Get screen bounds
   */
  static getScreenBounds(): Bounds {
    return {
      left: 0,
      right: screenWidth,
      top: 0,
      bottom: screenHeight,
    };
  }

  /**
   * Snap value to grid
   */
  static snapToGrid(value: number, gridSize: number): number {
    return Math.round(value / gridSize) * gridSize;
  }

  /**
   * Snap point to grid
   */
  static snapPointToGrid(point: Point, gridSize: Point): Point {
    return {
      x: this.snapToGrid(point.x, gridSize.x),
      y: this.snapToGrid(point.y, gridSize.y),
    };
  }

  /**
   * Linear interpolation between two values
   */
  static lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
  }

  /**
   * Linear interpolation between two points
   */
  static lerpPoint(start: Point, end: Point, factor: number): Point {
    return {
      x: this.lerp(start.x, end.x, factor),
      y: this.lerp(start.y, end.y, factor),
    };
  }

  /**
   * Calculate momentum for physics-based animations
   */
  static calculateMomentum(
    velocity: number,
    deceleration: number = 0.998
  ): { distance: number; duration: number } {
    const distance = (velocity * velocity) / (2 * (1 - deceleration));
    const duration = velocity / (1 - deceleration);
    
    return {
      distance: Math.abs(distance),
      duration: Math.abs(duration),
    };
  }

  /**
   * Debounce function for gesture events
   */
  static debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  /**
   * Throttle function for gesture events
   */
  static throttle<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let lastCall = 0;
    
    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  }
}

export default GestureUtils;

// Updated: 2026-01-20 23:51:03 - feat(develop/components): enhance gesture view components
