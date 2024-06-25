import React, { useEffect, useState, useRef } from 'react';
import { MdPreview  } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import { Typography, FloatButton, Spin } from 'antd';
import { detailHandle } from '@/api/article';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { delay } from '@/utils';
import type { ExposeParam } from 'md-editor-rt';
import Header from '@/components/Layout/Basic/Header/index';
import Footer from '@/components/Layout/Basic/Footer/index';
import './index.less'

const ArticleDetail: React.FC = () => {
  const navigate = useNavigate()
  const [getSearchParams]  = useSearchParams()
  const [loading, setLoading] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const mdEditorRefs = useRef<ExposeParam>();

  const backHandler = () => {
    navigate(-1)
    // navigate('/home/article/list', { replace: true });
  }

  const loadArticleDetail = async () => {
    const id = getSearchParams.get('id') as unknown as number
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
    <div className="home-container">
      <Header />
      <div className="content detail">
          <Typography.Title level={3}>{ title }</Typography.Title>
          <Typography.Title level={5}>{ desc }</Typography.Title>
          <MdPreview ref={mdEditorRefs} modelValue={markdown} className='article-preview-wrapper' />
          <FloatButton onClick={backHandler} icon={<ArrowLeftOutlined />} />
      </div>
      <Footer />
    </div>
  )
}
export default ArticleDetail;