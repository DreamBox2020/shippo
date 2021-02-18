import { Button, Flex, InputItem, WhiteSpace, WingBlank } from 'antd-mobile'
import React, { useState } from 'react'
import { COLOR_PINK } from '~/constants/config'

export const Passport = () => {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')

  const callLogon = () => {
    console.log('callLogon', { phone, code })
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
        <Button style={{ flex: 1 }}>获取验证码</Button>
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
