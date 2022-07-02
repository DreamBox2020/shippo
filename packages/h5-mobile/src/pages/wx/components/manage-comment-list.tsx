import {
  IWxArticleExtOffiaccountNickname,
  IWxCommentExt,
  IWxCommentExtReplyList,
} from '@shippo/types'

import { userGetters } from '@shippo/sdk-stores'
import { List, Image, ActionSheet } from 'antd-mobile'
import { EyeInvisibleOutline, UserOutline } from 'antd-mobile-icons'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyledCommentItem, StyledList, StyledReplyList } from './comment-list'
import { services } from '@shippo/sdk-services'
import avatar from '~/assets/avatar.png'
import { formatTimeStr } from '@shippo/sdk-utils'
import { CommentDialog, CommentDialogRef } from './comment-dialog'
import type { Action } from 'antd-mobile/es/components/action-sheet'

export interface ManageCommentListProps {
  article: IWxArticleExtOffiaccountNickname
}
export const ManageCommentList: React.FC<ManageCommentListProps> = (props) => {
  // 用户信息
  const userInfo = useSelector(userGetters.infoGetter())

  const [sheetVisible, setSheetVisible] = useState(false)

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

  const actions = useMemo(
    (): Action[] => [
      {
        text: '删除留言',
        key: 'del',
        onClick: () => {},
      },
    ],
    [props.article.id, load]
  )

  const commentContentClickHndler = useCallback((comment: IWxCommentExt) => {
    if (comment.wxPassportId === 0) {
      setSheetVisible(true)
    }
  }, [])

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
                <StyledCommentItem>
                  <p className="nickname">{c1.nickname}</p>
                  <p className="content" onClick={() => commentContentClickHndler(c1)}>
                    {c1.content}
                  </p>
                  <p className="action-wrap">
                    <span className="comment-time">{formatTimeStr(c1.createdAt)}</span>
                    <span className="action-like">赞&nbsp;{c1.likeNum}</span>
                    <span className="action-top">{c1.isTop ? '取消置顶' : '置顶'}</span>
                    <span
                      className="action-reply"
                      onClick={() => {
                        commentDialogRef.current?.open(c1.id, true, true)
                      }}
                    >
                      回复
                    </span>
                  </p>
                </StyledCommentItem>
              </List.Item>
              {c1.replyList.length ? (
                <StyledReplyList>
                  {c1.replyList.map((c2) => {
                    return (
                      <List.Item
                        key={c2.id}
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
                        <StyledCommentItem>
                          <p className="nickname">
                            {c2.nickname || (
                              <span>
                                作者
                                <UserOutline />
                              </span>
                            )}
                          </p>
                          <p className="content" onClick={() => commentContentClickHndler(c2)}>
                            {c2.content}
                          </p>
                          <p className="action-wrap">
                            <span className="comment-time">{formatTimeStr(c2.createdAt)}</span>
                            <span className="action-like">赞&nbsp;{c2.likeNum}</span>
                          </p>
                        </StyledCommentItem>
                      </List.Item>
                    )
                  })}
                </StyledReplyList>
              ) : null}
            </div>
          )
        })}
      </StyledList>
      <ActionSheet
        visible={sheetVisible}
        actions={actions}
        onClose={() => setSheetVisible(false)}
      />
    </div>
  )
}
