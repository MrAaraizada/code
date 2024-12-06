import React, { forwardRef } from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { useAccessibility } from "../../hooks/useAccessibility";

export interface AccessibleTextProps extends TextProps {
  children: React.ReactNode;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: "text" | "header" | "link" | "button";
  adjustsFontSizeToFit?: boolean;
  allowFontScaling?: boolean;
  minimumFontScale?: number;
  maxFontSizeMultiplier?: number;
  style?: TextStyle;
}

export const AccessibleText = forwardRef<Text, AccessibleTextProps>(({
  children,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = "text",
  adjustsFontSizeToFit = true,
  allowFontScaling = true,
  minimumFontScale = 0.5,
  maxFontSizeMultiplier = 3,
  style,
  ...props
}, ref) => {
  const { 
    isScreenReaderEnabled, 
    shouldUseHighContrast, 
    shouldUseBoldText 
  } = useAccessibility();

  // Adjust text styles based on accessibility preferences
  const accessibleStyle: TextStyle = {
    ...style,
    ...(shouldUseBoldText && {
      fontWeight: "bold",
    }),
    ...(shouldUseHighContrast && {
      color: style?.color || "#000",
      textShadowColor: "transparent",
    }),
  };

  return (
    <Text
      ref={ref}
      accessible={true}
      accessibilityLabel={accessibilityLabel || (typeof children === "string" ? children : undefined)}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      allowFontScaling={allowFontScaling}
      minimumFontScale={minimumFontScale}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      style={accessibleStyle}
      {...props}
    >
      {children}
    </Text>
  );
});

AccessibleText.displayName = "AccessibleText";

export default AccessibleText;
