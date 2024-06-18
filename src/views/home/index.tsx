import './index.less';
import React, { useEffect, useState } from 'react';
import { Flex, Tag, Divider, Card } from 'antd';
import { allHandle } from '@/api/article';
import { TRecords } from '@/api/types/article.types';

const HomePage: React.FC = () => {
  const tagsData = ['Movies', 'Books', 'Music', 'Sports'];
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TRecords[]>();
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await allHandle({});
      const result = res.data.rows;
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home-container">
      <div className="header"></div>
      <div className="content">
        <Card
          title="文章"
          bordered={true}
          className="content-card"
          style={{ width: '100%' }}
        >
          <Divider orientation="left">文章类型</Divider>
          <Flex gap={8} wrap>
            <Tag.CheckableTag key="ALL" checked={Boolean(selectedTags?.length)}>
              所有
            </Tag.CheckableTag>
            {tagsData.map<React.ReactNode>((tag) => (
              <Tag.CheckableTag
                key={tag}
                checked={selectedTags.includes(tag)}
                onChange={(checked) => handleChange(tag, checked)}
              >
                {tag}
              </Tag.CheckableTag>
            ))}
          </Flex>
          <Divider orientation="left">文章列表</Divider>
          <div className="articles">
            {data?.map((item: TRecords) => (
              <>
                <div className="article-item">
                  <div>{item.title}</div>
                  {/* <div>{item.desc}</div> */}
                </div>
                <Divider />
              </>
            ))}
          </div>
        </Card>
      </div>
      <div className="footer">
        <a href="https://beian.miit.gov.cn/">蜀 ICP 20240618</a>
      </div>
    </div>
  );
};
export default HomePage;
