import './index.less'
import React, { useState, Suspense } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import { MailOutlined } from '@ant-design/icons';
import SpinLoading from '@/components/spin';

const { Header, Sider, Content, } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
type ClickType = MenuProps['onClick'];

const topMenus: MenuItem[] = [
  {
    label: '系统管理',
    key: '/home/system',
    icon: <MailOutlined />,
    children: [
      {
        label: '用户管理',
        icon: <MailOutlined />,
        key: '/home/system/user',
        // icon: React.createElement(icon),
      },
      {
        label: '菜单管理',
        icon: <MailOutlined />,
        key: '/home/system/menu',
        // icon: React.createElement(icon),
      },
      {
        label: '测试',
        icon: <MailOutlined />,
        key: '/home/test',
        // icon: React.createElement(icon),
      },
    ]
  },
]

const BasicLayout: React.FC = () => {
  const navigate = useNavigate()

  // 设置展开收起
  // const toggleExpandHandle = (path: string) => {
  //   if (path) {
  //     const index = openKeysArray?.findIndex(item => item === path);

  //     if (index !== -1) {
  //       openKeysArray.splice(index, 1)
  //     } else {
  //       openKeysArray.push(path)
  //     }
  //     console.log(index, openKeysArray);
  //     setOpenArrayKeys(openKeysArray)
  //     console.log(index, openKeysArray);
  //   }
  // }

  // 顶部菜单选中
  const [current, setCurrent] = useState('/home/system/user');
  const onClickCommon: ClickType = (e) => {
    // toggleExpandHandle(e.key)
    if (current !== e.key && e.key) {
      setCurrent(e.key);
      navigate(e.key)
    }
  };
  const onClickTop: ClickType = (e) => {
    console.log('onClickTop', e);
    onClickCommon(e)
  };
  const onClickMenu: ClickType = (e) => {
    console.log('onClickMenu', e);
    onClickCommon(e)
  };

  const [collapsed, setCollapsed] = useState(false);
  // const [openKeysArray, setOpenArrayKeys] = useState<string[]>([]);
  const [defaultOpenKeysArray] = useState<string[]>(['/home/system/user']);

  return (
    <Layout className='layout-container'>
      <Header className='header-container'>
        <div>LOGO</div>
        <Menu onClick={onClickTop} selectedKeys={[current]} mode="horizontal" items={topMenus} />
      </Header>
      <Layout>
        <Sider theme="light" className='sidebar-container' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          {/* <Menu openKeys={openKeysArray} defaultOpenKeys={defaultOpenKeysArray} onClick={onClickMenu} theme="light" mode="inline" items={topMenus} /> */}
          <Menu defaultOpenKeys={defaultOpenKeysArray} onClick={onClickMenu} theme="light" mode="inline" items={topMenus} />
        </Sider>
        <Content className='content-container'>
          <Suspense fallback={<SpinLoading />}>
            <Outlet></Outlet>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
};
export default BasicLayout;
