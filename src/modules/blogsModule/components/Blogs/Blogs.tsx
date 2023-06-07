import React, { useEffect } from 'react';
import { Empty, Input, Pagination, Preloader, Select, Title } from 'common/components';
import {
	BlogsList,
	blogsPageNumberSelector,
	blogsSearchNameTermSelector,
	blogsSelector,
	blogsSortBySelector,
	blogsSortDirectionSelector,
	blogsTotalCountSelector,
	fetchBlogs,
	OptionsSelectorType,
	setIsPaginationBlogs,
	setPageNumberBlogs,
	setSearchNameTermBlogs,
	setSortByBlogs,
} from 'modules/blogsModule';
import { useAppDispatch, useAppSelector, useSearch } from 'hooks';
import s from './Blogs.module.scss';
import { isLoadingSelector } from 'app';

export const Blogs = () => {
	const blogs = useAppSelector(blogsSelector);

	const pageNumber = useAppSelector(blogsPageNumberSelector);
	const sortBy = useAppSelector(blogsSortBySelector);
	const sortDirection = useAppSelector(blogsSortDirectionSelector);
	const searchNameTerm = useAppSelector(blogsSearchNameTermSelector);

	const isLoading = useAppSelector(isLoadingSelector);

	const blogsTotalCount = useAppSelector(blogsTotalCountSelector);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchBlogs());
	}, [pageNumber, sortBy, sortDirection, searchNameTerm, dispatch]);

	const onPagination = () => {
		dispatch(setIsPaginationBlogs());
		dispatch(setPageNumberBlogs(pageNumber + 1));
	};
	const onChangeSelect = (data: OptionsSelectorType) => {
		if (data.value) {
			const value = data.value.split(' ');
			dispatch(setPageNumberBlogs(1));
			dispatch(setSortByBlogs({ sortBy: value[1], sortDirection: value[0] }));
		}
	};

	const options = [
		{ title: 'New blogs first', value: 'desc createdAt' },
		{ title: 'Old blogs first', value: 'asc createdAt' },
		{ title: 'From A to Z', value: 'asc name' },
		{ title: 'From Z to A', value: 'desc name' },
	];

	const searchHandler = (debouncedSearchValue: string) => {
		dispatch(setPageNumberBlogs(1));
		dispatch(setSearchNameTermBlogs(debouncedSearchValue));
	};

	const { searchValue, setSearchValue } = useSearch(searchHandler);

	return (
		<div>
			<Title title="Blogs" isDesc={false} />
			{!blogs.length && !searchNameTerm ? (
				<Preloader />
			) : (
				<div className={s.searchBar}>
					<div className={s.input}>
						<Input
							component="searchInput"
							value={searchValue}
							onChange={e => setSearchValue(e.currentTarget.value)}
							placeholder="Search"
						/>
					</div>
					<div className={s.select}>
						<Select
							title={options[0].title}
							onChange={onChangeSelect}
							options={options}
							disabled={!blogs.length || isLoading}
						/>
					</div>
				</div>
			)}
			{!blogs.length && !isLoading ? (
				<Empty title="No Blogs" />
			) : (
				<>
					<BlogsList blogs={blogs} />
					{blogsTotalCount > blogs.length && (
						<div className={s.pagination}>
							<Pagination callback={onPagination} />
						</div>
					)}
				</>
			)}
		</div>
	);
};
