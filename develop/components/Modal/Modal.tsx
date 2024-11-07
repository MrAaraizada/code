import React from 'react';
import { Modal as RNModal, View, StyleSheet } from 'react-native';

interface ModalProps {
  visible: boolean;
  onRequestClose?: () => void;
  animationType?: 'none' | 'slide' | 'fade';
  transparent?: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ 
  visible, onRequestClose, animationType = 'slide', transparent = false, children 
}) => {
  return (
    <RNModal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType={animationType}
      transparent={transparent}
    >
      <View style={[styles.container, transparent && styles.transparent]}>
        {children}
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  transparent: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
});

export default Modal;
