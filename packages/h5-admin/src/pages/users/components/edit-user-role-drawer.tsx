import { IPermissionPolicy, IRole, IUser, services, __user } from '@shippo/sdk-services'
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

const __defaultUser = __user()

const columns = [
  {
    title: '角色名称',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '描述',
    dataIndex: 'remark',
    key: 'remark',
  },
]

export interface EditUserRoleDrawerRef {
  open: (user: IUser) => void
}

export interface EditUserRoleDrawerProps {
  onClose?: () => void
}

const Component: React.ForwardRefRenderFunction<EditUserRoleDrawerRef, EditUserRoleDrawerProps> = (
  props,
  ref
) => {
  const { onClose } = props
  const [user, setUser] = useState<IUser>(__defaultUser)
  const [dataSource, setDataSource] = useState<IRole[]>([])

  const [visible, setVisible] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])

  // ref
  useImperativeHandle(ref, () => {
    return {
      // 打开抽屉
      open: (user: IUser) => {
        services.role.find_all().then((hr) => {
          setDataSource(hr.data.resource)
          setSelectedRowKeys([user.role])
        })
        setUser(user)
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
    console.log(user)
    // services.user.update_policies({ id: user.id, policies: selectedRowKeys })
    closeDrawer()
  }, [user, selectedRowKeys, closeDrawer])

  return (
    <Drawer
      title=" 修改用户角色"
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
              type: 'radio',
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

export const EditUserRoleDrawer = React.forwardRef(Component)
