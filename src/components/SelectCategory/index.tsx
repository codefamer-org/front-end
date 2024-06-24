import './index.less'
import { allHandle, TRecords } from '@/api/category';
import { useState, useEffect } from 'react';
import { Select } from 'antd';
import classNames from "classnames";

// 定义Option的类型，用于表示选项的属性
// type Option = {
//   label: string; // 选项的显示文本
//   value: string; // 选项的值
// };

// 定义Props的类型，用于表示组件的属性
type Props = {
  // options: Option[]; // 选项数组
  onChange: (value: string) => void; // 选中选项时的回调函数
  value?: string; // 默认选中的选项值
  defaultValue?: string; // 默认选中的选项值
  placeholder?: string; // 选项为空时的占位符文本
  className?: string; // 组件的自定义类名
  variant?: "outlined" | "borderless" | "filled" | undefined; // 组件的自定义类名
  mode?: "multiple" | "tags" | undefined
};
export default function(props: Props) {
  const [options, setOptions] = useState<TRecords[]>();
  const fetchCategory = async () => {
    try {
      const res = await allHandle({ type: 'ARTICLE'});
      const result = res?.data?.rows || [];
      setOptions(result);
    } catch(err) {
      setOptions([]);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  return <Select
    allowClear={true}
    mode={props.mode}
    variant={props.variant}
    maxTagCount={3}
    style={{ minWidth: 100 }}
    options={options}
    value={props.value || undefined}
    defaultValue={props.defaultValue || undefined}
    onChange={props.onChange}
    placeholder={props.placeholder || '请选择'}
    className={classNames(props.className, 'select-category-wrapper')}
  />
}