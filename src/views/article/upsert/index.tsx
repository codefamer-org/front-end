import React, { useEffect, useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { Flex, Input, Typography, Button, message, Col, Row } from 'antd';
import { saveArticle } from '@/api/article';
import { useNavigate, useLocation } from 'react-router-dom';
import { delay } from '@/utils';

const ArticlePage: React.FC = () => {
  const navigate = useNavigate()
  const location  = useLocation()
  console.log('ASDSADASD', location);
  
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [html, setHtml] = useState('');
  const resetHandler = () => {
    setMarkdown('');
    setTitle('');
    setDesc('');
    setHtml('');
  }
  const queryHandler = async () => {
    setLoading(true);
    try {
      await saveArticle({ markdown, title, desc, html });
      message.success('操作成功');
      delay(500);
      resetHandler();
      navigate('/home/article/list', { replace: true });
    } finally {
      setLoading(false);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setSanitize = (htmlStr: any) => {
    if (typeof setTitle === 'function' && flag) {
      setHtml(htmlStr)
    }
    return htmlStr;
  }

  useEffect(() => {
    setFlag(true);
  }, [])

  return (
    <div style={{ height: '100%', width: '100%', marginBottom: 24, boxSizing: 'border-box' }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={5}>文章标题</Typography.Title>
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder='请输入' />
        </Col>
        <Col span={12}>
          <Typography.Title level={5}>文章简介</Typography.Title>
          <Input.TextArea autoSize value={desc} showCount onChange={e => setDesc(e.target.value)} placeholder="请输入" />
          {/* <Input.TextArea
            showCount
            maxLength={100}
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder='请输入'
            style={{ height: 120, resize: 'none' }}
          /> */}
        </Col>
        <Col span={24}>
          <Typography.Title level={5}>文章内容</Typography.Title>
          <MdEditor modelValue={markdown} onChange={setMarkdown} sanitize={setSanitize} />
        </Col>
      </Row>
      <Flex gap={16} align="center" flex="flex" justify="flex-end" style={{ marginTop: 12 }}>
        <Button type="primary" onClick={resetHandler} danger loading={loading}>保 存</Button>
        <Button type="primary" onClick={queryHandler} loading={loading}>查 询</Button>
      </Flex>
    </div>
  )
}
export default ArticlePage;