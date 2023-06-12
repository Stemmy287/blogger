import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './Comments.module.scss';
import {
	CommentsList,
	commentsPageNumberSelector,
	commentsSelector,
	commentsTotalCountSelector,
	createComment,
	fetchComments,
	isLoadingCommentsSelector,
	setIsPaginationComments,
	setPageNumberComments,
} from 'modules/commentsModule';
import { Button, Input, Pagination } from 'common/components';
import { useAppDispatch, useAppSelector } from 'hooks';
import { isLoadingSelector } from 'app';

type PropsType = {
	postId: string;
};

export const Comments = ({ postId }: PropsType) => {
	const comments = useAppSelector(commentsSelector);

	const totalCount = useAppSelector(commentsTotalCountSelector);

	const pageNumber = useAppSelector(commentsPageNumberSelector);

	const isLoadingComments = useAppSelector(isLoadingCommentsSelector);

	const isLoading = useAppSelector(isLoadingSelector);

	const dispatch = useAppDispatch();

	const [isButtonsShow, setIsButtonsShow] = useState(false);

	const [value, setValue] = useState('');

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.currentTarget.value);
	};
	const onClickHandler = () => {
		dispatch(createComment({ postId, content: value }));
		setValue('');
	};
	const onCommentTypeOnHandler = () => {
		setIsButtonsShow(true);
	};
	const onCommentTypeOffHandler = () => {
		setIsButtonsShow(false);
		setValue('');
	};

	const onPaginationHandler = () => {
		dispatch(setIsPaginationComments());
		dispatch(setPageNumberComments(pageNumber + 1));
	};

	useEffect(() => {
		dispatch(fetchComments(postId));
	}, [pageNumber, dispatch, postId]);

	return (
		<div className={s.container}>
			<h3 className={s.count}>{`Comments (${(isLoadingComments && 'loading...') || totalCount || 0})`}</h3>
			<div className={s.textarea}>
				<Input
					value={value}
					onChange={onChangeHandler}
					component="textarea"
					onFocus={onCommentTypeOnHandler}
					placeholder="Provide your comment..."
					disabled={isLoading || isLoadingComments}
				/>
			</div>
			{isButtonsShow && (
				<div className={s.buttons}>
					<Button isNoBackGround title="Cancel" callback={onCommentTypeOffHandler} />
					<Button disabled={isLoading || !value} title="Send a Comment" callback={onClickHandler} />
				</div>
			)}
			<CommentsList comments={comments} />
			{totalCount > comments?.length && <Pagination callback={onPaginationHandler} />}
		</div>
	);
};
