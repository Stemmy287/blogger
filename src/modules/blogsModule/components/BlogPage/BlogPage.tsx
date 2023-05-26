import React, { useEffect } from 'react';
import s from './blogPage.module.scss';
import { Title } from 'common/components/Title/Title';
import { BackLink } from 'common/components/BackLink/BackLink';
import { useParams } from 'react-router-dom';
import { fetchBlogTC } from 'modules/blogsModule/blogsSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import defaultBlogBanner from 'common/image/blog-banner.png';
import { blogSelector } from 'modules/blogsModule/blogsSelectors';
import { BlogOnPage } from 'modules/blogsModule/components/BlogPage/BlogOnPage/BlogOnPage';

export const BlogPage = () => {
	const { blogId } = useParams();
	const blog = useAppSelector(blogSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (blogId) dispatch(fetchBlogTC({ blogId }));
	}, [dispatch, blogId]);

	return (
		<div className={s.blogPageContainer}>
			<Title title={'Blogs'} isDesc={true} desc={blog.name} />
			<div className={s.backLink}>
				<BackLink link={'/blogsModule'} to={'Blogs'} />
			</div>
			<img src={defaultBlogBanner} alt={'banner'} className={s.banner} />
			<BlogOnPage
        title={blog.name}
        webSiteUrl={blog.websiteUrl}
        description={blog.description}
        date={blog.createdAt}
      />
		</div>
	);
};

