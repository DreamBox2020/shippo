import { useState, useRef, useCallback } from 'react'
import { useMount } from 'ahooks'
import { Button, Space, Table, Modal, message } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { formatTimeStr } from '@shippo/sdk-utils'
import { services, IPermissionAccess } from '@shippo/sdk-services'
import { EditAccessDrawer, EditAccessDrawerRef } from './components/edit-access-drawer'
const { confirm } = Modal

export const Page_permission_access: React.FC = () => {
  const [data, setData] = useState<IPermissionAccess[]>()
  const editAccessDrawerRef = useRef<EditAccessDrawerRef>(null)

  const handleDle = useCallback((id: number) => {
    confirm({
      title: '确认删除？',
      icon: <ExclamationCircleOutlined />,
      content: '此操作不可逆',
      onOk() {
        console.log('OK')
        services.permissionAccess.del({ id }).then((hr) => {
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

  const [columns, setColumns] = useState<ColumnsType<IPermissionAccess>>([
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
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              editAccessDrawerRef.current?.open(record)
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
        </Space>
      ),
    },
  ])

  useMount(async () => {
    const hr = await services.permissionAccess.find_all()
    setData(
      hr.data.resource.map((item) => {
        return { ...item, createdAt: formatTimeStr(item.createdAt) }
      })
    )
  })

  return (
    <div>
      <EditAccessDrawer ref={editAccessDrawerRef} />
      <Space size="middle">
        <Button type="primary" onClick={() => editAccessDrawerRef.current?.open()}>
          新增访问规则
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

export default Page_permission_access
