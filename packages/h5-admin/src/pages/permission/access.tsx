import { Button, Space, Table, Tree } from 'antd'
import { useState } from 'react'

const columns = [
  {
    title: '访问规则ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '访问规则表达式',
    dataIndex: 'accessRule',
    key: 'accessRule',
  },
  {
    title: '描述',
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: '访问规则类型',
    dataIndex: 'accessType',
    key: 'accessType',
  },
  {
    title: '被引用次数',
    dataIndex: 'permissionAssociationCount',
    key: 'permissionAssociationCount',
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
      </Space>
    ),
  },
]

const data = [
  {
    key: 1,
    id: 1,
    accessRule: 'post:/*',
    remark: '全量权限',
    accessType: 'action',
    permissionAssociationCount: 1,
    createdAt: '2022-01-01 22:22:22',
  },
  {
    key: 2,
    id: 2,
    accessRule: 'sys_mobile:/passport',
    remark: '移动端登录页面',
    accessType: 'resource',
    permissionAssociationCount: 1,
    createdAt: '2022-01-01 22:22:22',
  },
  {
    key: 3,
    id: 3,
    accessRule: 'post:/user/login',
    remark: '登录帐号',
    accessType: 'action',
    permissionAssociationCount: 1,
    createdAt: '2022-01-01 22:22:22',
  },
]

export const Page_permission_access: React.FC = () => {
  return (
    <div>
      <Space size="middle">
        <Button type="primary">新增访问规则</Button>
      </Space>
      <Table columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }} />
    </div>
  )
}

export default Page_permission_access
