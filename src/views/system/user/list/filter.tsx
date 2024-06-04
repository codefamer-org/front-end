import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import { filterEmptyString } from '@/utils';
// import PtopTypes from "prop-types"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Filter: React.FC = (props: any) => {
  const { valueChange, submit, reset } = props;

  const [form] = Form.useForm();
  const onFormLayoutChange = () => {
    valueChange?.(filterEmptyString(form?.getFieldsValue()))
  };
  const queryHandler = () => {
    submit?.(filterEmptyString(form?.getFieldsValue()))
  }
  const resetHandler = () => {
    form?.resetFields()
    reset?.()
  }
  return (
    <Form
      layout="inline"
      form={form}
      initialValues={{ layout: 'inline' }}
      onValuesChange={onFormLayoutChange}
      style={{
        marginTop: 12,
        marginBottom: 24,
      }}
    >
      <Form.Item label="用户名" name="name">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="手机号" name="mobile">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="邮箱" name="email">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" onClick={resetHandler} danger>重 置</Button>
          <Button type="primary" onClick={queryHandler}>查 询</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

// Filter.propTypes = {
//   submit: PtopTypes.func,
//   submit: PtopTypes.func,
// }

export default Filter;