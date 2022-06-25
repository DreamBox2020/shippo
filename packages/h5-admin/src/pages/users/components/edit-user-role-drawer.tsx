import { services } from '@shippo/sdk-services'
import { IRole, IUserExtRoleName, __userExtRoleName } from '@shippo/types'

import { Drawer, Space, Button, Form, Table } from 'antd'
import React, { useImperativeHandle, useState, useCallback } from 'react'

const __defaultUserExtRoleName = __userExtRoleName()

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
  open: (user: IUserExtRoleName) => void
}

export interface EditUserRoleDrawerProps {
  onClose?: (user: IUserExtRoleName) => void
}

const Component: React.ForwardRefRenderFunction<EditUserRoleDrawerRef, EditUserRoleDrawerProps> = (
  props,
  ref
) => {
  const { onClose } = props
  const [user, setUser] = useState<IUserExtRoleName>(__defaultUserExtRoleName)
  const [dataSource, setDataSource] = useState<IRole[]>([])

  const [visible, setVisible] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])

  // ref
  useImperativeHandle(ref, () => {
    return {
      // 打开抽屉
      open: (user: IUserExtRoleName) => {
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
    onClose && onClose(user)
    setVisible(false)
  }, [onClose, user])

  // 更改user
  const changeUser = useCallback((user: Partial<IUserExtRoleName>) => {
    setUser((old) => ({ ...old, ...user }))
  }, [])

  const handleSave = useCallback(async () => {
    console.log(user)
    services.user.update_user_role({ id: user.id, role: user.role })
    closeDrawer()
  }, [user, closeDrawer])

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
              onChange: (keys, rows) => {
                console.log(keys, rows)
                setSelectedRowKeys(keys as number[])
                changeUser({
                  role: rows[0].id,
                  roleName: rows[0].roleName,
                })
              },
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
