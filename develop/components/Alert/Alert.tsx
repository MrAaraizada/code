import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  style?: any;
}

export const Alert: React.FC<AlertProps> = ({ 
  type = 'info', title, message, style 
}) => {
  return (
    <View style={[styles.alert, styles[type], style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: { padding: 16, borderRadius: 8, marginVertical: 8 },
  info: { backgroundColor: '#E3F2FD', borderLeftColor: '#2196F3', borderLeftWidth: 4 },
  success: { backgroundColor: '#E8F5E8', borderLeftColor: '#4CAF50', borderLeftWidth: 4 },
  warning: { backgroundColor: '#FFF3E0', borderLeftColor: '#FF9800', borderLeftWidth: 4 },
  error: { backgroundColor: '#FFEBEE', borderLeftColor: '#F44336', borderLeftWidth: 4 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  message: { fontSize: 14, lineHeight: 20 },
});

export default Alert;
