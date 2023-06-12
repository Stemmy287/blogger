import React from 'react';
import s from './PostsList.module.scss';
import { Post, PostType } from 'modules/postsModule';
import { Empty, Pagination } from 'common/components';
import { NavDataType } from 'app';

type PropsType = {
	posts: PostType[];
	postsTotalCount: number;
	onPagination: () => void;
	navData: NavDataType;
	isPagination: boolean;
};

export const PostsList = ({ posts, postsTotalCount, onPagination, navData, isPagination }: PropsType) => {
	return (
		<div className={s.container}>
			{posts?.length ? (
				<div className={s.posts}>
					{posts?.map(ps => (
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
				<Empty title="No Posts" />
			)}
			{postsTotalCount > posts?.length && (
				<div className={s.pagination}>
					<Pagination callback={onPagination} isLoading={isPagination} />
				</div>
			)}
		</div>
	);
};
