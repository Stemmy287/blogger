import React, { ChangeEvent, FC, useRef, useState } from 'react';
import s from './comment.module.scss';
import noPhoto from 'common/image/no-image.svg';
import { dateConvertor } from 'common/utils';
import { CommentType } from 'modules/commentsModule';
import { Button } from 'common/components';
import { BurgerMenu } from 'common/components';
import { useAppDispatch } from 'hooks';
import { updateCommentTC } from 'modules/commentsModule';
import { Input } from 'common/components';
import { useAppSelector } from 'hooks';
import { userSelector } from 'modules/authModule';

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
