import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import s from './Comments.module.scss';
import {
	CommentsList,
	commentsPageNumberSelector,
	commentsSelector,
	commentsTotalCountSelector,
	createComment,
	fetchComments,
	setIsPaginationComments,
	setPageNumberComments,
} from 'modules/commentsModule';
import { Button, Input, Pagination } from 'common/components';
import { useAppDispatch, useAppSelector } from 'hooks';

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
		dispatch(setIsPaginationComments());
		dispatch(setPageNumberComments({ pageNumber: commentsPageNumber + 1 }));
	};

	useEffect(() => {
		dispatch(fetchComments({ postId }));
	}, [commentsPageNumber, dispatch, postId]);

	return (
		<div className={s.container}>
			<h3 className={s.count}>{`Comments (${commentsTotalCount || 0})`}</h3>
			<div className={s.textarea}>
				<Input
					value={content}
					onChange={onChangeHandler}
					component="textarea"
					onFocus={onCommentTypeOnHandler}
					placeholder="Provide your comment..."
				/>
			</div>
			{isButtonsShow && (
				<div className={s.buttons}>
					<Button isNoBackGround title="Cancel" callback={onCommentTypeOffHandler} />
					<Button disabled={!content} title="Send a Comment" callback={onClickHandler} />
				</div>
			)}
			<CommentsList comments={comments} />
			{commentsTotalCount > comments.length && <Pagination callback={onPaginationHandler} />}
		</div>
	);
};
