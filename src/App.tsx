import './App.css'
import { ConfigProvider} from 'antd';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import BasicLayout from './components/layout/basic/index';
import Login from './views/login/index';

// 战鼓管理
import User from '@/views/system/user/index';
// 菜单管理
import Menu from '@/views/system/menu/index';
// 文章管理
import ArticleList from '@/views/article/list/index';
import ArticleUpsert from '@/views/article/upsert/index';

import Test from '@/views/test/test.jsx';


function App() {
  // https://ant.design/docs/react/migrate-less-variables-cn
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        cssVar: true,
        hashed: false,
        components: {
          Radio: {
            colorPrimary: '#00b96b',
          },
          Checkbox: {
            colorPrimary: '#ff4d4f',
          },
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<BasicLayout />}>
            <Route path="/home/system/user" element={<User />} />
            <Route path="/home/system/menu" element={<Menu />} />
            <Route path="/home/test" element={<Test />} />
            <Route path="/home/article/list" element={<ArticleList />} />
            <Route path="/home/article/upsert" element={<ArticleUpsert />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App