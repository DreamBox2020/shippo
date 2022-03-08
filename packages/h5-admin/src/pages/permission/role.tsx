import { Button, Space, Table } from 'antd'
import { useState } from 'react'

const columns = [
  {
    title: '角色ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
  },
  {
    title: '描述',
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Button type="link">修改</Button>
        <Button type="link">删除</Button>
        <Button type="link">权限策略配置</Button>
      </Space>
    ),
  },
]

const data = [
  {
    key: 1,
    id: 1,
    roleName: 'admin',
    remark: '管理员',
    createdAt: '2022-01-01 22:22:22',
  },
  {
    key: 2,
    id: 2,
    roleName: 'user',
    remark: '用户',
    createdAt: '2022-01-01 22:22:22',
  },
  {
    key: 3,
    id: 3,
    roleName: 'root',
    remark: '系统超级用户',
    createdAt: '2022-01-01 22:22:22',
  },
]

export const Page_permission_role: React.FC = () => {
  return (
    <div>
      <Space size="middle">
        <Button type="primary">新增角色</Button>
      </Space>
      <Table columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }} />
    </div>
  )
}

export default Page_permission_role
