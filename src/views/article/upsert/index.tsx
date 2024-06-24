import React, { useEffect, useState, useRef } from 'react';
import { MdEditor } from 'md-editor-rt';
import type { ExposeParam } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import 'md-editor-rt/lib/preview.css';
import { Input, Typography,message, Col, Row, FloatButton, Spin } from 'antd';
import { saveHandle, detailHandle } from '@/api/article';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { delay } from '@/utils';
import { SaveOutlined, RollbackOutlined } from '@ant-design/icons';
import { originUpload } from '@/utils/qiniu.js';
import SelectCategory from '@/components/SelectCategory/index.tsx';


const ArticlePage: React.FC = () => {
  const navigate = useNavigate()
  const [getSearchParams]  = useSearchParams()
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [html, setHtml] = useState('');
  const [category, setCategory] = useState('');
  const mdEditorRefs = useRef<ExposeParam>();

  const resetHandler = () => {
    setMarkdown('');
    setTitle('');
    setDesc('');
    setHtml('');
    navigate('/home/article/list', { replace: true });
  }
  const queryHandler = async () => {
    setLoading(true);
    try {
      await saveHandle({ markdown, title, desc, html, category });
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

  const loadArticleDetail = async () => {
    const id = getSearchParams.get('id') as unknown as number
    if (id) {
      const details = await detailHandle({ id });
      setMarkdown(details?.data?.markdown || '');
      setTitle(details?.data?.title || '');
      setDesc(details?.data?.desc || '');
      setHtml(details?.data?.html || '');
      setCategory(details?.data?.category || '');
    }
  }

  useEffect(() => {
    setFlag(true);
    loadArticleDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  type TRecordItem = { alt: string, title: string, url: string, category: string }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUploadImg = async (files: File[], callback: (p: any) => void) => {
    const res = await Promise.all(
      files.map((file): Promise<TRecordItem> => {
        return new Promise((rev, rej) => {
          originUpload(file)
          .then((res: TRecordItem) => rev(res))
          .catch((error: PromiseRejectedResult) => rej(error));
        });
      })
    );
    callback(res?.filter((item) => item?.url));
  };

  return (
    <div style={{ height: '100%', width: '100%', marginBottom: 24, boxSizing: 'border-box' }}>
      <Spin spinning={loading}></Spin>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={5}>文章标题</Typography.Title>
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder='请输入' />
        </Col>
        <Col span={12}>
          <Typography.Title level={5}>文章简介</Typography.Title>
          <Input.TextArea autoSize maxLength={500} value={desc} onChange={e => setDesc(e.target.value)} placeholder="请输入" />
        </Col>
        <Col span={12}>
          <Typography.Title level={5}>文章类别</Typography.Title>
          <SelectCategory
              mode={undefined}
              value={category}
              onChange={setCategory}
            />
        </Col>
        <Col span={24}>
          <Typography.Title level={5}>文章内容</Typography.Title>
          <MdEditor
            readOnly={ getSearchParams.get('sourceType') === 'DETAIL' }
            disabled={ getSearchParams.get('sourceType') === 'DETAIL' }
            toolbars={ getSearchParams.get('sourceType') === 'DETAIL' ? [] : undefined }
            ref={mdEditorRefs}
            modelValue={markdown}
            onChange={setMarkdown}
            sanitize={setSanitize}
            onUploadImg={onUploadImg}
          />
        </Col>
      </Row>
      <FloatButton.Group shape="circle" style={{ right: 24 }}>
        <FloatButton icon={<SaveOutlined />} onClick={queryHandler} />
        <FloatButton onClick={resetHandler} icon={<RollbackOutlined />} />
        <FloatButton.BackTop visibilityHeight={0} />
      </FloatButton.Group>
    </div>
  )
}
export default ArticlePage;