import { PlusOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Avatar, Button, Input, message, Modal, Space, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useCallback } from 'react'
import { checkQQ, formatTimeStr } from '@shippo/sdk-utils'
import { services } from '@shippo/sdk-services'
import { IUserExtRoleName } from '@shippo/types'

import { EditUserDrawer, EditUserDrawerRef } from './components/edit-user-drawer'
import { ColumnsType } from 'antd/lib/table'
import { useMount } from 'ahooks'

export const Users = () => {
  const [data, setData] = useState<IUserExtRoleName[]>()
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)

  const [isModalVisible, setIsModalVisible] = useState(false)

  const editUserDrawerRef = useRef<EditUserDrawerRef>(null)

  const [qq, setQQ] = useState('')

  const handleUserCreate = useCallback(async (qq: string) => {
    if (!checkQQ(qq)) {
      return message.info('QQ号格式错误')
    }

    try {
      const hr = await services.user.create({ email: qq + '@qq.com' })
      if (hr.data.success) {
        message.success('成功')
      }
    } catch (error) {
      console.log(error)
      message.error('失败')
    }
  }, [])

  const columns: ColumnsType<IUserExtRoleName> = [
    {
      title: 'UID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (value) => {
        return <Avatar shape="square" size="small" icon={<UserOutlined />} />
      },
    },
    {
      title: '经验',
      dataIndex: 'exp',
      key: 'exp',
    },
    {
      title: '硬币',
      dataIndex: 'coin',
      key: 'coin',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button type="link" onClick={() => editUserDrawerRef.current?.open(record)}>
              编辑用户
            </Button>
          </Space>
        )
      },
    },
  ]

  const updateTable = useCallback(() => {
    services.user
      .find_all({
        pageSize: 20,
        current,
      })
      .then((hr) => {
        setData(
          hr.data.resource.items.map((item) => {
            return { ...item, createdAt: formatTimeStr(item.createdAt) }
          })
        )
        setTotal(hr.data.resource.total)
      })
  }, [current])

  useEffect(() => {
    updateTable()
  }, [updateTable])

  return (
    <div>
      <EditUserDrawer ref={editUserDrawerRef} onClose={() => updateTable()} />
      <Space size="middle">
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          新增邮箱用户
        </Button>
      </Space>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={{
          position: ['bottomCenter'],
          pageSize: 20,
          total,
          current,
          showSizeChanger: false,
          size: 'default',
          onChange: (page: number, pageSize: number) => {
            setCurrent(page)
          },
        }}
        size="small"
      />

      <Modal
        title="新增邮箱用户"
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(false)
          handleUserCreate(qq)
        }}
        onCancel={() => setIsModalVisible(false)}
      >
        <Alert message="只需要输入QQ号即可，不需要后戳。（@qq.com）" type="warning" />
        <Input placeholder="QQ号" value={qq} onChange={(event) => setQQ(event.target.value)} />
      </Modal>
    </div>
  )
}

export default Users
