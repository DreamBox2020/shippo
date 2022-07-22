import React, { useCallback, useMemo } from 'react'
import { services } from '@shippo/sdk-services'
import { checkPhone, checkQQEmail, checkSmsCode } from '@shippo/sdk-utils'
import { Form, Input, Button, message, Layout } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  CopyrightOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userActions, userGetters } from '@shippo/sdk-stores'
import { useLockFn, useMount } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { useLimitLock } from '~/hooks/use-limit-lock'

const { Header, Footer, Content } = Layout

export const PagePassport = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()

  const redirect = useMemo(() => {
    const str = searchParams.get('redirect') || ''
    return decodeURIComponent(str)
  }, [searchParams])

  const goto = useCallback(
    (to: string = '/') => {
      navigate(redirect ? redirect : to, { replace: true })
    },
    [redirect, navigate]
  )

  const __handleSmsSend = useCallback((phone: string) => {
    console.log('handleSmsSend', { phone })
    if (!checkPhone(phone)) {
      message.info('手机号格式错误')
      return
    }
    services.captcha.send({ phone })
    message.success('验证码已经发送')
  }, [])

  const __handleSmsSendLimit = useCallback(() => {
    message.error('点的太快了，请过三分钟再尝试。')
  }, [])

  const handleSmsSend = useLimitLock(__handleSmsSend, __handleSmsSendLimit, 180)

  const [form] = Form.useForm<{ phone: string; captcha: string }>()

  const __onFinish = useCallback(
    async (values: { phone: string; captcha: string }) => {
      console.log('Received values of form: ', values)
      const { phone, captcha: code } = values

      if (!checkSmsCode(code)) {
        return message.info('短信验证码格式错误')
      }

      // 如果是qq邮箱
      if (checkQQEmail(phone)) {
        const { data } = await services.user.login({
          email: phone,
          code,
        })
        window.localStorage.setItem('__PASSPORT', data.resource.passport)
        window.localStorage.setItem(
          '__USER_INFO',
          JSON.stringify(data.resource)
        )
        dispatch(userActions.userUpdateInfo(data.resource))
        goto()
        console.log('jump')
        return
      }

      if (!checkPhone(phone)) {
        return message.info('手机号格式错误')
      }

      try {
        const { data } = await services.user.login({
          phone,
          code,
        })
        window.localStorage.setItem('__PASSPORT', data.resource.passport)
        window.localStorage.setItem(
          '__USER_INFO',
          JSON.stringify(data.resource)
        )
        dispatch(userActions.userUpdateInfo(data.resource))
        goto()
        console.log('jump')
      } catch (error) {
        console.error(error)
        message.error((error as any).data.message)
      }
    },
    [dispatch, goto]
  )

  const onFinish = useLockFn(__onFinish)

  return (
    <Layout>
      <Header
        style={{
          background: 'transparent',
          textAlign: 'center',
          height: '200px',
          lineHeight: '200px',
        }}
      >
        <span
          style={{
            color: 'rgba(0,0,0,.85)',
            fontWeight: 600,
            fontSize: '33px',
          }}
        >
          Shippo
        </span>
      </Header>
      <Content>
        <div style={{ width: '328px', margin: '0 auto' }}>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="phone"
              rules={[{ required: true, message: '请输入你的手机号！' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="请输入你的手机号！"
                style={{ width: '100%' }}
                allowClear
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[{ required: true, message: '请输入验证码！' }]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="请输入验证码！"
                    style={{
                      flex: 1,
                      marginRight: 8,
                    }}
                    size="large"
                  />
                </Form.Item>
                <Button
                  style={{
                    display: 'block',
                  }}
                  onClick={() => handleSmsSend(form.getFieldValue('phone'))}
                  size="large"
                >
                  获取验证码
                </Button>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                size="large"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          marginBottom: '25px',
          color: 'rgba(0,0,0,.45)',
          fontSize: '14px',
        }}
      >
        <CopyrightOutlined /> 2021 Shippo
      </Footer>
    </Layout>
  )
}

const withOnlyNotLogon = (CurrentComponent: React.ComponentType) => () => {
  const navigate = useNavigate()
  const userInfo = useSelector(userGetters.infoGetter())
  useMount(() => {
    if (userInfo.uid > 0) {
      navigate('/', { replace: true })
    }
  })
  return <CurrentComponent />
}

export default withOnlyNotLogon(PagePassport)
