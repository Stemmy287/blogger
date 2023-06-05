import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import s from './comments.module.scss';
import { Comment } from 'modules/commentsModule';
import { Pagination } from 'common/components';
import { useAppDispatch } from 'hooks';
import { useAppSelector } from 'hooks';
import { Button } from 'common/components';
import {
	commentsPageNumberSelector,
	commentsSelector,
	commentsTotalCountSelector,
} from 'modules/commentsModule';
import {
	createComment,
	deleteComment,
	fetchComments,
	setIsPaginationCommentsAC,
	setPageNumberCommentsAC,
} from 'modules/commentsModule';
import { PopUp } from 'common/components';
import { Notification } from 'common/components';
import { Input } from 'common/components';

type PropsType = {
	postId: string;
};

export const Comments: FC<PropsType> = ({ postId }) => {
	const comments = useAppSelector(commentsSelector);

	const commentsTotalCount = useAppSelector(commentsTotalCountSelector);

	const commentsPageNumber = useAppSelector(commentsPageNumberSelector);

	const dispatch = useAppDispatch();

	const [content, setContent] = useState('');

	const [isButtonsShow, setIsButtonsShow] = useState(false);
	const [isDeletePopUpActive, setIsDeletePopUpActive] = useState(false);
	const [commentId, setCommentId] = useState('');
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.currentTarget.value);
	};
	const onClickHandler = () => {
		dispatch(createComment({ postId, content }));
		setContent('');
	};
	const onCommentTypeOnHandler = () => {
		setIsButtonsShow(true);
	};
	const onCommentTypeOffHandler = () => {
		setIsButtonsShow(false);
		setContent('');
	};

	const onPaginationHandler = () => {
		dispatch(setIsPaginationCommentsAC());
		dispatch(setPageNumberCommentsAC({ pageNumber: commentsPageNumber + 1 }));
	};

	const onDeleteHandler = () => {
		dispatch(deleteComment({ commentId }));
	};

	useEffect(() => {
		dispatch(fetchComments({ postId }));
	}, [commentsPageNumber, dispatch, postId]);

	return (
		<div className={s.container}>
			<h3 className={s.count}>{`Comments (${commentsTotalCount || 0})`}</h3>
			{!!comments.length && (
				<div className={s.textarea}>
					<Input
						value={content}
						onChange={onChangeHandler}
						component="textarea"
						onFocus={onCommentTypeOnHandler}
						placeholder="Provide your comment..."
					/>
				</div>
			)}
			{isButtonsShow && (
				<div className={s.buttons}>
					<Button isNoBackGround title="Cancel" callback={onCommentTypeOffHandler} />
					<Button disabled={!content} title="Send a Comment" callback={onClickHandler} />
				</div>
			)}
			<div className={s.comments}>
				{comments.map(cm => (
					<Comment
						key={cm.id}
						comment={cm}
						setPopUpActive={setIsDeletePopUpActive}
						setCommentId={setCommentId}
					/>
				))}
			</div>
			{commentsTotalCount > comments.length && <Pagination callback={onPaginationHandler} />}
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
