import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { getArticlePage } from '@/api/article';
import { useNavigate } from 'react-router-dom';

// type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface DataType {
  [prop: string]: string
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

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    fixed: 'left',
    width: 160,
    render: (title : string) => `${title}`,
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    width: 160,
    ellipsis: true,
  },
  {
    title: 'MD内容',
    dataIndex: 'markdown',
    key: 'markdown',
    width: 160,
    ellipsis: true,
  },
  {
    title: 'HTML内容',
    dataIndex: 'html',
    key: 'html',
    width: 160,
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 180,
  },
  {
    title: '创建人',
    dataIndex: 'create_user',
    key: 'create_user',
    width: 120,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    key: 'updated_at',
    width: 180,
  },
  {
    title: '更新人',
    dataIndex: 'update_user',
    key: 'update_user',
    width: 120,
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 100,
    render: (_, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];




const getRandomuserParams = (params: TableParams) => ({
  limit: params.pagination?.pageSize,
  offset: params.pagination?.current,
  // ...params,
});


const TableList: React.FC = () => {
  const navigate = useNavigate()

  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 50,
    },
  });
  const fetchData = () => {
    setLoading(true);
    getArticlePage({
      ...getRandomuserParams(tableParams),
    })
      .then(({ data: { rows, count } }) => {
        setData(rows);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: count,
          },
        });
      });
  };

  const createArticleHandle = () => {
    navigate('/home/article/upsert')
  }

  useEffect(() => {
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
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
      <div style={{
        marginBottom: 12
        }}>
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
        columns={columns}
        rowKey={(record: DataType) => record.user_id}
        pagination={false}
        onChange={handleTableChange}
        scroll={{ y: 600 }}
        style={{
          flex: 1
        }}
      />
    </>
  )
}
export default TableList;