import {
  IWxArticleExtOffiaccountNickname,
  IWxCommentExt,
  IWxCommentExtReplyList,
} from '@shippo/types'

import { userGetters } from '@shippo/sdk-stores'
import { List, Image, ActionSheet, Toast, Badge } from 'antd-mobile'
import { UserOutline,StarFill,StarOutline } from 'antd-mobile-icons'
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

  // 当前选中评论
  const [currentCommentId, setCurrentCommentId] = useState(0)

  // 删除评论面板 是否可见
  const [sheetVisible, setSheetVisible] = useState(false)

  // 评论对话框ref
  const commentDialogRef = useRef<CommentDialogRef>(null)

  // 评论列表
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
        onClick:async () => {
          try {
            const hr = await services.wxComment.del({id:currentCommentId})
            if(hr.data.success){
              Toast.show({
                icon: 'success',
                content: '删除成功'
              })
              load()
            }
          } catch (error) {
            console.error(error)
            Toast.show({
              icon: 'success',
              content: '删除失败'
            })
          } finally{
            setSheetVisible(false)
          }
        },
      },
    ],
    [currentCommentId, load]
  )

  const commentContentClickHndler = useCallback((comment: IWxCommentExt) => {
    if (comment.wxPassportId === 0) {
      setCurrentCommentId(comment.id)
      setSheetVisible(true)    }
  }, [])

  // 精选评论
  const updateElected = useCallback(async (commentId: number, elected: boolean) => {
    try {
      const hr = await services.wxComment.update_elected({ id: commentId, isElected:elected?1:0 })
      if (hr.data.success) {
        Toast.show({
          icon: 'success',
          content: '修改成功',
        })
        load()
      }
    } catch (error) {
      console.error(error)
      Toast.show({
        icon: 'fail',
        content: '修改失败',
      })
    }
  }, [load])

  // 置顶评论
  const updateTop = useCallback(async (commentId: number, top: boolean) => { 
    try {
      const hr = await services.wxComment.update_top({ id: commentId, isTop:top?1:0 })
      if (hr.data.success) {
        Toast.show({
          icon: 'success',
          content: '修改成功',
        })
        load()
      }
    } catch (error) {
      console.error(error)
      Toast.show({
        icon: 'fail',
        content: '修改失败',
      })
    }
  } , [load])

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
                extra={c1.isElected ? <StarFill onClick={()=>updateElected(c1.id,!c1.isElected)} />  :<StarOutline  onClick={()=>updateElected(c1.id,!c1.isElected)} />}
                >
                <StyledCommentItem>
                   <div className="nickname">
                    <span style={{ verticalAlign: 'middle' }}>{c1.nickname}</span>
                    {c1.isTop ? <Badge content="置顶" /> : null}
                  </div>                 
                   <p className="content" onClick={() => commentContentClickHndler(c1)}>
                    {c1.content}
                  </p>
                  <p className="action-wrap">
                    <span className="comment-time">{formatTimeStr(c1.createdAt)}</span>
                    <span className="action-like">赞&nbsp;{c1.likeNum}</span>
                    <span className="action-top" onClick={()=>updateTop(c1.id,!c1.isTop)}>{c1.isTop ? '取消置顶' : '置顶'}</span>
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
                        extra={c2.isElected ? <StarFill onClick={()=>updateElected(c2.id,!c2.isElected)} />  :<StarOutline  onClick={()=>updateElected(c2.id,!c2.isElected)} />}
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
