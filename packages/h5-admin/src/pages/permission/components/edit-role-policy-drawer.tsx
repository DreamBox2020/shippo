import { services } from '@shippo/sdk-services'
import { IPermissionPolicy, IRole, __role } from '@shippo/types'

import {
  Drawer,
  Space,
  Button,
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  message,
  Table,
} from 'antd'
import React, { useEffect, useImperativeHandle, useState, useCallback, useMemo } from 'react'

const __defaultRole = __role()

const columns = [
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
]

export interface EditRolePolicyDrawerRef {
  open: (role: IRole) => void
}

export interface EditRolePolicyDrawerProps {
  onClose?: () => void
}

const Component: React.ForwardRefRenderFunction<
  EditRolePolicyDrawerRef,
  EditRolePolicyDrawerProps
> = (props, ref) => {
  const { onClose } = props
  const [role, setRole] = useState<IRole>(__defaultRole)
  const [dataSource, setDataSource] = useState<IPermissionPolicy[]>([])

  const [visible, setVisible] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])

  // ref
  useImperativeHandle(ref, () => {
    return {
      // 打开抽屉
      open: (role: IRole) => {
        services.permissionPolicy.find_all_ext_status({ id: role.id }).then((hr) => {
          setDataSource(hr.data.resource)
          setSelectedRowKeys(hr.data.resource.filter((item) => item.status).map((item) => item.id))
        })
        setRole(role)
        setVisible(true)
      },
    }
  })

  // 关闭抽屉
  const closeDrawer = useCallback(() => {
    onClose && onClose()
    setVisible(false)
  }, [onClose])

  const handleSave = useCallback(async () => {
    console.log(role)
    services.role.update_policies({ id: role.id, policies: selectedRowKeys })
    closeDrawer()
  }, [role, selectedRowKeys, closeDrawer])

  return (
    <Drawer
      title="权限策略配置"
      width={720}
      onClose={closeDrawer}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form layout="vertical" requiredMark={false}>
        <Form.Item>
          <Table
            rowKey="id"
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys as number[]),
            }}
            columns={columns}
            dataSource={dataSource}
            size="small"
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button onClick={closeDrawer}>关闭</Button>
            <Button onClick={handleSave} type="primary">
              保存
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export const EditRolePolicyDrawer = React.forwardRef(Component)
