import { useCallback, useRef, useState } from 'react'
import { useMount } from 'ahooks'
import { Button, Space, Table, Modal, message } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { formatTimeStr } from '@shippo/sdk-utils'
import { IPermissionPolicy, services } from '@shippo/sdk-services'
import {
  EditPolicyAccessDrawer,
  EditPolicyAccessDrawerRef,
} from './components/edit-policy-access-drawe'
import { EditPolicyDrawer, EditPolicyDrawerRef } from './components/edit-policy-drawer'
const { confirm } = Modal

export const Page_permission_policy: React.FC = () => {
  const [data, setData] = useState<IPermissionPolicy[]>()
  const editPolicyDrawerRef = useRef<EditPolicyDrawerRef>(null)
  const editPolicyAccessDrawerRef = useRef<EditPolicyAccessDrawerRef>(null)

  const handleDle = useCallback((id: number) => {
    confirm({
      title: '确认删除？',
      icon: <ExclamationCircleOutlined />,
      content: '此操作不可逆',
      onOk() {
        console.log('OK')
        services.permissionPolicy.del({ id }).then((hr) => {
          if (hr.data.success) {
            message.success('成功')
          } else {
            message.success('失败')
          }
        })
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }, [])

  const [columns, setColumns] = useState<ColumnsType<IPermissionPolicy>>([
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
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => editPolicyDrawerRef.current?.open(record)}>
            修改
          </Button>
          <Button
            type="link"
            onClick={() => {
              handleDle(record.id)
            }}
          >
            删除
          </Button>
          <Button type="link" onClick={() => editPolicyAccessDrawerRef.current?.open(record)}>
            访问规则配置
          </Button>
        </Space>
      ),
    },
  ])

  const updateTable = useCallback(async () => {
    const hr = await services.permissionPolicy.find_all()
    setData(
      hr.data.resource.map((item) => {
        return { ...item, createdAt: formatTimeStr(item.createdAt) }
      })
    )
  }, [])

  useMount(() => {
    updateTable()
  })

  return (
    <div>
      <EditPolicyDrawer ref={editPolicyDrawerRef} onClose={() => updateTable()} />
      <EditPolicyAccessDrawer ref={editPolicyAccessDrawerRef} />
      <Space size="middle">
        <Button type="primary" onClick={() => editPolicyDrawerRef.current?.open()}>
          新增权限策略
        </Button>
      </Space>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={{ position: ['bottomCenter'] }}
        size="small"
      />
    </div>
  )
}

export default Page_permission_policy
