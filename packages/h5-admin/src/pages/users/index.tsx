import { PlusOutlined } from '@ant-design/icons'
import { Alert, Button, Drawer, Input, message, Modal, Space, Table } from 'antd'
import React, { useState } from 'react'
import { useCallback } from 'react'
import { checkQQ } from '@shippo/sdk-utils'
import { services } from '@shippo/sdk-services'

const data = [
  {
    key: 1,
    id: 1,
    phone: '111******11',
    email: '88*******@qq.com',
    nickname: '测试帐号',
    exp: 99999,
    coin: 666,
    role: 'admin',
    createdAt: '2022-01-01 22:22:22',
  },
]

export const Users = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalVisible2, setIsModalVisible2] = useState(false)
  const [isDrawerVisible, setDrawerVisible] = useState(false)

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

  const columns = [
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
      render: (_: any, data: any) => (
        <Space size="middle">
          <Button type="link" onClick={() => setDrawerVisible(true)}>
            编辑用户
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
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
      <Table columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }} />

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

      <Drawer
        title="编辑用户"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={isDrawerVisible}
      >
        <p>UID：</p>
        <p>昵称：</p>
        <p>
          角色：{' '}
          <Button type="link" onClick={() => setIsModalVisible2(true)}>
            修改角色
          </Button>
        </p>
      </Drawer>

      <Modal
        title="修改角色"
        visible={isModalVisible2}
        onOk={() => {
          setIsModalVisible2(false)
        }}
        onCancel={() => setIsModalVisible2(false)}
      >
        <Table
          rowSelection={{}}
          columns={[
            {
              title: '角色名称',
              dataIndex: 'roleName',
              key: 'roleName',
            },
            {
              title: '描述',
              dataIndex: 'remark',
              key: 'remark',
            },
          ]}
          dataSource={[
            {
              key: 1,
              roleName: 'admin',
              remark: '管理员',
            },
            {
              key: 2,
              roleName: 'user',
              remark: '用户',
            },
            {
              key: 3,
              roleName: 'root',
              remark: '系统超级用户',
            },
          ]}
          size="small"
        />
      </Modal>
    </div>
  )
}

export default Users
