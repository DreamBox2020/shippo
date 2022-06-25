import React, { useImperativeHandle, useState, useCallback, useMemo } from 'react'
import { Drawer, Space, Button, Form, Row, Col, Input, message } from 'antd'
import { services } from '@shippo/sdk-services'
import { IRole, __role } from '@shippo/types'

const __defaultRole = __role()

export interface EditRoleDrawerRef {
  open: (role?: IRole) => void
}

export interface EditRoleDrawerProps {
  onClose?: () => void
}

const Component: React.ForwardRefRenderFunction<EditRoleDrawerRef, EditRoleDrawerProps> = (
  props,
  ref
) => {
  const { onClose } = props
  const [role, setRole] = useState<IRole>(__defaultRole)

  const [visible, setVisible] = useState(false)

  const isUpdate = useMemo(() => {
    return role.id !== 0
  }, [role])

  // ref
  useImperativeHandle(ref, () => {
    return {
      // 打开抽屉
      open: (role?: IRole) => {
        if (role) {
          setRole({ ...role })
        } else {
          setRole(__role())
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

  // 更改role
  const changeRole = useCallback((role: Partial<IRole>) => {
    setRole((old) => ({ ...old, ...role }))
  }, [])

  const handleSave = useCallback(async () => {
    console.log(role)
    if (isUpdate) {
      const hr = await services.role.update({
        id: role.id,
        roleName: role.roleName,
        remark: role.remark,
      })
      if (hr.data.success) {
        message.success('成功')
        closeDrawer()
      } else {
        message.success('失败')
      }
    } else {
      const hr = await services.role.create({ roleName: role.roleName, remark: role.remark })
      if (hr.data.success) {
        message.success('成功')
        closeDrawer()
      } else {
        message.success('失败')
      }
    }
  }, [isUpdate, role, closeDrawer])

  return (
    <Drawer
      title={isUpdate ? '编辑角色' : '新增角色'}
      width={720}
      onClose={closeDrawer}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form layout="vertical" requiredMark={false}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="角色名称" rules={[{ required: true, message: '请输入角色名称' }]}>
              <Input
                placeholder="请输入角色名称"
                value={role.roleName}
                onChange={(event) => {
                  changeRole({ roleName: event.currentTarget.value })
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="描述" rules={[{ required: true, message: '请输入描述' }]}>
              <Input
                placeholder="请输入描述"
                value={role.remark}
                onChange={(event) => {
                  changeRole({ remark: event.currentTarget.value })
                }}
              />
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

export const EditRoleDrawer = React.forwardRef(Component)
