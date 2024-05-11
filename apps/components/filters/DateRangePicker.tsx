import React from 'react';

interface DateRangePickerProps {
  children?: React.ReactNode;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default DateRangePicker;
