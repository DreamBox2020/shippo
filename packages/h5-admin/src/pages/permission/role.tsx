import { useState, useRef, useCallback } from 'react'
import { useMount } from 'ahooks'
import { Button, Space, Table, Modal, message } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { formatTimeStr } from '@shippo/sdk-utils'
import { services, IRole } from '@shippo/sdk-services'
import { EditRoleDrawer, EditRoleDrawerRef } from './components/edit-role-drawer'
import { EditRolePolicyDrawer, EditRolePolicyDrawerRef } from './components/edit-role-policy-drawer'
import { ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal

export const Page_permission_role: React.FC = () => {
  const [data, setData] = useState<(IRole & { key: string })[]>()
  const editRoleDrawerRef = useRef<EditRoleDrawerRef>(null)
  const editRolePolicyDrawerRef = useRef<EditRolePolicyDrawerRef>(null)

  const handleDle = useCallback((id: number) => {
    confirm({
      title: '确认删除？',
      icon: <ExclamationCircleOutlined />,
      content: '此操作不可逆',
      onOk() {
        console.log('OK')
        services.role.del({ id }).then((hr) => {
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

  const [columns, setColumns] = useState<ColumnsType<IRole>>([
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
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button
              type="link"
              onClick={() => {
                editRoleDrawerRef.current?.open(record)
              }}
            >
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
            <Button
              type="link"
              onClick={() => {
                editRolePolicyDrawerRef.current?.open(record)
              }}
            >
              权限策略配置
            </Button>
          </Space>
        )
      },
    },
  ])

  useMount(async () => {
    const hr = await services.role.find_all()
    setData(
      hr.data.resource.map((role) => {
        return { ...role, createdAt: formatTimeStr(role.createdAt), key: String(role.id) }
      })
    )
  })

  return (
    <div>
      <EditRoleDrawer ref={editRoleDrawerRef} />
      <EditRolePolicyDrawer ref={editRolePolicyDrawerRef} />
      <Space size="middle">
        <Button type="primary" onClick={() => editRoleDrawerRef.current?.open()}>
          新增角色
        </Button>
      </Space>
      <Table columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }} />
    </div>
  )
}

export default Page_permission_role
