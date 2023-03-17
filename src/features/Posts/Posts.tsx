import React, {useEffect} from 'react';
import s from './posts.module.scss'
import {Title} from "common/components/Title/Title";
import {Post} from "./Post/Post";
import {useAppSelector} from "hooks/useAppSelector";
import {Select} from "common/components/Select/Select";
import {fetchPostsTC, setPageNumberPostsAC, setSortByPostsAC} from "features/Posts/postsReducer";
import {useAppDispatch} from "hooks/useAppDispatch";
import {
  postsPageNumberSelector,
  postsPageSizeSelector,
  postsSelector, postsSortBySelector, postsSortDirectionSelector,
  postsTotalCountSelector
} from "features/Posts/postsSelectors";
import {Pagination} from "common/components/Pagination/Pagination";

export const Posts = () => {

  const posts = useAppSelector(postsSelector)

  const pageNumber = useAppSelector(postsPageNumberSelector)
  const pageSize = useAppSelector(postsPageSizeSelector)
  const sortBy = useAppSelector(postsSortBySelector)
  const sortDirection = useAppSelector(postsSortDirectionSelector)

  const postsTotalCount = useAppSelector(postsTotalCountSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPostsTC())
  }, [pageNumber, pageSize, sortBy, sortDirection])

  const onChangeSelect = (sortBy: string) => {
    const value = sortBy.split(' ')
    dispatch(setSortByPostsAC({sortBy: value[1], sortDirection: value[0]}))
  }

  const onPagination = () => {
    dispatch(setPageNumberPostsAC({pageNumber: pageNumber + 1}))
  }

  return (
    <div>
      <Title title={'Posts'} isDesc={false}/>
      <div className={s.select}>
        <Select title={'posts'} onChange={onChangeSelect}/>
      </div>
      <div className={s.posts}>
        {posts.map(ps =>
          <Post
            key={ps.id}
            postId={ps.id}
            title={ps.title}
            blogName={ps.blogName}
            date={ps.createdAt}
          />)}
      </div>
      {postsTotalCount > posts.length  && <Pagination callback={onPagination}/>}
    </div>
  );
};

