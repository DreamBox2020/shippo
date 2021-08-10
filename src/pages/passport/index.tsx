import { Button, Flex, InputItem, Toast, WhiteSpace, WingBlank } from 'antd-mobile'
import React, { useMemo, useState } from 'react'
import { COLOR_PINK } from '~/constants/color'
import { services } from '~/services'
import { checkPhone, checkSmsCode } from '~/utils'

export const Passport = () => {
  const [_phone, setPhone] = useState('')
  const [code, setCode] = useState('')

  const phone = useMemo(() => _phone.replace(/\s/g, ''), [_phone])

  const handleLogon = async () => {
    console.log('handleLogon', { phone, code })
    if (!checkPhone(phone)) {
      return Toast.info('手机号格式错误')
    }
    if (!checkSmsCode(code)) {
      return Toast.info('短信验证码格式错误')
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
    if (!checkPhone(phone)) {
      return Toast.info('手机号格式错误')
    }
    services.sms.send({ phone })
    Toast.success('验证码已经发送')
  }

  return (
    <div>
      <InputItem
        type="phone"
        placeholder="请输入手机号码"
        onChange={(value) => setPhone(value)}
        value={_phone}
      >
        手机号码
      </InputItem>

      <Flex>
        <InputItem
          style={{ flex: 3 }}
          type="number"
          placeholder="请输入验证码"
          onChange={(value) => setCode(value)}
          value={code}
        >
          验证码
        </InputItem>
        <Button style={{ flex: 1 }} onClick={handleSmsSend}>
          获取验证码
        </Button>
      </Flex>

      <WhiteSpace size="lg" />

      <WingBlank>
        <Button style={{ background: COLOR_PINK, color: '#fff' }} onClick={handleLogon}>
          登陆
        </Button>
      </WingBlank>
    </div>
  )
}

export default Passport
