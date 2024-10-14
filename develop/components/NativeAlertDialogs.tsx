import { Alert } from 'react-native';

export class NativeAlertDialogs {
  static showAlert(title: string, message: string) {
    Alert.alert(title, message);
  }
}
