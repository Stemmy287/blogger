import React, {useEffect} from 'react';
import {Title} from "common/components/Title/Title";
import {BackLink} from "common/components/BackLink/BackLink";
import {PostDeployed} from "modules/postsModule/components/PostDeployed/PostDeployed";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "hooks/useAppDispatch";
import {fetchPostTC} from "modules/postsModule/postsSlice";
import {useAppSelector} from "hooks/useAppSelector";
import {postSelector} from "modules/postsModule/postsSelectors";
import {Comments} from "modules/commentsModule/components/Comments/Comments";
import s from './postPage.module.scss'

export const PostPage = () => {

  const {postId} = useParams()
  const post = useAppSelector(postSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostTC({postId}))
    }
  }, [])

  return (
    <div className={s.postPageContainer}>
      <Title title={'Posts'} isDesc={true} desc={post.blogName}/>
      <BackLink link={'/postsModule'} to={'posts'}/>
      <PostDeployed
        blogName={post.blogName}
        postName={post.title}
        date={post.createdAt}
        content={post.content}
      />
      <Comments postId={postId || ''}/>
    </div>
  );
};