import React, {FC} from 'react';
import s from 'features/Comments/Comment/comment.module.scss'
import noPhoto from 'common/image/no-image.svg'
import {BurgerMenu} from "common/components/BurgerMenu/BurgerMenu";
import {dateConvertor} from "common/utils/dateConvertor";
import {CommentType} from "features/Comments/commentsApi";

type PropsType = {
  comment: CommentType
  setPopUpActive: (isActive: boolean) => void
  setCommentId: (commentId: string) => void
}

export const Comment: FC<PropsType> = ({comment, setPopUpActive, setCommentId}) => {

  const {userLogin, createdAt, content, id} = comment

  const onDeleteHandler = () => {
    setPopUpActive(true)
    setCommentId(id)
  }

  return (
    <div className={s.comment_container}>
      <img className={s.photo} src={noPhoto} alt="photo"/>
      <div className={s.comment_content}>
        <div className={s.user_info}>
          <h2 className={s.name}>{userLogin}</h2>
          <span className={s.date}>{dateConvertor(createdAt)}</span>
        </div>
        <p>{content}</p>
      </div>
      <div className={s.burger_menu}>
        <BurgerMenu
          onEditClick={() => {}}
          onDeleteClick={onDeleteHandler}/>
      </div>
    </div>
  );
};

