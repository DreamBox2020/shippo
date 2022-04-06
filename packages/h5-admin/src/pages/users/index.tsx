import { PlusOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Avatar, Button, Input, message, Modal, Space, Table } from 'antd'
import React, { useRef, useState } from 'react'
import { useCallback } from 'react'
import { checkQQ } from '@shippo/sdk-utils'
import { IUser, services } from '@shippo/sdk-services'
import { EditUserDrawer, EditUserDrawerRef } from './components/edit-user-drawer'
import { ColumnsType } from 'antd/lib/table'

const data: (IUser & { roleName: string })[] = [
  {
    id: 1,
    phone: '111******11',
    email: '88*******@qq.com',
    nickname: '测试帐号',
    avatar: '',
    exp: 99999,
    coin: 666,
    role: 0,
    roleName: 'admin',
    createdAt: '2022-01-01 22:22:22',
  },
]

export const Users = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const editUserDrawerRef = useRef<EditUserDrawerRef>(null)

  const [qq, setQQ] = useState('')

  const handleUserCreate = useCallback(async (qq: string) => {
    if (!checkQQ(qq)) {
      return message.info('QQ号格式错误')
    }

    try {
      const hr = await services.admin.user__create({ email: qq + '@qq.com' })
      if (hr.data.success) {
        message.success('成功')
      }
    } catch (error) {
      console.log(error)
      message.error('失败')
    }
  }, [])

  const columns: ColumnsType<IUser & { roleName: string }> = [
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
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" onClick={() => editUserDrawerRef.current?.open(record)}>
            编辑用户
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <EditUserDrawer ref={editUserDrawerRef} />
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
        pagination={{ position: ['bottomCenter'] }}
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
