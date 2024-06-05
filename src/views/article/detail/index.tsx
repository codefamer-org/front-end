import React, { useEffect, useState, useRef } from 'react';
import { MdPreview  } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import { Typography, FloatButton, Spin } from 'antd';
import { detailHandle } from '@/api/article';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { delay } from '@/utils';

const ArticleDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const [getSearchParams]  = useSearchParams()
  const [loading, setLoading] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const mdEditorRefs = useRef();

  const backHandler = () => {
    navigate('/home/article/list', { replace: true });
  }

  const loadArticleDetail = async () => {
    const id = getSearchParams.get('id')
    if (id && !loading) {
      try {
        setLoading(true)
        const details = await detailHandle({ id });
        const { markdown: cMarkdown, title: cTitle, desc: cDesc } = details.data || {};
        setMarkdown(cMarkdown);
        setTitle(cTitle);
        setDesc(cDesc);
      } finally {
        await delay(500);
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    loadArticleDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%' }}>
        <Spin spinning={loading} style={{ padding: '0 12px 12px 12px', overflow: 'hidden'}}></Spin>
      </div>
    )
  }

  return (
    <div style={{ padding: '0 12px 12px 12px', position: 'relative'}}>
      <Typography.Title level={3}>{ title }</Typography.Title>
      <Typography.Title level={5}>{ desc }</Typography.Title>
      <MdPreview ref={mdEditorRefs} modelValue={markdown} className='article-preview-wrapper' />
      <FloatButton onClick={backHandler} icon={<ArrowLeftOutlined />} />
    </div>
  )
}
export default ArticleDetailPage;