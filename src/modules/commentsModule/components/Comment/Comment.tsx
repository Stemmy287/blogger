import React, { ChangeEvent, FC, useRef, useState } from 'react';
import s from 'modules/commentsModule/components/Comment/comment.module.scss';
import noPhoto from 'common/image/no-image.svg';
import { dateConvertor } from 'common/utils/dateConvertor';
import { CommentType } from 'modules/commentsModule/types';
import { Button } from 'common/components/Button/Button';
import { BurgerMenu } from 'common/components/BurgerMenu/BurgerMenu';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { updateCommentTC } from 'modules/commentsModule/commentsSlice';
import { Input } from '../../../../common/components/Input/Input';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { userSelector } from '../../../authModule/authSelectors';

type PropsType = {
	comment: CommentType;
	setPopUpActive: (isActive: boolean) => void;
	setCommentId: (commentId: string) => void;
};

export const Comment: FC<PropsType> = ({ comment, setPopUpActive, setCommentId }) => {
	const user = useAppSelector(userSelector);

	const dispatch = useAppDispatch();

	const { userLogin, createdAt, content, id } = comment;

	const [editValue, setEditValue] = useState(content);
	const [isEdit, setIsEdit] = useState(false);

	const onEditHandler = () => {
		dispatch(updateCommentTC({ commentId: id, content: editValue }));
		setIsEdit(false);
	};

	const onDeleteHandler = () => {
		setPopUpActive(true);
		setCommentId(id);
	};

	const onEditActiveHandler = () => {
		setIsEdit(true);
	};

	const onCancelHandler = () => {
		setIsEdit(false);
		setEditValue(content);
	};

	const onChangeValue = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
		setEditValue(e.currentTarget.value);
	};

	const burgerMenuRef = useRef<HTMLDivElement>(null);

	return (
		<div className={s.container}>
			<img className={s.photo} src={noPhoto} alt="ava" />
			<div className={s.content}>
				<div className={s.userInfo}>
					<h2 className={s.name}>{userLogin}</h2>
					<span className={s.date}>{dateConvertor(createdAt)}</span>
				</div>
				{isEdit ? <Input value={editValue} onChange={onChangeValue} component="textarea" /> : <p>{content}</p>}
				{isEdit && (
					<div className={s.buttons}>
						<Button isNoBackGround title="Cancel" callback={onCancelHandler} />
						<Button disabled={content === editValue} title="Edit Comment" callback={onEditHandler} />
					</div>
				)}
			</div>
			{!isEdit &&( user.userId === comment.userId) && (
				<div className={s.burgerMenu} ref={burgerMenuRef}>
					<BurgerMenu onEditClick={onEditActiveHandler} onDeleteClick={onDeleteHandler} />
				</div>
			)}
		</div>
	);
};
