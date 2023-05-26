import React, {useEffect} from 'react';
import s from './posts.module.scss'
import {Title} from "common/components/Title/Title";
import {Post} from "../Post/Post";
import {useAppSelector} from "hooks/useAppSelector";
import {fetchPostsTC, setIsPaginationPostsAC, setPageNumberPostsAC, setSortByPostsAC} from "modules/postsModule/postsSlice";
import {useAppDispatch} from "hooks/useAppDispatch";
import {
  postsPageNumberSelector,
  postsSelector,
  postsSortBySelector,
  postsSortDirectionSelector,
  postsTotalCountSelector
} from "modules/postsModule/postsSelectors";
import {Pagination} from "common/components/Pagination/Pagination";
import {Navigate} from "react-router-dom";
import {PATH} from "common/constans/path";
import {isLoggedInSelector} from "modules/authModule/authSelectors";

export const Posts = () => {

  const posts = useAppSelector(postsSelector)

  const pageNumber = useAppSelector(postsPageNumberSelector)
  const sortBy = useAppSelector(postsSortBySelector)
  const sortDirection = useAppSelector(postsSortDirectionSelector)

  const postsTotalCount = useAppSelector(postsTotalCountSelector)

  const isLoggedIn = useAppSelector(isLoggedInSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPostsTC())
  }, [pageNumber, sortBy, sortDirection])

  const onChangeSelect = (sortBy: string) => {
    const value = sortBy.split(' ')
    dispatch(setPageNumberPostsAC({pageNumber: 1}))
    dispatch(setSortByPostsAC({sortBy: value[1], sortDirection: value[0]}))
  }

  const onPagination = () => {
    dispatch(setIsPaginationPostsAC())
    dispatch(setPageNumberPostsAC({pageNumber: pageNumber + 1}))
  }

  if(!isLoggedIn) {
    return <Navigate to={PATH.LOGIN}/>
  }

  return (
    <div>
      <Title title={'Posts'} isDesc={false}/>
      <div className={s.select}>

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
      {postsTotalCount > posts.length && <div className={s.pagination}><Pagination callback={onPagination}/></div>}
    </div>
  );
};

