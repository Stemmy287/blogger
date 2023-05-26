import React, { useEffect } from 'react';
import { Title } from 'common/components/Title/Title';
import { BackLink } from 'common/components/BackLink/BackLink';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchPostTC } from 'modules/postsModule/postsSlice';
import { useAppSelector } from 'hooks/useAppSelector';
import { postSelector } from 'modules/postsModule/postsSelectors';
import { Comments } from 'modules/commentsModule/components/Comments/Comments';
import s from './postPage.module.scss';
import defaultBlogImage from 'common/image/defaultBlogImg.png';
import defaultPostImage from 'common/image/post-banner.png';
import { dateConvertor } from '../../../../common/utils/dateConvertor';

export const PostPage = () => {
	const { postId } = useParams();
	const post = useAppSelector(postSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (postId) {
			dispatch(fetchPostTC({ postId }));
		}
	}, [postId, dispatch]);

	const date = dateConvertor(post.createdAt, true);

	return (
		<div>
			<div className={s.mainTitleWrapper}>
				<Title title={'Posts'} isDesc={true} desc={post.blogName} />
			</div>
			<BackLink link={'/postsModule'} to={'posts'} />
			<div className={s.postDeployedContainer}>
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
					<img className={s.postBanner} src={defaultPostImage} alt={'banner'} />
					<p className={s.content}>{post.content}</p>
				</div>
			</div>
			<Comments postId={postId || ''} />
		</div>
	);
};
