import React, {ChangeEvent, useEffect, useState} from 'react';
import {Title} from "common/components/Title/Title";
import {Blog} from "./Blog/Blog";
import {useAppSelector} from "hooks/useAppSelector";
import {fetchBlogsTC, setPageNumberAC, setSearchNameTermAC, setSortByAC} from "features/Blogs/blogsReducer";
import {useAppDispatch} from "hooks/useAppDispatch";
import {
  blogsPageNumberSelector,
  blogsPageSizeSelector,
  blogsSearchNameTermSelector,
  blogsSelector,
  blogsSortBySelector,
  blogsSortDirectionSelector,
  blogsTotalCountSelector
} from "features/Blogs/blogsSelectors";
import {Pagination} from "common/components/Pagination/Pagination";
import s from "./blogs.module.scss";
import {Select} from "common/components/Select/Select";
import {useDebounce} from "hooks/useDebounce";

export const Blogs = () => {

  const blogs = useAppSelector(blogsSelector)

  const pageNumber = useAppSelector(blogsPageNumberSelector)
  const pageSize = useAppSelector(blogsPageSizeSelector)
  const sortBy = useAppSelector(blogsSortBySelector)
  const sortDirection = useAppSelector(blogsSortDirectionSelector)
  const searchNameTerm = useAppSelector(blogsSearchNameTermSelector)

  const blogsTotalCount = useAppSelector(blogsTotalCountSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBlogsTC())
  }, [pageNumber, pageSize, sortBy, sortDirection, searchNameTerm])

  const onPagination = () => {
    dispatch(setPageNumberAC({pageNumber: pageNumber + 1}))
  }

  const onChangeSelect = (sortBy: string) => {
    const value = sortBy.split(' ')
    dispatch(setSortByAC({sortBy: value[1], sortDirection: value[0]}))
  }

  const [searchNameTermLocal, setSearchNameTermLocal] = useState('')

  const onChangeSearchNameTermLocal = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchNameTermLocal(e.currentTarget.value)
  }

  const debouncedSearchNameTerm = useDebounce(searchNameTermLocal, 750)

  useEffect(() => {
    dispatch(setSearchNameTermAC({searchNameTerm: debouncedSearchNameTerm}))
  }, [debouncedSearchNameTerm])

  return (
    <div>
      <Title title="Blogs" isDesc={false}/>
      <div className={s.searchContainer}>
        <input className={s.input} value={searchNameTermLocal} onChange={onChangeSearchNameTermLocal} placeholder="Search"/>
        <Select onChange={onChangeSelect}/>
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

