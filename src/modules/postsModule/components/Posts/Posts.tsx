import React, { useEffect, useState } from 'react';
import s from './posts.module.scss';
import { Title } from 'common/components';
import { useAppSelector } from 'hooks';
import { fetchPosts, setIsPaginationPostsAC, setPageNumberPostsAC, setSortByPostsAC } from 'modules/postsModule';
import { useAppDispatch } from 'hooks';
import {
	postsPageNumberSelector,
	postsSelector,
	postsSortBySelector,
	postsSortDirectionSelector,
	postsTotalCountSelector,
} from 'modules/postsModule';
import { Select } from 'common/components';
import { OptionsSelectorType } from 'modules/blogsModule';
import { PostsList } from 'modules/postsModule';

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

	const [options] = useState([
		{ title: 'New blogs first', value: 'desc createdAt' },
		{ title: 'Old blogs first', value: 'asc createdAt' },
	]);

	const onChangeSelect = (data: OptionsSelectorType) => {
		if (data.value) {
			const value = data.value.split(' ');
			dispatch(setPageNumberPostsAC({ pageNumber: 1 }));
			dispatch(setSortByPostsAC({ sortBy: value[1], sortDirection: value[0] }));
		}
	};

	const onPagination = () => {
		dispatch(setIsPaginationPostsAC());
		dispatch(setPageNumberPostsAC({ pageNumber: pageNumber + 1 }));
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
