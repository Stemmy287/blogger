import React, { useEffect } from 'react';
import s from './blogPage.module.scss';
import { Title } from 'common/components/Title/Title';
import { BackLink } from 'common/components/BackLink/BackLink';
import { useParams } from 'react-router-dom';
import {
	fetchBlogTC,
	fetchPostsForSpecificBlogTC,
	setIsPaginationPostsForSpecificBLogAC,
	setPageNumberPostsForSpecificBLogAC,
} from 'modules/blogsModule/blogsSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import defaultBlogBanner from 'common/image/blog-banner.png';
import {
	blogSelector,
	postsForSpecificBlogSelector,
	postsPageNumberForSpecificBlogSelector,
	postsTotalCountForSpecificBlogSelector,
} from 'modules/blogsModule/blogsSelectors';
import { BlogOnPage } from 'modules/blogsModule/components/BlogPage/BlogOnPage/BlogOnPage';
import { PATH } from '../../../../common/constans/path';
import { PostsList } from '../../../postsModule/components/PostsList/PostsList';

export const BlogPage = () => {
	const { blogId } = useParams();

	const blog = useAppSelector(blogSelector);

	const posts = useAppSelector(postsForSpecificBlogSelector);

	const postsTotalCount = useAppSelector(postsTotalCountForSpecificBlogSelector);

	const pageNumber = useAppSelector(postsPageNumberForSpecificBlogSelector);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (blogId) {
			dispatch(fetchBlogTC({ blogId }));
			dispatch(fetchPostsForSpecificBlogTC(blogId));
		}
	}, [dispatch, blogId, pageNumber]);

	const onPagination = () => {
		dispatch(setIsPaginationPostsForSpecificBLogAC());
		dispatch(setPageNumberPostsForSpecificBLogAC({ pageNumber: pageNumber + 1 }));
	};

	return (
		<div className={s.container}>
			<div className={s.blog}>
				<Title title={'Blogs'} isDesc={true} desc={blog.name} />
				<div className={s.backLink}>
					<BackLink link={PATH.BLOGS} to={'Blogs'} />
				</div>
				<img src={defaultBlogBanner} alt={'banner'} className={s.banner} />
				<BlogOnPage
					title={blog.name}
					webSiteUrl={blog.websiteUrl}
					description={blog.description}
					date={blog.createdAt}
				/>
			</div>
			<PostsList
				posts={posts}
				postsTotalCount={postsTotalCount}
				onPagination={onPagination}
				navData={{ link: `/BlogPage/${blogId}`, title: `blog "${blog.name}"` }}
			/>
		</div>
	);
};

export type NavDataType = {
	link: string
	title: string
}
