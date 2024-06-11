import { useNavigate } from 'react-router-dom';
import { Space, Popconfirm , message } from 'antd';
import type { PopconfirmProps, TableProps } from 'antd';
import { useState } from 'react';
import { deleteHandle } from '@/api/article';
import { TRecords } from '@/api/types/article.types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useOptions({ refresh }: { refresh: any}) {
  const [articleId, setArticleId] = useState(-1);
  const navigate = useNavigate();

  const toUpsert = (id: number) => {
    navigate(`/home/article/upsert?id=${id}`);
  }
  const toDetail = (id: number) => {
    navigate(`/home/article/detail?id=${id}`);
  }
  const confirm: PopconfirmProps['onConfirm'] = async () => {
    await deleteHandle({ id: articleId})
    message.success('删除成功');
    if (typeof refresh === 'function') {
      refresh?.()
    }
  };

  const columns: TableProps['columns'] = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
      width: 160,
      render: (title: string) => `${title}`,
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
      width: 140,
      render: (_: string, record: TRecords) => {
        return (
          <Space>
            <a onClick={() => toUpsert(record.id)}>编 辑</a>
            <a onClick={() => toDetail(record.id)}>详 情</a>
            <Popconfirm
              title={null}
              description="确定删除?"
              onConfirm={confirm}
              okText="确定"
              cancelText="取消"
            >
              <a onClick={() => setArticleId(record.id)}>删除</a>
            </Popconfirm>
          </Space>
        )
      },
    },
  ];
  return {
    columns
  }
}