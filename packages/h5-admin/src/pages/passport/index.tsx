import React, { useMemo, useState } from 'react'
import { COLOR_PINK } from '~/constants/color'
import { services } from '@shippo/sdk-services'
import { checkPhone, checkSmsCode } from '~/utils'
import { Form, Input, Row, Col, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

export const Passport = () => {
  const handleSmsSend = (phone: string) => {
    console.log('handleSmsSend', { phone })
    if (!checkPhone(phone)) {
      return message.info('手机号格式错误')
    }
    services.sms.send({ phone })
    message.success('验证码已经发送')
  }

  const [form] = Form.useForm<{ phone: string; captcha: string }>()

  const onFinish = async (values: { phone: string; captcha: string }) => {
    console.log('Received values of form: ', values)
    const { phone, captcha: code } = values

    if (!checkPhone(phone)) {
      return message.info('手机号格式错误')
    }
    if (!checkSmsCode(code)) {
      return message.info('短信验证码格式错误')
    }
    const { data } = await services.user.login({
      phone,
      code,
    })
    window.localStorage.setItem('__PASSPORT', data.resource.passport)
    window.location.reload()
  }

  return (
    <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item name="phone" rules={[{ required: true, message: '请输入你的手机号！' }]}>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[{ required: true, message: '请输入验证码！' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button onClick={() => handleSmsSend(form.getFieldValue('phone'))}>获取验证码</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Passport
