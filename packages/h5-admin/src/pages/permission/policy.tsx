import { Button, Space, Table, Tree } from 'antd'
import { useState } from 'react'

const columns = [
  {
    title: '权限策略ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '权限策略名称',
    dataIndex: 'policyName',
    key: 'policyName',
  },
  {
    title: '描述',
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: '被引用次数',
    dataIndex: 'roleAssociationCount',
    key: 'roleAssociationCount',
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
        <Button type="link">访问规则配置</Button>
      </Space>
    ),
  },
]

const data = [
  {
    key: 1,
    id: 1,
    policyName: 'SysRoot',
    remark: '系统全量权限',
    roleAssociationCount: 1,
    createdAt: '2022-01-01 22:22:22',
  },
  {
    key: 2,
    id: 2,
    policyName: 'SysMobileTempFullAccess',
    remark: '移动端临时页面全部权限',
    roleAssociationCount: 1,
    createdAt: '2022-01-01 22:22:22',
  },
  {
    key: 3,
    id: 3,
    policyName: 'SysBase',
    remark: '系统基础权限(必选)',
    roleAssociationCount: 1,
    createdAt: '2022-01-01 22:22:22',
  },
]

export const Page_permission_policy: React.FC = () => {
  return (
    <div>
      <Space size="middle">
        <Button type="primary">新增权限策略</Button>
      </Space>
      <Table columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }} />
    </div>
  )
}

export default Page_permission_policy
