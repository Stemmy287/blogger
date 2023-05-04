import React, {useEffect, useState} from 'react';
import {Title} from "common/components/Title/Title";
import {Blog} from "./Blog/Blog";
import {useAppSelector} from "hooks/useAppSelector";
import {
  fetchBlogsTC,
  setIsPaginationBlogsAC,
  setPageNumberBlogsAC,
  setSearchNameTermBlogsAC,
  setSortByBlogsAC
} from "features/Blogs/blogsSlice";
import {useAppDispatch} from "hooks/useAppDispatch";
import {
  blogsPageNumberSelector,
  blogsSearchNameTermSelector,
  blogsSelector,
  blogsSortBySelector,
  blogsSortDirectionSelector,
  blogsTotalCountSelector
} from "features/Blogs/blogsSelectors";
import {Pagination} from "common/components/Pagination/Pagination";
import s from "./blogs.module.scss";
import {Select} from "common/components/Select/Select";
import {Input} from "common/components/Input/Input";
import {Navigate} from "react-router-dom";
import {PATH} from "common/constans/path";
import {isLoggedInSelector} from "features/Auth/authSelectors";

export const Blogs = () => {

  const blogs = useAppSelector(blogsSelector)

  const pageNumber = useAppSelector(blogsPageNumberSelector)
  const sortBy = useAppSelector(blogsSortBySelector)
  const sortDirection = useAppSelector(blogsSortDirectionSelector)
  const searchNameTerm = useAppSelector(blogsSearchNameTermSelector)

  const blogsTotalCount = useAppSelector(blogsTotalCountSelector)

  const isLoggedIn = useAppSelector(isLoggedInSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBlogsTC())
  }, [pageNumber, sortBy, sortDirection, searchNameTerm])

  const onPagination = () => {
    dispatch(setIsPaginationBlogsAC())
    dispatch(setPageNumberBlogsAC({pageNumber: pageNumber + 1}))
  }

  const onChangeSelect = (sortBy: string) => {
    const value = sortBy.split(' ')
    dispatch(setPageNumberBlogsAC({pageNumber: 1}))
    dispatch(setSortByBlogsAC({sortBy: value[1], sortDirection: value[0]}))
  }

  const [searchValue, setSearchValue] = useState('')

  const searchHandler = (searchNameTerm: string) => {
    dispatch(setPageNumberBlogsAC({pageNumber: 1}))
    dispatch(setSearchNameTermBlogsAC({searchNameTerm}))
  }

  if(!isLoggedIn) {
    return <Navigate to={PATH.LOGIN}/>
  }

  return (
    <div>
      <Title title="Blogs" isDesc={false}/>
      <div>
        <Input searchValue={searchValue} onChange={setSearchValue} searchHandler={searchHandler}/>
        <Select onChange={onChangeSelect} title={'blogs'} blogs/>
      </div>
      {blogs?.map(bg => <Blog
        key={bg.id}
        blogId={bg.id}
        title={bg.name}
        webSiteUrl={bg.websiteUrl}
        description={bg.description}
      />)}
      {blogsTotalCount > blogs.length  && <div className={s.pagination}><Pagination callback={onPagination}/></div>}
    </div>
  );
};

