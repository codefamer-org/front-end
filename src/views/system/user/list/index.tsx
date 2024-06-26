import React, { useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { getUserPage } from '@/api/user';

type ColumnsType<T> = TableProps<T>['columns'];
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
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 100,
    render: (name : string) => `${name}`,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
    width: 120,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    filters: [
      { text: '保密', value: 0 },
      { text: '男', value: 1 },
      { text: '女', value: 2 },
    ],
    width: 100,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    ellipsis: true,
    width: 160,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 100,
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
    getUserPage({
      ...getRandomuserParams(tableParams),
    })
      .then(({ data: results }) => {
        const temp = results
        console.log('SADASD',temp );

        for (let index = 0; index < 500; index++) {
          temp?.push({ ...results[index], 'user_id': `${index}_user_id` })
        }
        setData(temp);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

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
    <Table
      bordered
      size="middle"
      sticky
      virtual
      dataSource={data}
      columns={columns}
      rowKey={(record: DataType) => record.user_id}
      pagination={false}
      loading={loading}
      onChange={handleTableChange}
      scroll={{ y: 600 }}
      style={{
        flex: 1
      }}
    />
  )
}
export default TableList;