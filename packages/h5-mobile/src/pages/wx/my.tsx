import { services } from '@shippo/sdk-services'
import { userGetters } from '@shippo/sdk-stores'
import { __wxPassport } from '../sdk-types/types'
import { List, Image, Toast, Modal } from 'antd-mobile'
import { ExclamationOutline } from 'antd-mobile-icons'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import styled from '@emotion/styled'
import notavatar from '~/assets/notavatar.jpg'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'
import { WhiteSpace } from '~/components/white-space'

const StyledList = styled(List)`
  .adm-list-item-content-prefix {
    padding-top: 12px;
    padding-bottom: 12px;
  }
`

const defaultWxPassport = __wxPassport()

export const WxMyPage = () => {
  // 用户信息
  const userInfo = useSelector(userGetters.infoGetter())
  const navigate = useNavigate()

  const [point, setPoint] = useState(0)
  const [wxInfo, setWxInfo] = useState(defaultWxPassport)

  useEffect(() => {
    if (userInfo.uid > 0) {
      services.wxPassport.find().then((hr) => {
        setWxInfo(hr.data.resource)
      })
    }
  }, [userInfo.uid])

  return (
    <Container direction="vertical">
      <Header
        style={{
          height: '45px',
          lineHeight: '45px',
          backgroundColor: '#fff',
          textAlign: 'center',
          fontSize: '18px',
        }}
      >
        我的
      </Header>
      <Main>
        <WhiteSpace size={15} />
        <StyledList>
          <List.Item
            onClick={() => {
              if (userInfo.uid === 0) {
                Toast.show({
                  icon: <ExclamationOutline />,
                  content: '请先登录',
                })
                navigate('/passport?channel=wx')
              }
            }}
            prefix={
              <Image
                src={wxInfo.avatarUrl || notavatar}
                style={{ borderRadius: '25px' }}
                fit="cover"
                width="50px"
                height="50px"
              />
            }
          >
            {userInfo.uid ? wxInfo.nickname || '暂无昵称' : '未登录'}
          </List.Item>
        </StyledList>
        <WhiteSpace size={15} />
        <List>
          {/* <List.Item
            onClick={() => {
              Toast.show({
                content: '开发中',
              })
            }}
          >
            浏览记录
          </List.Item>
          <List.Item
            onClick={() => {
              Toast.show({
                content: '开发中',
              })
            }}
          >
            通知
          </List.Item> */}
          <List.Item
            onClick={() => {
              Modal.show({
                content: (
                  <div>
                    <h3>Shippo</h3>
                    <p>Version 1.0.0</p>
                  </div>
                ),
                closeOnMaskClick: true,
              })
              if (point > 15) {
                window.localStorage.setItem('__SHIPPO_DEBUG', 'true')
              } else {
                setPoint(point + 1)
              }
            }}
          >
            关于
          </List.Item>
        </List>
      </Main>
    </Container>
  )
}

export default WxMyPage
