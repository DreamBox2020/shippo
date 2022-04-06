import React, { useImperativeHandle, useState, useCallback, useMemo, useRef } from 'react'
import { Drawer, Space, Button, Form, Row, Col, Input, message, Avatar } from 'antd'
import { IUser, services, __user } from '@shippo/sdk-services'
import { UserOutlined } from '@ant-design/icons'
import { EditUserRoleDrawer, EditUserRoleDrawerRef } from './edit-user-role-drawer'

const __defaultUser = __user()

export interface EditUserDrawerRef {
  open: (user?: IUser) => void
}

export interface EditUserDrawerProps {
  onClose?: () => void
}

const Component: React.ForwardRefRenderFunction<EditUserDrawerRef, EditUserDrawerProps> = (
  props,
  ref
) => {
  const { onClose } = props
  const [user, setUser] = useState<IUser>(__defaultUser)

  const [visible, setVisible] = useState(false)
  const editUserRoleDrawerRef = useRef<EditUserRoleDrawerRef>(null)

  const isUpdate = useMemo(() => {
    return user.id !== 0
  }, [user])

  // ref
  useImperativeHandle(ref, () => {
    return {
      // 打开抽屉
      open: (user?: IUser) => {
        if (user) {
          setUser({ ...user })
        } else {
          setUser(__user())
        }
        setVisible(true)
      },
    }
  })

  // 关闭抽屉
  const closeDrawer = useCallback(() => {
    onClose && onClose()
    setVisible(false)
  }, [onClose])

  // 更改user
  const changeUser = useCallback((user: Partial<IUser>) => {
    setUser((old) => ({ ...old, ...user }))
  }, [])

  const handleSave = useCallback(async () => {
    // console.log(user)
    // if (isUpdate) {
    //   const hr = await services.user.update({
    //     id: user.id,
    //     userName: user.userName,
    //     remark: user.remark,
    //   })
    //   if (hr.data.success) {
    //     message.success('成功')
    //     closeDrawer()
    //   } else {
    //     message.success('失败')
    //   }
    // } else {
    //   const hr = await services.user.create({ userName: user.userName, remark: user.remark })
    //   if (hr.data.success) {
    //     message.success('成功')
    //     closeDrawer()
    //   } else {
    //     message.success('失败')
    //   }
    // }
  }, [isUpdate, user, closeDrawer])

  return (
    <Drawer
      title={isUpdate ? '编辑用户' : '新增用户'}
      width={720}
      onClose={closeDrawer}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <EditUserRoleDrawer ref={editUserRoleDrawerRef} />
      <Form layout="vertical" requiredMark={false}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="手机号" rules={[{ required: true, message: '请输入手机号' }]}>
              <Input
                placeholder="请输入手机号"
                value={user.phone}
                onChange={(event) => {
                  changeUser({ phone: event.currentTarget.value })
                }}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
              <Input
                placeholder="请输入邮箱"
                value={user.email}
                onChange={(event) => {
                  changeUser({ email: event.currentTarget.value })
                }}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="昵称" rules={[{ required: true, message: '请输入昵称' }]}>
              <Input
                placeholder="请输入昵称"
                value={user.nickname}
                onChange={(event) => {
                  changeUser({ nickname: event.currentTarget.value })
                }}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="头像" rules={[{ required: true, message: '请输入头像' }]}>
              <Avatar shape="square" size={64} icon={<UserOutlined />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="经验" rules={[{ required: true, message: '请输入经验' }]}>
              <Input
                placeholder="请输入经验"
                value={user.exp}
                onChange={(event) => {
                  changeUser({ exp: Number(event.currentTarget.value) })
                }}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="硬币" rules={[{ required: true, message: '请输入硬币' }]}>
              <Input
                placeholder="请输入硬币"
                value={user.coin}
                onChange={(event) => {
                  changeUser({ coin: Number(event.currentTarget.value) })
                }}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="角色" rules={[{ required: true, message: '请输入角色' }]}>
              <Input
                placeholder="请输入角色"
                value={user.role}
                onChange={(event) => {
                  changeUser({ role: Number(event.currentTarget.value) })
                }}
                disabled
              />
              <Button type="link" onClick={() => editUserRoleDrawerRef.current?.open(user)}>
                编辑用户角色
              </Button>
            </Form.Item>
          </Col>
        </Row>
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

export const EditUserDrawer = React.forwardRef(Component)
