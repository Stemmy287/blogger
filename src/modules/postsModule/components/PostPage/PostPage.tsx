import React, { useEffect } from 'react';
import { BackLink, Title } from 'common/components';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchPost, postSelector } from 'modules/postsModule';
import { Comments } from 'modules/commentsModule';
import s from './PostPage.module.scss';
import defaultBlogImage from 'assets/image/defaultBlogImg.png';
import defaultPostImage from 'assets/image/post-banner.png';
import { dateConvertor } from 'common/utils';

export const PostPage = () => {
	const { postId } = useParams();

	const post = useAppSelector(postSelector);

	const dispatch = useAppDispatch();

	const { state } = useLocation();

	useEffect(() => {
		if (postId) {
			dispatch(fetchPost(postId));
		}
	}, [postId, dispatch]);

	const date = dateConvertor(post.createdAt, true);

	return (
		<>
			<div className={s.mainTitleWrapper}>
				<Title title={state?.title} isDesc={true} desc={post.blogName} />
			</div>
			<BackLink link={state?.link || '/posts'} to={state?.title.toLowerCase() || 'posts'} />
			<div className={s.postContainer}>
				<div className={s.blogInfo}>
					<img className={s.blogAvatar} src={defaultBlogImage} alt="blog avatar" />
					<h3 className={s.blogTitle}>{post.blogName}</h3>
				</div>
				<div className={s.postInfo}>
					<div className={s.titleWrapper}>
						<h2 className={s.postTitle}>{post.title}</h2>
						<span className={s.typeOfPost}>(for public posts)</span>
					</div>
					<span className={s.date}>{date}</span>
				</div>
				<div className={s.content}>
					<img className={s.postBanner} src={defaultPostImage} alt="banner" />
					<p className={s.content}>{post.content}</p>
				</div>
			</div>
			<Comments postId={postId || ''} />
		</>
	);
};
