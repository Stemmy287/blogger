import React, {useEffect} from 'react';
import {Title} from "common/components/Title/Title";
import {BackLink} from "common/components/BackLink/BackLink";
import {PostDeployed} from "features/Posts/PostDeployed/PostDeployed";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "hooks/useAppDispatch";
import {fetchPostTC} from "features/Posts/postsSlice";
import {useAppSelector} from "hooks/useAppSelector";
import {postSelector} from "features/Posts/postsSelectors";
import {Comments} from "features/Posts/Comments/Comments";

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
    <div>
      <Title title={'Posts'} isDesc={true} desc={post.blogName}/>
      <BackLink link={'/Posts'} where={'posts'}/>
      <PostDeployed
        blogName={post.blogName}
        postName={post.title}
        date={post.createdAt}
        content={post.content}
      />
      <Comments/>
    </div>
  );
};