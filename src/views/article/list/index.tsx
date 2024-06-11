import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import type { TableProps } from 'antd';
import { pageHandle } from '@/api/article';
import { useNavigate } from 'react-router-dom';
import { useOptions } from './useOptions';
import { TRecords } from '@/api/types/article.types'

interface TableParams {
  pagination?: {
    page: number,
    size: number,
  };
  total?: number
}
const getRandomuserParams = (params: TableParams) => ({
  page: params?.pagination?.page,
  size: params?.pagination?.size,
});

const TableList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<TRecords[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      page: 1,
      size: 50,
    },
    total: 0
  });
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await pageHandle({ ...getRandomuserParams(tableParams)});
      const total = res.data.count;
      const result = res.data.rows;
      setData(result);
      setTableParams({ total });
    } finally {
      setLoading(false);
    }
  };
  const createArticleHandle = () => {
    navigate('/home/article/upsert');
  };
  const { columns } = useOptions({ refresh: fetchData })

  useEffect(() => {
    console.log('tableParams?.pagination', tableParams?.pagination);
    if (tableParams?.pagination) {
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableParams?.pagination?.page, tableParams?.pagination?.size]);

  const handleTableChange: TableProps['onChange'] = (
    pagination,
  ) => {
    console.log('pagination', pagination);

    setTableParams({
      pagination: {
        page: pagination?.current as unknown as number,
        size: pagination?.pageSize as unknown as number,
      },
    });
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.size) {
      setData([]);
    }
  };

  return (
    <>
      <div
        style={{
          marginBottom: 12,
        }}
      >
        <Button type="primary" onClick={createArticleHandle}>
          添加文章
        </Button>
      </div>
      <Table
        bordered
        size="middle"
        sticky
        virtual
        dataSource={data}
        loading={loading}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={false}
        onChange={handleTableChange}
        scroll={{ y: 600 }}
        style={{
          flex: 1,
        }}
      />
    </>
  );
};
export default TableList;
