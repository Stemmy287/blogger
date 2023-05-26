import React, { FC } from 'react';
import s from './post.module.scss';
import { NavLink } from 'react-router-dom';
import defaultPostImage from 'common/image/defaultPostImg.png';
import defaultBlogImage from 'common/image/defaultBlogImg.png';
import { dateConvertor } from 'common/utils/dateConvertor';

type PostPropsType = {
	postId: string;
	title: string;
	blogName: string;
	date: string;
};

export const Post: FC<PostPropsType> = ({ postId, title, blogName, date }) => {
	const dateParsed = dateConvertor(date);

	return (
		<div className={s.postContainer}>
			<img className={s.postBanner} src={defaultPostImage} alt="banner" />
			<div className={s.content}>
				<img className={s.blogAvatar} src={defaultBlogImage} alt="blog avatar" />
				<div className={s.text}>
					<NavLink to={`/PostPage/${postId}`} className={s.navPost}>{title}</NavLink>
					<span className={s.description}>{blogName}</span>
					<span className={s.date}>{dateParsed}</span>
				</div>
			</div>
		</div>
	);
};

