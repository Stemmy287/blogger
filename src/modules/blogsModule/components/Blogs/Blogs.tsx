import React, { useEffect, useState } from 'react';
import { Title } from 'common/components';
import { Blog } from 'modules/blogsModule';
import { useAppSelector } from 'hooks';
import {
	fetchBlogsTC,
	setIsPaginationBlogsAC,
	setPageNumberBlogsAC,
	setSearchNameTermBlogsAC,
	setSortByBlogsAC,
} from 'modules/blogsModule';
import { useAppDispatch } from 'hooks';
import {
	blogsPageNumberSelector,
	blogsSearchNameTermSelector,
	blogsSelector,
	blogsSortBySelector,
	blogsSortDirectionSelector,
	blogsTotalCountSelector,
} from 'modules/blogsModule';
import { Pagination } from 'common/components';
import s from './blogs.module.scss';
import { Select } from 'common/components';
import { Input } from 'common/components';
import { OptionsSelectorType } from 'modules/blogsModule';
import { useSearch } from 'hooks';

export const Blogs = () => {
	const blogs = useAppSelector(blogsSelector);

	const pageNumber = useAppSelector(blogsPageNumberSelector);
	const sortBy = useAppSelector(blogsSortBySelector);
	const sortDirection = useAppSelector(blogsSortDirectionSelector);
	const searchNameTerm = useAppSelector(blogsSearchNameTermSelector);

	const blogsTotalCount = useAppSelector(blogsTotalCountSelector);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchBlogsTC());
	}, [pageNumber, sortBy, sortDirection, searchNameTerm, dispatch]);

	const onPagination = () => {
		dispatch(setIsPaginationBlogsAC());
		dispatch(setPageNumberBlogsAC({ pageNumber: pageNumber + 1 }));
	};
	const onChangeSelect = (data: OptionsSelectorType) => {
		if (data.value) {
			const value = data.value.split(' ');
			dispatch(setPageNumberBlogsAC({ pageNumber: 1 }));
			dispatch(setSortByBlogsAC({ sortBy: value[1], sortDirection: value[0] }));
		}
	};

	const [options] = useState([
		{ title: 'New blogs first', value: 'desc createdAt' },
		{ title: 'Old blogs first', value: 'asc createdAt' },
		{ title: 'From A to Z', value: 'asc name' },
		{ title: 'From Z to A', value: 'desc name' },
	]);

	const searchHandler = (debouncedSearchValue: string) => {
		dispatch(setPageNumberBlogsAC({ pageNumber: 1 }));
		dispatch(setSearchNameTermBlogsAC({ searchNameTerm: debouncedSearchValue }));
	};

	const { searchValue, setSearchValue } = useSearch(searchHandler);

	return (
		<div>
			<Title title="Blogs" isDesc={false} />
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
					<Select title={options[0].title} onChange={onChangeSelect} options={options} />
				</div>
			</div>
			<div>
				{blogs?.map(bg => (
					<Blog
						key={bg.id}
						blogId={bg.id}
						title={bg.name}
						webSiteUrl={bg.websiteUrl}
						description={bg.description}
					/>
				))}
			</div>
			{blogsTotalCount > blogs.length && (
				<div className={s.pagination}>
					<Pagination callback={onPagination} />
				</div>
			)}
		</div>
	);
};
