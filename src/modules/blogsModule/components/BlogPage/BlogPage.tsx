import React, { useEffect } from 'react';
import s from './BlogPage.module.scss';
import { Title } from 'common/components';
import { BackLink } from 'common/components';
import { useParams } from 'react-router-dom';
import {
	fetchBlog,
	fetchPostsForSpecificBlog,
	setIsPaginationPostsForSpecificBLog,
	setPageNumberPostsForSpecificBLog,
} from 'modules/blogsModule';
import { useAppDispatch } from 'hooks';
import { useAppSelector } from 'hooks';
import defaultBlogBanner from 'common/image/blog-banner.png';
import {
	blogSelector,
	postsForSpecificBlogSelector,
	postsPageNumberForSpecificBlogSelector,
	postsTotalCountForSpecificBlogSelector,
} from 'modules/blogsModule';
import { BlogOnPage } from 'modules/blogsModule';
import { PATH } from 'common/constans';
import { PostsList } from 'modules/postsModule';

export const BlogPage = () => {
	const { blogId } = useParams();

	const blog = useAppSelector(blogSelector);

	const posts = useAppSelector(postsForSpecificBlogSelector);

	const postsTotalCount = useAppSelector(postsTotalCountForSpecificBlogSelector);

	const pageNumber = useAppSelector(postsPageNumberForSpecificBlogSelector);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (blogId) {
			dispatch(fetchBlog({ blogId }));
			dispatch(fetchPostsForSpecificBlog(blogId));
		}
	}, [dispatch, blogId, pageNumber]);

	const onPagination = () => {
		dispatch(setIsPaginationPostsForSpecificBLog());
		dispatch(setPageNumberPostsForSpecificBLog({ pageNumber: pageNumber + 1 }));
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
				navData={{ link: `/blog-page/${blogId}`, title: `Blog "${blog.name}"` }}
			/>
		</div>
	);
};
