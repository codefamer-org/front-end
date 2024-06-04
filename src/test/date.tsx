import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import type { Dayjs } from 'dayjs';

const onChange: DatePickerProps['onChange'] = (date: Dayjs, dateString: string | string []) => {
  console.log(date, dateString);
};
const DateCom: React.FC = () => (
  <Space direction="vertical">
    <DatePicker onChange={onChange} />
    <DatePicker onChange={onChange} picker="week" />
    <DatePicker onChange={onChange} picker="month" />
    <DatePicker onChange={onChange} picker="quarter" />
    <DatePicker onChange={onChange} picker="year" />
  </Space>
);

export default DateCom;