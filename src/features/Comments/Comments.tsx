import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import s from 'features/Comments/comments.module.scss'
import {FormInput} from "common/components/FormInput/FormInput";
import {Comment} from "features/Comments/Comment/Comment";
import {Pagination} from "common/components/Pagination/Pagination";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import {Button} from "common/components/Button/Button";
import {
  commentsPageNumberSelector,
  commentsSelector,
  commentsTotalCountSelector
} from "features/Comments/commentsSelectors";
import {
  createCommentTC, deleteCommentTC,
  fetchCommentsTC,
  setIsPaginationCommentsAC,
  setPageNumberCommentsAC
} from "features/Comments/commentsSlice";
import {PopUp} from "common/components/PopUp/PopUp";
import {Notification} from "common/components/Notification/Notification";

type PropsType = {
  postId: string
}

export const Comments:FC<PropsType> = ({postId}) => {

  const comments = useAppSelector(commentsSelector)

  const commentsTotalCount = useAppSelector(commentsTotalCountSelector)

  const commentsPageNumber = useAppSelector(commentsPageNumberSelector)

  const dispatch = useAppDispatch()

  const [content, setContent] = useState('')

  const [isButtonsShow, setIsButtonsShow] = useState(false)
  const [isDeletePopUpActive, setIsDeletePopUpActive] = useState(false)
  const [commentId, setCommentId] = useState('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value)
  }

  const onClickHandler = () => {
    dispatch(createCommentTC({postId, content}))
    setContent('')
  }

  const onCommentTypeOnHandler = () => {
    setIsButtonsShow(true)
  }
  const onCommentTypeOffHandler = () => {
    setIsButtonsShow(false)
    setContent('')
  }

  const onPaginationHandler = () => {
    dispatch(setIsPaginationCommentsAC())
    dispatch(setPageNumberCommentsAC({pageNumber: commentsPageNumber + 1}))
  }

  const onDeleteHandler = () => {
    dispatch(deleteCommentTC({commentId}))
  }

  useEffect(() => {
    dispatch(fetchCommentsTC({postId}))
  }, [commentsPageNumber])

  return (
    <div className={s.comments_container}>
      <h3 className={s.header}>{`Comments (${commentsTotalCount || 0})`}</h3>
      <FormInput value={content} onChange={onChangeHandler} component={'textarea'} onFocus={onCommentTypeOnHandler}/>
      {isButtonsShow && <div className={s.buttons}>
        <Button isNoBackGround title="Cancel" callback={onCommentTypeOffHandler}/>
        <Button disabled={!content} title="Send a Comment" callback={onClickHandler}/>
      </div>}
      <div className={s.comments}>
        {comments.map(cm => <Comment
          key={cm.id}
          comment={cm}
          setPopUpActive={setIsDeletePopUpActive}
          setCommentId={setCommentId}
        />)}
      </div>
      {commentsTotalCount > comments.length && <div className={s.pagination}><Pagination callback={onPaginationHandler}/></div>}
      <PopUp isActive={isDeletePopUpActive} setIsActive={setIsDeletePopUpActive}>
        <Notification
          title="Delete Comment"
          message="Are you sure you want to delete comment?"
          callback={onDeleteHandler}
          onClose={setIsDeletePopUpActive}
        />
      </PopUp>
    </div>
  );
};
