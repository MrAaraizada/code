import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export const NativeDatePicker = () => {
  return <DateTimePicker value={new Date()} mode='date' />;
};
