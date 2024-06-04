import React, { useEffect, useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { Flex, Input, Typography, Button } from 'antd';

const ArticlePage: React.FC = () => {
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
  const queryHandler = () => {
    console.log('text', markdown);
    console.log('title', title);
    console.log('desc', desc);
    console.log('html', html);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setSanitize = (htmlStr: any) => {
    if (typeof setTitle === 'function' && flag) {
      setTitle(htmlStr)
    }
  }

  useEffect(() => {
    setFlag(true);
  }, [])

  return (
    <div style={{ height: '100%', width: '100%', marginBottom: 24, boxSizing: 'border-box' }}>
      <div>
        <Typography.Title level={5}>文章标题</Typography.Title>
        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder='请输入' />
      </div>
      <div>
        <Typography.Title level={5}>文章简介</Typography.Title>
        <Input.TextArea
          showCount
          maxLength={100}
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder='请输入'
          style={{ height: 120, resize: 'none' }}
        />
      </div>
      <div>
        <Typography.Title level={5}>文章内容</Typography.Title>
        <MdEditor modelValue={markdown} onChange={setMarkdown} sanitize={setSanitize} />
      </div>
      <Flex gap={16} align="center" flex="flex" justify="flex-end" style={{ marginTop: 12 }}>
        <Button type="primary" onClick={resetHandler} danger>重 置</Button>
        <Button type="primary" onClick={queryHandler}>查 询</Button>
      </Flex>
    </div>
  )
}
export default ArticlePage;