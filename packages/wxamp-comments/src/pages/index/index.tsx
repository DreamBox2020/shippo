import React, { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, WebView } from '@tarojs/components'

const Index: React.FC = () => {
  const [wxCode, setWxCode] = useState('')

  useEffect(() => {
    Taro.login().then(result => {
      console.log(result)
      setWxCode(result.code)
    })
  }, [])

  return wxCode ? (
    <WebView
      src={
        'http://localhost:3000/?t=' +
        new Date().getTime() +
        '#?wxCode=' +
        wxCode
      }
    />
  ) : (
    <View>loading....</View>
  )
}

export default Index
