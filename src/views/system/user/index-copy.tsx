// import type { FormProps } from 'antd';
// import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
// import { doLogin } from '@/api/user';
// import { encryption } from '@/utils/crypto';
// import { LocalStorageService } from '@/utils/storage';
// import { delay } from '@/utils';
// import { useNavigate } from 'react-router-dom';

// const { Title } = Typography;

// type FieldType = {
//   name: string;
//   password: string;
//   remember: string;
// };

// const LoginPage: React.FC = () => {
//   const navigate = useNavigate()
//   const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
//     LocalStorageService.set('token', null);
//     const result = await doLogin({ ...values, password: encryption(values.password) as unknown as string });
//     LocalStorageService.set('token', result.data);
//     message.success('登录成功!');
//     await delay(300);
//     message.destroy();
//     navigate('/home')
//   };
//   const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };
//   const initialValues = {
//     name: 'admin',
//     password: '!LuJun=940424',
//     remember: true,
//   }
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
//       <Form  onFinish={onFinish} onFinishFailed={onFinishFailed} scrollToFirstError style={{ width: 300 }} initialValues={initialValues}>
//         <Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>登录</Title>
//         <Form.Item name="name" rules={[{ required: true, message: '请输入账户名称' }]}>
//           <Input
//             prefix={<i className="anticon anticon-user" />}
//             placeholder="用户名"
//           />
//         </Form.Item>
//         <Form.Item name="password" rules={[{ required: true, message: '请输入账户密码' }]}>
//           <Input
//             prefix={<i className="anticon anticon-lock" />}
//             type="password"
//             placeholder="密码"
//           />
//         </Form.Item>
//         <Form.Item name="remember" valuePropName="checked">
//           <Checkbox>
//             记住我
//           </Checkbox>
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" block>
//             登录
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   )
// }
// export default LoginPage;



const SystemUserPage: React.FC = () => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      SystemUserPage
    </div>
  )
}
export default SystemUserPage;