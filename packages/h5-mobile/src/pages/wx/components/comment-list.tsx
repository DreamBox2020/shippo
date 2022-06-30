import { IWxArticleExtOffiaccountNickname, IWxCommentExt } from '@shippo/types'

import { userSelector } from '@shippo/sdk-stores'
import { Dialog, Button, List, Divider, Image, Toast, Empty, ActionSheet, Badge } from 'antd-mobile'
import { LikeOutline, UserOutline } from 'antd-mobile-icons'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { CommentDialog, CommentDialogRef } from './comment-dialog'
import styled from 'styled-components'
import { services } from '@shippo/sdk-services'
import avatar from '~/assets/avatar.png'
import type { Action } from 'antd-mobile/es/components/action-sheet'

import { IWxCommentExtReplyList } from '@shippo/types'
import { formatTimeStr } from '@shippo/sdk-utils'
import { config } from '~/config'

export const StyledCommentItem = styled.div`
  .nickname {
    color: #6d757a;
    font-size: 14px;
  }

  .content {
    font-size: 14px;
  }

  .action-wrap {
  }

  .action-wrap span {
    margin-right: 15px;
    padding: 2px 5px;
    color: #99a2aa;
    font-size: 12px;
  }
`

export const StyledList = styled(List)`
  .adm-list-item-content-arrow {
    display: none;
  }
`

export const StyledReplyList = styled(List)`
  margin-left: 52px;

  .adm-list-item-content-arrow {
    display: none;
  }

  .adm-list-item-content {
    border-top: 0;
  }

  .adm-list-body {
    border-top: 0;
    border-bottom: 0;
  }
`

export interface CommentListProps {
  article: IWxArticleExtOffiaccountNickname
}

export const CommentList: React.FC<CommentListProps> = (props) => {
  // 用户信息
  const userInfo = useSelector(userSelector.infoGetter())

  const [sheetVisible, setSheetVisible] = useState(false)

  const commentDialogRef = useRef<CommentDialogRef>(null)

  const [commentList, setCommentList] = useState<IWxCommentExtReplyList[]>([])

  const [electedCommentList, setElectedCommentList] = useState<IWxCommentExtReplyList[]>([])

  const load = useCallback(() => {
    if (props.article.id) {
      services.wxComment.find_by_article({ articleId: props.article.id }).then((hr) => {
        console.log(hr.data.resource)
        setElectedCommentList(hr.data.resource)
      })

      services.wxComment
        .find_by_wx_passport_and_article({ articleId: props.article.id })
        .then((hr) => {
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

  const commentContentClickHndler = useCallback(
    (comment: IWxCommentExt) => {
      if (comment.wxPassportId === userInfo.user.wxPassportId) {
        setSheetVisible(true)
      }
    },
    [userInfo.user.wxPassportId]
  )

  const openWxInfoDialog = useCallback(() => {
    Dialog.show({
      content: '还没有设置昵称和头像哦～',
      closeOnAction: true,
      actions: [
        [
          {
            key: 'cancel',
            text: '取消',
          },
          {
            key: 'confirm',
            text: '前往设置',
            onClick: () => {
              if (!config.isMiniProgram()) {
                Toast.show({
                  icon: 'fail',
                  content: '非小程序环境',
                })
                return
              }
              window.location.replace(
                'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
                  config.OFFIACCOUNT_APP_ID +
                  '&redirect_uri=' +
                  encodeURIComponent(window.location.href) +
                  '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
              )
            },
          },
        ],
      ],
    })
  }, [])

  return (
    <div>
      <div style={{ padding: '15px' }}>
        <Button
          block
          color="primary"
          fill="outline"
          onClick={() => {
            services.wxPassport.find().then((hr) => {
              if (hr.data.resource.nickname) {
                commentDialogRef.current?.open(props.article.id)
              } else {
                openWxInfoDialog()
              }
            })
          }}
        >
          写留言
        </Button>
      </div>

      <CommentDialog ref={commentDialogRef} onConfirm={load} />

      <StyledList header="我的留言">
        {commentList.length ? null : <Empty description="暂无数据" />}

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
                extra={c1.isElected ? '已精选' : '未精选'}
              >
                <StyledCommentItem>
                  <p className="nickname">{c1.nickname}</p>
                  <p className="content" onClick={() => commentContentClickHndler(c1)}>
                    {c1.content}
                  </p>

                  <p className="action-wrap">
                    <span className="comment-time">{formatTimeStr(c1.createdAt)}</span>
                    <span
                      className="action-reply"
                      onClick={() => {
                        commentDialogRef.current?.open(c1.id, true)
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
                        extra={c2.isElected ? '已精选' : '未精选'}
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

      <Divider>留言被精选后将公开</Divider>

      <StyledList header="精选留言">
        {electedCommentList.length ? null : <Empty description="暂无数据" />}
        {electedCommentList.map((c1) => {
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
                extra={
                  <div>
                    <LikeOutline />
                    <span>{c1.likeNum}</span>
                  </div>
                }
              >
                <StyledCommentItem>
                  <p className="nickname">
                    <span style={{ verticalAlign: 'middle' }}>{c1.nickname}</span>{' '}
                    {c1.isTop ? <Badge content="置顶" /> : null}
                  </p>
                  <p className="content">{c1.content}</p>
                  <p className="action-wrap">
                    <span className="comment-time">{formatTimeStr(c1.createdAt)}</span>
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
                        extra={
                          <div>
                            <LikeOutline />
                            <span>{c2.likeNum}</span>
                          </div>
                        }
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
                          <p className="content">{c2.content}</p>
                          <p className="action-wrap">
                            <span className="comment-time">{formatTimeStr(c2.createdAt)}</span>
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
