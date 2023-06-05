import React, { FC, MouseEvent } from 'react';
import s from './Post.module.scss';
import { useNavigate } from 'react-router-dom';
import defaultPostImage from 'assets/image/defaultPostImg.png';
import defaultBlogImage from 'assets/image/defaultBlogImg.png';
import { dateConvertor } from 'common/utils';
import { NavDataType } from 'app';

type PostPropsType = {
	postId: string;
	title: string;
	blogName: string;
	date: string;
	navData: NavDataType;
};

export const Post: FC<PostPropsType> = ({ postId, title, blogName, date, navData }) => {
	const dateParsed = dateConvertor(date);

	const navigate = useNavigate();

	const onPostPageHandler = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		navigate(`/post-page/${postId}`, { state: navData });
	};

	return (
		<div className={s.postContainer}>
			<img className={s.postBanner} src={defaultPostImage} alt="banner" />
			<div className={s.content}>
				<img className={s.blogAvatar} src={defaultBlogImage} alt="blog avatar" />
				<div className={s.text}>
					<a href={'/'} className={s.navPost} onClick={onPostPageHandler}>
						{title}
					</a>
					<span className={s.description}>{blogName}</span>
					<span className={s.date}>{dateParsed}</span>
				</div>
			</div>
		</div>
	);
};
