import { Button, Flex, InputItem, WhiteSpace, WingBlank } from 'antd-mobile'
import React, { useState } from 'react'
import { COLOR_PINK } from '~/constants/config'
import { v4 as uuidv4 } from 'uuid'

export const Passport = () => {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')

  const callLogon = () => {
    console.log('callLogon', { phone, code })
  }

  const callSmsSend = () => {
    fetch('http://127.0.0.1:8233/sms/send', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        passport: '8434e93235a9478c957bdb5cabcb9216',
        session: uuidv4(),
        resource: JSON.stringify({
          phone: phone.replace(/ /g, ''),
        }),
        sign: '',
        other: null,
      }),
    })
  }

  return (
    <div>
      <InputItem
        type="phone"
        placeholder="请输入手机号码"
        onChange={(value) => setPhone(value)}
        value={phone}
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
        <Button style={{ flex: 1 }} onClick={callSmsSend}>
          获取验证码
        </Button>
      </Flex>

      <WhiteSpace size="lg" />

      <WingBlank>
        <Button style={{ background: COLOR_PINK, color: '#fff' }} onClick={callLogon}>
          登陆
        </Button>
      </WingBlank>
    </div>
  )
}

export default Passport
