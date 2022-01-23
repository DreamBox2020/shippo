import { PlusOutlined } from '@ant-design/icons'
import { Alert, Button, Input, message, Modal } from 'antd'
import React, { useState } from 'react'
import { useCallback } from 'react'
import { checkQQ } from '@shippo/sdk-utils'
import { services } from '@shippo/sdk-services'

export const Users = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
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

  return (
    <div>
      <h1>Users</h1>
      <Button
        type="primary"
        shape="round"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        新增邮箱用户
      </Button>
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
