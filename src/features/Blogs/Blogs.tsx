import React, {useEffect, useState} from 'react';
import {Title} from "common/components/Title/Title";
import {Blog} from "./Blog/Blog";
import {useAppSelector} from "hooks/useAppSelector";
import {
  fetchBlogsTC, setIsPaginationBlogsAC,
  setPageNumberBlogsAC,
  setSearchNameTermBlogsAC,
  setSortByBlogsAC
} from "features/Blogs/blogsReducer";
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

export const Blogs = () => {

  const blogs = useAppSelector(blogsSelector)

  const pageNumber = useAppSelector(blogsPageNumberSelector)
  const sortBy = useAppSelector(blogsSortBySelector)
  const sortDirection = useAppSelector(blogsSortDirectionSelector)
  const searchNameTerm = useAppSelector(blogsSearchNameTermSelector)

  const blogsTotalCount = useAppSelector(blogsTotalCountSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBlogsTC())
  }, [pageNumber, sortBy, sortDirection, searchNameTerm])

  const onPagination = () => {
    dispatch(setIsPaginationBlogsAC({isPagination: true}))
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

  return (
    <div>
      <Title title="Blogs" isDesc={false}/>
      <div className={s.searchContainer}>
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
      {blogsTotalCount > blogs.length  && <Pagination callback={onPagination}/>}
    </div>
  );
};

