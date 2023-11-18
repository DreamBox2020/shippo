import { useImperativeHandle, useState, useCallback, useMemo, forwardRef } from 'react'
import { Drawer, Space, Button, Form, Row, Col, Input, message } from 'antd'
import { services } from '@shippo/sdk-services'
import { IPermissionAccess, __permissionAccess } from '@shippo/sdk-types'

const __defaultAccess = __permissionAccess()

export interface EditAccessDrawerRef {
  open: (access?: IPermissionAccess) => void
}

export interface EditAccessDrawerProps {
  onClose?: () => void
}

const Component: React.ForwardRefRenderFunction<EditAccessDrawerRef, EditAccessDrawerProps> = (
  props,
  ref
) => {
  const { onClose } = props
  const [access, setAccess] = useState<IPermissionAccess>(__defaultAccess)

  const [visible, setVisible] = useState(false)

  const isUpdate = useMemo(() => {
    return access.id !== 0
  }, [access])

  // ref
  useImperativeHandle(ref, () => {
    return {
      // 打开抽屉
      open: (access?: IPermissionAccess) => {
        if (access) {
          setAccess({ ...access })
        } else {
          setAccess(__permissionAccess())
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

  // 更改access
  const changeAccess = useCallback((access: Partial<IPermissionAccess>) => {
    setAccess((old) => ({ ...old, ...access }))
  }, [])

  const handleSave = useCallback(async () => {
    console.log(access)
    if (isUpdate) {
      const hr = await services.permissionAccess.update({
        id: access.id,
        accessRule: access.accessRule,
        accessType: access.accessType,
        remark: access.remark,
      })
      if (hr.data.success) {
        message.success('成功')
        closeDrawer()
      } else {
        message.success('失败')
      }
    } else {
      const hr = await services.permissionAccess.create({
        accessRule: access.accessRule,
        accessType: access.accessType,
        remark: access.remark,
      })
      if (hr.data.success) {
        message.success('成功')
        closeDrawer()
      } else {
        message.success('失败')
      }
    }
  }, [isUpdate, access, closeDrawer])

  return (
    <Drawer
      title={isUpdate ? '编辑访问规则' : '新增访问规则'}
      width={720}
      onClose={closeDrawer}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form layout="vertical" requiredMark={false}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="访问规则表达式"
              rules={[{ required: true, message: '请输入访问规则表达式' }]}
            >
              <Input
                placeholder="请输入访问规则表达式"
                value={access.accessRule}
                onChange={(event) => {
                  changeAccess({ accessRule: event.currentTarget.value })
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="描述" rules={[{ required: true, message: '请输入描述' }]}>
              <Input
                placeholder="请输入描述"
                value={access.remark}
                onChange={(event) => {
                  changeAccess({ remark: event.currentTarget.value })
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="访问规则类型"
              rules={[{ required: true, message: '请输入访问规则类型' }]}
            >
              <Input
                placeholder="请输入访问规则类型"
                value={access.accessType}
                onChange={(event) => {
                  changeAccess({ accessType: event.currentTarget.value })
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

export const EditAccessDrawer = forwardRef(Component)
