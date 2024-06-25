import './index.less';
import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { allHandle } from '@/api/article';
import { TRecords } from '@/api/types/article.types';
import SelectCategory from '@/components/SelectCategory/index.tsx';
import CustomEmpty from '@/components/CustomEmpty/index.tsx';
import { delay } from '@/utils';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Layout/Basic/Header/index';
import Footer from '@/components/Layout/Basic/Footer/index';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TRecords[]>();
  const [params, setParams] = useState({ category: '' });
  const navigate = useNavigate();
  const toDetail = (id: number) => {
    navigate(`/article/detail?id=${id}&type=preview`);
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await allHandle({ ...params });
      const result = res?.data?.rows || [];
      setData(result);
    } finally {
      await delay(100);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [params]);
  return (
    <div className="home-container">
      <Header />
      <div className="content">
        <Card
          title="文章"
          bordered={false}
          className="content-card"
          style={{ width: '100%' }}
          loading={loading}
          extra={
            <SelectCategory
              variant="filled"
              value={params.category}
              mode="tags"
              onChange={(val) =>
                setParams({ category: val && val?.length ? val : '' })
              }
            />
          }
        >
          {data?.length === 0 && !loading ? (
            <CustomEmpty onClick={fetchData} />
          ) : null}
          {data?.length ? (
            <div className="content-card-inner">
              {data?.map((item: TRecords) => (
                <div
                  className="card"
                  onClick={() => toDetail(item.id)}
                  key={item.id}
                >
                  <div className="title">{item.title}</div>
                </div>
              ))}
            </div>
          ) : null}
        </Card>
      </div>
      <Footer />
    </div>
  );
};
export default HomePage;
