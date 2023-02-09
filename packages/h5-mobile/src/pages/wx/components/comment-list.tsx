import {
  IWxArticleExtOffiaccountNickname,
  IWxCommentExt,
} from '../sdk-types/types'

import { userGetters } from '@shippo/sdk-stores'
import {
  Dialog,
  Button,
  List,
  Divider,
  Image,
  Toast,
  Empty,
  ActionSheet,
  Badge,
} from 'antd-mobile'
import { ExclamationOutline, LikeOutline, UserOutline } from 'antd-mobile-icons'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { CommentDialog, CommentDialogRef } from './comment-dialog'
import styled from 'styled-components'
import { services } from '@shippo/sdk-services'
import avatar from '~/assets/avatar.png'
import notavatar from '~/assets/notavatar.jpg'
import type { Action } from 'antd-mobile/es/components/action-sheet'

import { IWxCommentExtReplyList } from '../sdk-types/types'
import { formatTimeStr } from '@shippo/sdk-utils'
import { config } from '~/config'
import { useLocation, useNavigate } from 'react-router'

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
  const navigate = useNavigate()
  const location = useLocation()

  // 用户信息
  const userInfo = useSelector(userGetters.infoGetter())

  // 当前选中评论
  const [currentCommentId, setCurrentCommentId] = useState(0)

  // 删除评论面板 是否可见
  const [sheetVisible, setSheetVisible] = useState(false)

  // 评论对话框ref
  const commentDialogRef = useRef<CommentDialogRef>(null)

  // 我的评论列表
  const [commentList, setCommentList] = useState<IWxCommentExtReplyList[]>([])

  // 精选评论列表
  const [electedCommentList, setElectedCommentList] = useState<
    IWxCommentExtReplyList[]
  >([])

  const load = useCallback(() => {
    if (props.article.id) {
      services.wxComment
        .find_by_article({ articleId: props.article.id })
        .then((hr) => {
          console.log(hr.data.resource)
          setElectedCommentList(hr.data.resource)
        })

      if (userInfo.uid > 0) {
        services.wxComment
          .find_by_wx_passport_and_article({ articleId: props.article.id })
          .then((hr) => {
            console.log(hr.data.resource)
            setCommentList(hr.data.resource)
          })
      }
    }
  }, [props.article.id, userInfo.uid])

  useEffect(() => {
    load()
  }, [load])

  const actions = useMemo(
    (): Action[] => [
      {
        text: '删除留言',
        key: 'del',
        onClick: async () => {
          try {
            const hr = await services.wxComment.del({ id: currentCommentId })
            if (hr.data.success) {
              Toast.show({
                icon: 'success',
                content: '删除成功',
              })
              load()
            }
          } catch (error) {
            console.error(error)
            Toast.show({
              icon: 'success',
              content: '删除失败',
            })
          } finally {
            setSheetVisible(false)
          }
        },
      },
    ],
    [currentCommentId, load]
  )

  // 评论内容点击处理
  const commentContentClickHndler = useCallback(
    (comment: IWxCommentExt) => {
      if (comment.wxPassportId === userInfo.user.wxPassportId) {
        setCurrentCommentId(comment.id)
        setSheetVisible(true)
      }
    },
    [userInfo.user.wxPassportId]
  )

  // 打开绑定微信信息对话框
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
                  encodeURIComponent(
                    window.location.href.replace('wxCode', 'oldWxCode')
                  ) +
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
            if (userInfo.uid === 0) {
              Toast.show({
                icon: <ExclamationOutline />,
                content: '请先登录',
              })
              console.log(location)
              navigate(
                '/passport?channel=wx&redirect=' +
                  encodeURIComponent(location.pathname + location.search)
              )
              return
            }

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
        {commentList.length ? null : (
          <Empty description={userInfo.uid > 0 ? '暂无数据' : '请登录'} />
        )}

        {commentList.map((c1) => {
          return (
            <div key={c1.id}>
              <List.Item
                key={c1.id}
                prefix={
                  <Image
                    src={c1.avatarUrl || notavatar}
                    style={{ borderRadius: 5 }}
                    fit="cover"
                    width={40}
                    height={40}
                  />
                }
                extra={c1.isElected ? '已精选' : '未精选'}
              >
                <StyledCommentItem>
                  <div className="nickname">{c1.nickname}</div>
                  <p
                    className="content"
                    onClick={() => commentContentClickHndler(c1)}
                  >
                    {c1.content}
                  </p>

                  <p className="action-wrap">
                    <span className="comment-time">
                      {formatTimeStr(c1.createdAt)}
                    </span>
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
                          <div className="nickname">
                            {c2.nickname || (
                              <span>
                                作者
                                <UserOutline />
                              </span>
                            )}
                          </div>
                          <p
                            className="content"
                            onClick={() => commentContentClickHndler(c2)}
                          >
                            {c2.content}
                          </p>
                          <p className="action-wrap">
                            <span className="comment-time">
                              {formatTimeStr(c2.createdAt)}
                            </span>
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
                    src={c1.avatarUrl || notavatar}
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
                  <div className="nickname">
                    <span style={{ verticalAlign: 'middle' }}>
                      {c1.nickname}
                    </span>
                    {c1.isTop ? <Badge content="置顶" /> : null}
                  </div>
                  <p className="content">{c1.content}</p>
                  <p className="action-wrap">
                    <span className="comment-time">
                      {formatTimeStr(c1.createdAt)}
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
                        extra={
                          <div>
                            <LikeOutline />
                            <span>{c2.likeNum}</span>
                          </div>
                        }
                      >
                        <StyledCommentItem>
                          <div className="nickname">
                            {c2.nickname || (
                              <span>
                                作者
                                <UserOutline />
                              </span>
                            )}
                          </div>
                          <p className="content">{c2.content}</p>
                          <p className="action-wrap">
                            <span className="comment-time">
                              {formatTimeStr(c2.createdAt)}
                            </span>
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
