import {
  IWxArticleExtOffiaccountNickname,
  IWxCommentExtReplyList,
  __wxArticleExtOffiaccountNickname,
} from '@shippo/types'

import { userSelector } from '@shippo/sdk-stores'
import { List, Image } from 'antd-mobile'
import { EyeInvisibleOutline, UserOutline } from 'antd-mobile-icons'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { StyledList, StyledReplyList } from './comment-list'
import { services } from '@shippo/sdk-services'
import avatar from '~/assets/avatar.png'
import { formatTimeStr } from '@shippo/sdk-utils'
import { CommentDialog, CommentDialogRef } from './comment-dialog'

export interface ManageCommentListProps {
  article: IWxArticleExtOffiaccountNickname
}
export const ManageCommentList: React.FC<ManageCommentListProps> = (props) => {
  // 用户信息
  const userInfo = useSelector(userSelector.infoGetter())

  const commentDialogRef = useRef<CommentDialogRef>(null)

  const [commentList, setCommentList] = useState<IWxCommentExtReplyList[]>([])

  const load = useCallback(() => {
    if (props.article.id) {
      services.wxComment.admin__find_by_article({ articleId: props.article.id }).then((hr) => {
        console.log(hr.data.resource)
        setCommentList(hr.data.resource)
      })
    }
  }, [props.article.id])

  useEffect(() => {
    load()
  }, [load])

  const reply = useCallback(() => {
    commentDialogRef.current?.open(props.article.id, true)
  }, [props.article.id])

  return (
    <div>
      <CommentDialog ref={commentDialogRef} onConfirm={load} />

      <StyledList header="留言">
        <List.Item>
          <span>{commentList.length}条留言</span>
        </List.Item>
        {commentList.map((c1) => {
          return (
            <div key={c1.id}>
              <List.Item
                key={c1.id}
                prefix={
                  <Image
                    src={c1.avatarUrl}
                    style={{ borderRadius: 5 }}
                    fit="cover"
                    width={40}
                    height={40}
                  />
                }
                extra={<EyeInvisibleOutline />}
              >
                <p>{c1.nickname}</p>
                <p>{c1.content}</p>
                <p>
                  <span>{formatTimeStr(c1.createdAt)}</span>&nbsp;
                  <span>赞&nbsp;{c1.likeNum}</span>&nbsp;
                  <span style={{ color: 'blue' }}>置顶</span>&nbsp;
                  <span style={{ color: 'blue' }} onClick={reply}>
                    回复
                  </span>
                </p>
              </List.Item>
              {c1.replyList.length ? (
                <StyledReplyList>
                  {c1.replyList.map((c2) => {
                    return (
                      <List.Item
                        prefix={
                          <Image
                            src={c2.avatarUrl || avatar}
                            style={{ borderRadius: 5 }}
                            fit="cover"
                            width={24}
                            height={24}
                          />
                        }
                        extra={<EyeInvisibleOutline />}
                      >
                        <p>
                          {c2.nickname || (
                            <span>
                              作者
                              <UserOutline />
                            </span>
                          )}
                        </p>
                        <p>{c2.content}</p>
                        <p>
                          <span>{formatTimeStr(c2.createdAt)}</span>&nbsp;
                          <span>赞&nbsp;{c2.likeNum}</span>
                        </p>
                      </List.Item>
                    )
                  })}
                </StyledReplyList>
              ) : null}
            </div>
          )
        })}
      </StyledList>
    </div>
  )
}
