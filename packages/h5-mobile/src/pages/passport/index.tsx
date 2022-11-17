import React, { useCallback, useMemo, useState } from 'react'
import { services } from '@shippo/sdk-services'
import { Button, Input, List, NavBar, Toast } from 'antd-mobile'
import { COLOR_PINK } from '~/constants/color'
import { checkPhone, checkQQEmail, checkSmsCode } from '@shippo/sdk-utils'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { userActions, userGetters } from '@shippo/sdk-stores'
import { useLockFn, useMount } from 'ahooks'
import { useLimitLock } from '~/hooks/use-limit-lock'
import { useSearchParams } from 'react-router-dom'

const StyledList = styled(List)`
  > .adm-list-inner
    > .adm-list-item:not(:first-child)
    > .adm-list-item-content {
    border-bottom: unset;
  }
`

const Component = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()

  const channel = useMemo(() => {
    const str = searchParams.get('channel') || ''
    return str
  }, [searchParams])

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

  const [_phone, setPhone] = useState('')
  const [code, setCode] = useState('')

  const phone = useMemo(() => _phone.replace(/\s/g, ''), [_phone])

  const __handleLogon = useCallback(async () => {
    console.log('handleLogon', { phone, code })

    if (!checkSmsCode(code)) {
      Toast.show({
        icon: 'fail',
        content: '短信验证码格式错误',
      })
      return
    }

    // 如果是qq邮箱
    if (checkQQEmail(phone)) {
      const { data } = await services.user.login({
        email: phone,
        code,
      })
      window.localStorage.setItem('__PASSPORT', data.resource.passport)
      window.localStorage.setItem('__USER_INFO', JSON.stringify(data.resource))
      dispatch(userActions.userUpdateInfo(data.resource))
      goto()
      console.log('jump')
      return
    }

    if (!checkPhone(phone)) {
      Toast.show({
        icon: 'fail',
        content: '手机号格式错误',
      })
      return
    }

    try {
      const { data } = await services.user.login({
        phone,
        code,
      })
      window.localStorage.setItem('__PASSPORT', data.resource.passport)
      window.localStorage.setItem('__USER_INFO', JSON.stringify(data.resource))
      dispatch(userActions.userUpdateInfo(data.resource))
      goto()
      console.log('jump')
    } catch (error) {
      console.error(error)
      Toast.show({
        icon: 'fail',
        content: (error as any).data.message,
      })
    }
  }, [code, dispatch, goto, phone])

  const handleLogon = useLockFn(__handleLogon)

  const __handleSmsSend = useCallback(() => {
    console.log('handleSmsSend', { phone })

    try {
      // 如果是qq邮箱
      if (checkQQEmail(phone)) {
        services.captcha.send({ email: phone })
      } else {
        if (!checkPhone(phone)) {
          Toast.show({
            icon: 'fail',
            content: '手机号格式错误',
          })
          return
        }

        services.captcha.send({ phone })
      }
    } catch (error) {
      console.error(error)
      Toast.show({
        icon: 'fail',
        content: (error as any).data.message,
      })
      return
    }

    Toast.show({
      icon: 'success',
      content: '验证码已经发送',
    })
  }, [phone])

  const __handleSmsSendLimit = useCallback(() => {
    Toast.show({
      icon: 'fail',
      content: '点的太快了，请过三分钟再尝试。',
    })
  }, [])

  const handleSmsSend = useLimitLock(__handleSmsSend, __handleSmsSendLimit, 180)

  return (
    <Container direction="vertical">
      {channel === 'wx' ? (
        <Header
          style={{
            height: '45px',
            lineHeight: '45px',
            backgroundColor: '#fff',
            textAlign: 'center',
            fontSize: '18px',
          }}
        >
          <NavBar
            onBack={() => {
              navigate(-1)
            }}
          ></NavBar>
        </Header>
      ) : null}

      <Main>
        <div
          style={{
            height: '80px',
            textAlign: 'center',
            lineHeight: '80px',
            fontSize: '30px',
          }}
        >
          Shipppo
        </div>
        <StyledList
          style={{
            '--prefix-width': '6em',
            border: 'unset',
          }}
        >
          <List.Item prefix="手机号">
            <Input
              placeholder="请输入手机号"
              clearable
              value={_phone}
              onChange={(value) => setPhone(value)}
            />
          </List.Item>
          <List.Item
            prefix="短信验证码"
            extra={<span onClick={handleSmsSend}>发送验证码</span>}
          >
            <Input
              placeholder="请输入验证码"
              clearable
              value={code}
              onChange={(value) => setCode(value.substring(0, 6))}
            />
          </List.Item>
          <List.Item
            style={{
              backgroundColor: '#f5f5f9',
            }}
          >
            <Button
              block
              style={{ background: COLOR_PINK, color: '#fff' }}
              size="large"
              onClick={handleLogon}
            >
              登陆
            </Button>
          </List.Item>
        </StyledList>
      </Main>
    </Container>
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

export const PagePassport = withOnlyNotLogon(Component)

export default PagePassport
