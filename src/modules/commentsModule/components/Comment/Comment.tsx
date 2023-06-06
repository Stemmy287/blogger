import React, { ChangeEvent, useState } from 'react';
import s from './Comment.module.scss';
import noPhoto from 'assets/image/no-image.svg';
import { dateConvertor } from 'common/utils';
import { CommentType, deleteComment, updateComment } from 'modules/commentsModule';
import { BurgerMenu, Button, Input, Notification, PopUp } from 'common/components';
import { useAppDispatch, useAppSelector } from 'hooks';
import { userSelector } from 'modules/authModule';

type PropsType = {
	comment: CommentType;
};

export const Comment = ({ comment }: PropsType) => {

	const user = useAppSelector(userSelector);

	const dispatch = useAppDispatch();

	const [editValue, setEditValue] = useState(comment.content);
	const [isEdit, setIsEdit] = useState(false);
	const [isActive, setIsActive] = useState(false);

	const onEditHandler = () => {
		dispatch(updateComment({ commentId: comment.id, content: editValue }));
		setIsEdit(false);
	};

	const onDeleteHandler = () => {
		dispatch(deleteComment(comment.id));
	};

	const onModalHandler = () => {
		setIsActive(true)
	}

	const onEditActiveHandler = () => {
		setIsEdit(true);
	};

	const onCancelHandler = () => {
		setIsEdit(false);
		setEditValue(comment.content);
	};

	const onChangeValue = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
		setEditValue(e.currentTarget.value);
	};

	const onCloseHandler = () => {
		setIsActive(false)
	}

	return (
		<>
			<div className={s.container}>
				<img className={s.photo} src={noPhoto} alt="ava" />
				<div className={s.content}>
					<div className={s.userInfo}>
						<h2 className={s.name}>{comment.userLogin}</h2>
						<span className={s.date}>{dateConvertor(comment.createdAt)}</span>
					</div>
					{isEdit ? <Input
						value={editValue}
						onChange={onChangeValue}
						component="textarea" />
						: <p>{comment.content}</p>}
					{isEdit && (
						<div className={s.buttons}>
							<Button isNoBackGround title="Cancel" callback={onCancelHandler} />
							<Button 
								disabled={comment.content === editValue} 
								title="Edit Comment" 
								callback={onEditHandler} 
							/>
						</div>
					)}
				</div>
				{!isEdit && user.userId === comment.userId && (
					<div className={s.burgerMenu}>
						<BurgerMenu onEditClick={onEditActiveHandler} onDeleteClick={onModalHandler} />
					</div>
				)}
			</div>
			{isActive && (
				<PopUp onClose={onCloseHandler}>
					<Notification
						title="Delete Comment"
						message="Are you sure you want to delete comment?"
						callback={onDeleteHandler}
						onClose={onCloseHandler}
					/>
				</PopUp>
			)}
		</>
	);
};
