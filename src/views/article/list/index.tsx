import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { pageHandle } from '@/api/article';
import { useNavigate } from 'react-router-dom';
import { useOptions } from './useOptions';

// type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, 'pagination'>,
  boolean
>;

interface DataType {
  [prop: string]: string;
  // name: {
  //   first: string;
  //   last: string;
  // };
  // gender: string;
  // email: string;
  // login: {
  //   uuid: string;
  // };
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}


const getRandomuserParams = (params: TableParams) => ({
  limit: params.pagination?.pageSize,
  offset: params.pagination?.current,
  // ...params,
});

const TableList: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 50,
    },
  });
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await pageHandle({ ...getRandomuserParams(tableParams)}) || {}
      const { rows, count } = data || {};
      setData(rows);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: count,
        },
      });
    } finally {
    }
  };

  const createArticleHandle = () => {
    navigate('/home/article/upsert');
  };
  const { columns } = useOptions({ refresh: fetchData })

  useEffect(() => {
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const handleTableChange: TableProps['onChange'] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
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
        rowKey={(record: DataType) => record.id}
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
