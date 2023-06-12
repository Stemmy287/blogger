import React from 'react';
import { Comment, CommentType } from 'modules/commentsModule';
import s from './CommentsList.module.scss';

type PropsType = {
	comments: CommentType[];
};
export const CommentsList = ({ comments }: PropsType) => {
	return (
		<div className={s.comments}>
			{comments?.map(cm => (
				<Comment key={cm.id} comment={cm}/>
			))}
		</div>
	);
};
