import React, { forwardRef } from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import { useAccessibility } from "../../hooks/useAccessibility";

export interface AccessibleViewProps extends ViewProps {
  children: React.ReactNode;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 
    | "none" 
    | "button" 
    | "link" 
    | "search" 
    | "image" 
    | "keyboardkey" 
    | "text" 
    | "adjustable" 
    | "imagebutton" 
    | "header" 
    | "summary" 
    | "alert" 
    | "checkbox" 
    | "combobox" 
    | "menu" 
    | "menubar" 
    | "menuitem" 
    | "progressbar" 
    | "radio" 
    | "radiogroup" 
    | "scrollbar" 
    | "spinbutton" 
    | "switch" 
    | "tab" 
    | "tablist" 
    | "timer" 
    | "toolbar";
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | "mixed";
    busy?: boolean;
    expanded?: boolean;
  };
  accessibilityValue?: {
    min?: number;
    max?: number;
    now?: number;
    text?: string;
  };
  accessibilityActions?: Array<{
    name: string;
    label?: string;
  }>;
  onAccessibilityAction?: (event: { nativeEvent: { actionName: string } }) => void;
  focusable?: boolean;
  importantForAccessibility?: "auto" | "yes" | "no" | "no-hide-descendants";
  style?: ViewStyle;
}

export const AccessibleView = forwardRef<View, AccessibleViewProps>(({
  children,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
  accessibilityState,
  accessibilityValue,
  accessibilityActions,
  onAccessibilityAction,
  focusable,
  importantForAccessibility = "auto",
  style,
  ...props
}, ref) => {
  const { 
    isScreenReaderEnabled, 
    shouldUseHighContrast, 
    shouldUseBoldText 
  } = useAccessibility();

  // Adjust styles based on accessibility preferences
  const accessibleStyle: ViewStyle = {
    ...style,
    ...(shouldUseHighContrast && {
      borderWidth: style?.borderWidth || 1,
      borderColor: style?.borderColor || "#000",
    }),
  };

  return (
    <View
      ref={ref}
      accessible={!!accessibilityLabel || !!accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      accessibilityValue={accessibilityValue}
      accessibilityActions={accessibilityActions}
      onAccessibilityAction={onAccessibilityAction}
      focusable={focusable}
      importantForAccessibility={importantForAccessibility}
      style={accessibleStyle}
      {...props}
    >
      {children}
    </View>
  );
});

AccessibleView.displayName = "AccessibleView";

export default AccessibleView;
