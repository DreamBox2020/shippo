import React, { useImperativeHandle, useState, useCallback, useMemo } from 'react'
import { Drawer, Space, Button, Form, Row, Col, Input, message } from 'antd'
import { services } from '@shippo/sdk-services'
import { IPermissionPolicy, __permissionPolicy } from '@shippo/types'

const __defaultPolicy = __permissionPolicy()

export interface EditPolicyDrawerRef {
  open: (policy?: IPermissionPolicy) => void
}

export interface EditPolicyDrawerProps {
  onClose?: () => void
}

const Component: React.ForwardRefRenderFunction<EditPolicyDrawerRef, EditPolicyDrawerProps> = (
  props,
  ref
) => {
  const { onClose } = props
  const [policy, setPolicy] = useState<IPermissionPolicy>(__defaultPolicy)

  const [visible, setVisible] = useState(false)

  const isUpdate = useMemo(() => {
    return policy.id !== 0
  }, [policy])

  // ref
  useImperativeHandle(ref, () => {
    return {
      // 打开抽屉
      open: (policy?: IPermissionPolicy) => {
        if (policy) {
          setPolicy({ ...policy })
        } else {
          setPolicy(__permissionPolicy())
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

  // 更改policy
  const changePolicy = useCallback((policy: Partial<IPermissionPolicy>) => {
    setPolicy((old) => ({ ...old, ...policy }))
  }, [])

  const handleSave = useCallback(async () => {
    console.log(policy)
    if (isUpdate) {
      const hr = await services.permissionPolicy.update({
        id: policy.id,
        policyName: policy.policyName,
        remark: policy.remark,
      })
      if (hr.data.success) {
        message.success('成功')
        closeDrawer()
      } else {
        message.success('失败')
      }
    } else {
      const hr = await services.permissionPolicy.create({
        policyName: policy.policyName,
        remark: policy.remark,
      })
      if (hr.data.success) {
        message.success('成功')
        closeDrawer()
      } else {
        message.success('失败')
      }
    }
  }, [isUpdate, policy, closeDrawer])

  return (
    <Drawer
      title={isUpdate ? '编辑权限策略' : '新增权限策略'}
      width={720}
      onClose={closeDrawer}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form layout="vertical" requiredMark={false}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="权限策略名称"
              rules={[{ required: true, message: '请输入权限策略名称' }]}
            >
              <Input
                placeholder="请输入权限策略名称"
                value={policy.policyName}
                onChange={(event) => {
                  changePolicy({ policyName: event.currentTarget.value })
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="描述" rules={[{ required: true, message: '请输入描述' }]}>
              <Input
                placeholder="请输入描述"
                value={policy.remark}
                onChange={(event) => {
                  changePolicy({ remark: event.currentTarget.value })
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

export const EditPolicyDrawer = React.forwardRef(Component)
