import React from 'react';
import s from './PostsList.module.scss';
import { Post, PostType } from 'modules/postsModule';
import { Pagination } from 'common/components';
import { NavDataType } from 'app';

type PropsType = {
	posts: PostType[];
	postsTotalCount: number;
	onPagination: () => void;
	navData: NavDataType;
};

export const PostsList = ({ posts, postsTotalCount, onPagination, navData }: PropsType) => {
	return (
		<div className={s.container}>
			{posts.length ? (
				<div className={s.posts}>
					{posts.map(ps => (
						<Post
							key={ps.id}
							postId={ps.id}
							title={ps.title}
							blogName={ps.blogName}
							date={ps.createdAt}
							navData={navData}
						/>
					))}
				</div>
			) : (
				<h4 className={s.empty}>No Posts</h4>
			)}
			{postsTotalCount > posts.length && (
				<div className={s.pagination}>
					<Pagination callback={onPagination} />
				</div>
			)}
		</div>
	);
};
