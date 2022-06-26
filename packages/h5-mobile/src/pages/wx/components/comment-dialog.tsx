import { services } from '@shippo/sdk-services'
import { Dialog, TextArea, Toast } from 'antd-mobile'
import { forwardRef, useImperativeHandle, useState } from 'react'

export interface CommentDialogRef {
  open: (id: number, isReply?: boolean, isManage?: boolean) => void
}

export interface CommentDialogProps {
  onCancel?: () => void
  onConfirm?: () => void
}

const Component: React.ForwardRefRenderFunction<CommentDialogRef, CommentDialogProps> = (
  props,
  ref
) => {
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState(0)
  const [isReply, setIsReply] = useState(false)
  const [isManage, setIsManage] = useState(false)
  const [content, setContent] = useState('')

  // ref
  useImperativeHandle(ref, () => {
    return {
      // 打开对话框
      open: (id: number, isReply: boolean = false, isManage: boolean = false) => {
        setId(id)
        setIsReply(isReply)
        setIsManage(isManage)
        setContent('')
        setVisible(true)
      },
    }
  })

  return (
    <Dialog
      visible={visible}
      closeOnAction
      title={isReply ? '回复留言' : '写留言'}
      content={
        <TextArea
          placeholder={`${isReply ? '回复' : '留言'}被精选后，对所有人可见`}
          showCount
          rows={4}
          maxLength={233}
          value={content}
          onChange={(value) => setContent(value.trim())}
        />
      }
      actions={[
        [
          {
            key: 'cancel',
            text: '取消',
            onClick: () => {
              setVisible(false)
              props.onCancel && props.onCancel()
            },
          },
          {
            key: 'confirm',
            text: '确认',
            onClick: async () => {
              if (!content.trim().length) {
                Toast.show({
                  icon: 'fail',
                  content: '内容为空',
                })
                return
              }

              if (content.trim().length > 233) {
                Toast.show({
                  icon: 'fail',
                  content: '内容不能超过233个字符',
                })
                return
              }

              if (id <= 0) {
                Toast.show({
                  icon: 'fail',
                  content: '未知错误，请重试',
                })
                return
              }

              try {
                if (isManage) {
                } else if (isReply) {
                  await services.wxComment.reply({ id, content })
                } else {
                  await services.wxComment.create({ articleId: id, content })
                }
              } catch (error) {
                console.error(error)
                Toast.show({
                  icon: 'fail',
                  content: '留言失败',
                })
              }

              setVisible(false)
              props.onConfirm && props.onConfirm()
            },
          },
        ],
      ]}
    />
  )
}

export const CommentDialog = forwardRef(Component)
