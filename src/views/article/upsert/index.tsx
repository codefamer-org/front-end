import React, { useEffect, useState, useRef } from 'react';
import { MdEditor, MdCatalog} from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import 'md-editor-rt/lib/preview.css';
import { Flex, Input, Typography, Button, message, Col, Row, FloatButton } from 'antd';
import { saveHandle, detailHandle } from '@/api/article';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { delay } from '@/utils';
import { SaveOutlined, RollbackOutlined } from '@ant-design/icons';


const ArticlePage: React.FC = () => {
  const navigate = useNavigate()
  const [getSearchParams]  = useSearchParams()
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [html, setHtml] = useState('');
  const mdEditorRefs = useRef();

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
      await saveHandle({ markdown, title, desc, html });
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
    const id = getSearchParams.get('id')
    if (id) {
      const details = await detailHandle({ id });
      setMarkdown(details?.data?.markdown || '');
      setTitle(details?.data?.title || '');
      setDesc(details?.data?.desc || '');
      setHtml(details?.data?.html || '');
    }
  }
  const scrollElement = document.documentElement;
  const [id] = useState('preview-only');

  useEffect(() => {
    setFlag(true);
    // const queryId = getSearchParams.get('id')
    const sourceType = getSearchParams.get('sourceType')
    if (sourceType === 'DETAIL') {
      mdEditorRefs.current?.togglePreviewOnly(true);
      mdEditorRefs.current?.toggleCatalog(true);
      // mdEditorRefs.current?.toggleHtmlPreview(true);
    }
    loadArticleDetail();
  }, [])


  const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
      files.map((file) => {
        return new Promise((rev, rej) => {
          const form = new FormData();
          form.append('file', file);

          axios
            .post('/api/img/upload', form, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((res) => rev(res))
            .catch((error) => rej(error));
        });
      })
    );

    // Approach 1
    callback(res.map((item) => item.data.url));
    // Approach 2
    // callback(
    //   res.map((item: any) => ({
    //     url: item.data.url,
    //     alt: 'alt',
    //     title: 'title'
    //   }))
    // );
  };

  return (
    <div style={{ height: '100%', width: '100%', marginBottom: 24, boxSizing: 'border-box' }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={5}>文章标题</Typography.Title>
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder='请输入' />
        </Col>
        <Col span={12}>
          <Typography.Title level={5}>文章简介</Typography.Title>
          <Input.TextArea autoSize value={desc} onChange={e => setDesc(e.target.value)} placeholder="请输入" />
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