import { Keyboard } from 'react-native';

export class KeyboardUtils {
  public static dismiss(): void {
    Keyboard.dismiss();
  }

  public static addListener(eventName: string, callback: (event: any) => void) {
    return Keyboard.addListener(eventName, callback);
  }

  public static removeListener(subscription: any): void {
    subscription?.remove();
  }
}

export default KeyboardUtils;
