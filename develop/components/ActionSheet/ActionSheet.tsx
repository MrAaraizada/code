import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ActionSheetOption {
  title: string;
  onPress: () => void;
  destructive?: boolean;
}

interface ActionSheetProps {
  visible: boolean;
  options: ActionSheetOption[];
  onCancel?: () => void;
  title?: string;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({ 
  visible, options, onCancel, title 
}) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.actionSheet}>
        {title && <Text style={styles.title}>{title}</Text>}
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.option, option.destructive && styles.destructive]}
            onPress={option.onPress}
          >
            <Text style={[styles.optionText, option.destructive && styles.destructiveText]}>
              {option.title}
            </Text>
          </TouchableOpacity>
        ))}
        {onCancel && (
          <TouchableOpacity style={styles.cancel} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' },
  actionSheet: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  title: { fontSize: 16, fontWeight: '600', textAlign: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  option: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  optionText: { fontSize: 16, textAlign: 'center' },
  destructive: { backgroundColor: '#FFEBEE' },
  destructiveText: { color: '#F44336' },
  cancel: { padding: 16, backgroundColor: '#F5F5F5' },
  cancelText: { fontSize: 16, textAlign: 'center', fontWeight: '600' },
});

export default ActionSheet;
