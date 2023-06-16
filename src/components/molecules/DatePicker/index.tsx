import React from 'react';
import DefaultDatePicker from 'antd/lib/date-picker';
import type { DatePickerProps } from './typings';

function DatePicker(props: DatePickerProps) {
  return <DefaultDatePicker {...props} />;
}

export default DatePicker;
