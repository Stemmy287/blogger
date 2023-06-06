import React, { useEffect } from 'react';
import s from './Posts.module.scss';
import { Select, Title } from 'common/components';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
	fetchPosts,
	PostsList,
	postsPageNumberSelector,
	postsSelector,
	postsSortBySelector,
	postsSortDirectionSelector,
	postsTotalCountSelector,
	setIsPaginationPosts,
	setPageNumberPosts,
	setSortByPosts,
} from 'modules/postsModule';
import { OptionsSelectorType } from 'modules/blogsModule';

export const Posts = () => {
	const posts = useAppSelector(postsSelector);

	const pageNumber = useAppSelector(postsPageNumberSelector);
	const sortBy = useAppSelector(postsSortBySelector);
	const sortDirection = useAppSelector(postsSortDirectionSelector);

	const postsTotalCount = useAppSelector(postsTotalCountSelector);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchPosts());
	}, [pageNumber, sortBy, sortDirection, dispatch]);

	const options = [
		{ title: 'New blogs first', value: 'desc createdAt' },
		{ title: 'Old blogs first', value: 'asc createdAt' },
	];

	const onChangeSelect = (data: OptionsSelectorType) => {
		if (data.value) {
			const value = data.value.split(' ');
			dispatch(setPageNumberPosts(1));
			dispatch(setSortByPosts({ sortBy: value[1], sortDirection: value[0] }));
		}
	};

	const onPagination = () => {
		dispatch(setIsPaginationPosts());
		dispatch(setPageNumberPosts(pageNumber + 1));
	};

	return (
		<>
			<Title title={'Posts'} isDesc={false} />
			<div className={s.selectWrapper}>
				<div className={s.select}>
					<Select title={options[0].title} options={options} onChange={onChangeSelect} />
				</div>
			</div>
			<PostsList
				posts={posts}
				postsTotalCount={postsTotalCount}
				onPagination={onPagination}
				navData={{ link: '/posts', title: 'Posts' }}
			/>
		</>
	);
};
