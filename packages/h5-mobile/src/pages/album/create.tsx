import { ImageUploader, Input, NavBar, TextArea } from 'antd-mobile'
import { CheckOutline, PictureOutline } from 'antd-mobile-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'

export const AlbumCreate = () => {
  const navigate = useNavigate()
  const [fileList, setFileList] = useState<ImageUploadItem[]>([])
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
        <NavBar
          right={
            <CheckOutline style={{ fontSize: 24, verticalAlign: 'middle' }} />
          }
          onBack={() => navigate(-1)}
        >
          创建相簿
        </NavBar>
      </Header>
      <Main style={{ padding: 10, background: '#fff' }}>
        <Input placeholder="请输入相簿名称" clearable />
        <TextArea
          style={{ border: '1px solid #dadadf' }}
          placeholder="请输入相簿简介"
          rows={3}
        />
      </Main>
    </Container>
  )
}

export default AlbumCreate
