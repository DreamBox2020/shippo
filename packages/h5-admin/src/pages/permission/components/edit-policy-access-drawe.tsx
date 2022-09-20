import { services } from '@shippo/sdk-services'
import {
  IPermissionPolicy,
  IPermissionAccess,
  __permissionPolicy,
} from '@shippo/types'

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
import React, {
  useEffect,
  useImperativeHandle,
  useState,
  useCallback,
  useMemo,
} from 'react'

const __defaultPolicy = __permissionPolicy()

const columns = [
  {
    title: '访问规则名称',
    dataIndex: 'accessRule',
    key: 'accessRule',
  },
  {
    title: '描述',
    dataIndex: 'remark',
    key: 'remark',
  },
]

export interface EditPolicyAccessDrawerRef {
  open: (policy: IPermissionPolicy) => void
}

export interface EditPolicyAccessDrawerProps {
  onClose?: () => void
}

const Component: React.ForwardRefRenderFunction<
  EditPolicyAccessDrawerRef,
  EditPolicyAccessDrawerProps
> = (props, ref) => {
  const { onClose } = props
  const [policy, setPolicy] = useState<IPermissionPolicy>(__defaultPolicy)
  const [dataSource, setDataSource] = useState<IPermissionAccess[]>([])

  const [visible, setVisible] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])

  // ref
  useImperativeHandle(ref, () => {
    return {
      // 打开抽屉
      open: (policy: IPermissionPolicy) => {
        services.permissionAccess
          .find_all_ext_status({ id: policy.id })
          .then((hr) => {
            setDataSource(hr.data.resource)
            setSelectedRowKeys(
              hr.data.resource
                .filter((item) => item.status)
                .map((item) => item.id)
            )
          })
        setPolicy(policy)
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
    console.log(policy)
    services.permissionPolicy.update_access({
      id: policy.id,
      access: selectedRowKeys,
    })
    closeDrawer()
  }, [policy, selectedRowKeys, closeDrawer])

  return (
    <Drawer
      title="访问规则配置"
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

export const EditPolicyAccessDrawer = React.forwardRef(Component)
