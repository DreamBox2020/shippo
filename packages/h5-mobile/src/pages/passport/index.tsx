import { Button, Input, List, Toast } from 'antd-mobile'
import React, { useMemo, useState } from 'react'
import { COLOR_PINK } from '~/constants/color'
import { services } from '@shippo/sdk-services'
import { checkPhone, checkQQEmail, checkSmsCode } from '@shippo/sdk-utils'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'
import styled from 'styled-components'

const StyledList = styled(List)`
  > .adm-list-inner > .adm-list-item:not(:first-child) > .adm-list-item-content {
    border-bottom: unset;
  }
`

export const Passport = () => {
  const [_phone, setPhone] = useState('')
  const [code, setCode] = useState('')

  const phone = useMemo(() => _phone.replace(/\s/g, ''), [_phone])

  const handleLogon = async () => {
    console.log('handleLogon', { phone, code })

    if (!checkSmsCode(code)) {
      return Toast.show({
        icon: 'fail',
        content: '短信验证码格式错误',
      })
    }

    // 如果是qq邮箱
    if (checkQQEmail(phone)) {
      const { data } = await services.user.login({
        email: phone,
        code,
      })
      window.localStorage.setItem('__PASSPORT', data.resource.passport)
      window.location.reload()
      return
    }

    if (!checkPhone(phone)) {
      return Toast.show({
        icon: 'fail',
        content: '手机号格式错误',
      })
    }

    const { data } = await services.user.login({
      phone,
      code,
    })
    window.localStorage.setItem('__PASSPORT', data.resource.passport)
    window.location.reload()
  }

  const handleSmsSend = () => {
    console.log('handleSmsSend', { phone })

    // 如果是qq邮箱
    if (checkQQEmail(phone)) {
      services.captcha.send({ email: phone })
    } else {
      if (!checkPhone(phone)) {
        return Toast.show({
          icon: 'fail',
          content: '手机号格式错误',
        })
      }
      services.captcha.send({ phone })
    }

    Toast.show({
      icon: 'success',
      content: '验证码已经发送',
    })
  }

  return (
    <Container direction="vertical">
      <Header
        style={{
          height: '80px',
          textAlign: 'center',
          lineHeight: '80px',
          fontSize: '30px',
        }}
      >
        Shippo
      </Header>
      <Main>
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
          <List.Item prefix="短信验证码" extra={<span onClick={handleSmsSend}>发送验证码</span>}>
            <Input
              placeholder="请输入验证码"
              clearable
              value={code}
              onChange={(value) => setCode(value)}
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

export default Passport
