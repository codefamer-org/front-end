import React, { useEffect, useState } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Select } from 'antd';
import './index.less'

const Index: React.FC = () => {
  const [system, setSystem] = useState('main');
  const selectedHandler = (value: string) => {
    console.log('value', value);
    setSystem(value)
  }
  return <Select
    placeholder="Filled"
    variant="filled"
    className='system-item-wrapper'
    value={system}
    onChange={selectedHandler}
    options={[
      { value: 'main', label: '主系统' },
    ]}
    />
};

export default Index;