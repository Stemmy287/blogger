import React, { FC } from 'react';
import s from './Blog.module.scss';
import { NavLink } from 'react-router-dom';
import defaultBlogImage from 'assets/image/defaultBlogImg.png';
import { currentURL } from 'common/utils';

type BlogsPropsType = {
	blogId: string;
	title: string;
	webSiteUrl: string;
	description: string;
};

export const Blog: FC<BlogsPropsType> = ({ blogId, title, webSiteUrl, description }) => {
	return (
		<div className={s.blogContainer}>
			<img src={defaultBlogImage} alt="blog img" />
			<div className={s.content}>
				<div className={s.navContainer}>
					<NavLink to={`/blog-page/${blogId}`} className={s.navBlog}>
						<h3 className={s.title}>{title}</h3>
					</NavLink>
				</div>
				<span className={s.website}>
					<b>Website:</b>
					<a href={currentURL(webSiteUrl)} target="_blank" rel="noreferrer">
						{currentURL(webSiteUrl)}
					</a>
				</span>
				<span className={s.text}>{description}</span>
			</div>
		</div>
	);
};

