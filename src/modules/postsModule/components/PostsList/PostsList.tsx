import React from 'react';
import s from './PostsList.module.scss';
import { Post } from '../Post/Post';
import { Pagination } from '../../../../common/components/Pagination/Pagination';
import { PostType } from '../../postsApi';

type PropsType = {
	posts: PostType[];
	postsTotalCount: number;
	onPagination: () => void;
};

export const PostsList = ({ posts, postsTotalCount, onPagination }: PropsType) => {
	return (
		<>
			<div className={s.posts}>
				{posts.map(ps => (
					<Post key={ps.id} postId={ps.id} title={ps.title} blogName={ps.blogName} date={ps.createdAt} />
				))}
			</div>
			{postsTotalCount > posts.length && (
				<div className={s.pagination}>
					<Pagination callback={onPagination} />
				</div>
			)}
		</>
	);
};
