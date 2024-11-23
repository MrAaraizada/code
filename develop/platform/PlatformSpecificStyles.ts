import { Platform, StyleSheet } from "react-native";

export const createPlatformStyles = <T extends Record<string, any>>(
  styles: T
): T => {
  const platformStyles: any = {};

  Object.keys(styles).forEach(key => {
    const style = styles[key];
    
    if (typeof style === "object" && style !== null) {
      platformStyles[key] = {
        ...style,
        ...Platform.select({
          ios: style.ios || {},
          android: style.android || {},
          web: style.web || {},
        }),
      };
      
      // Clean up platform-specific keys
      delete platformStyles[key].ios;
      delete platformStyles[key].android;
      delete platformStyles[key].web;
    } else {
      platformStyles[key] = style;
    }
  });

  return StyleSheet.create(platformStyles);
};

export const platformColors = {
  primary: Platform.select({
    ios: "#007AFF",
    android: "#2196F3",
    web: "#1976D2",
  }),
  background: Platform.select({
    ios: "#F2F2F7",
    android: "#FAFAFA",
    web: "#FFFFFF",
  }),
  surface: Platform.select({
    ios: "#FFFFFF",
    android: "#FFFFFF",
    web: "#F5F5F5",
  }),
  text: Platform.select({
    ios: "#000000",
    android: "#212121",
    web: "#333333",
  }),
  border: Platform.select({
    ios: "#C6C6C8",
    android: "#E0E0E0",
    web: "#DDDDDD",
  }),
};

export const platformShadows = {
  small: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    },
    android: {
      elevation: 3,
    },
    web: {
      boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    },
  }),
  medium: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 5,
    },
    web: {
      boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    },
  }),
};
