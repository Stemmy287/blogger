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
import {OptionsSelectorType} from "features/Blogs/types";

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
  const onChangeSelect = (data: OptionsSelectorType) => {
    if (data.value) {
      console.log(data)
      const value = data.value.split(' ')
      dispatch(setPageNumberBlogsAC({pageNumber: 1}))
      dispatch(setSortByBlogsAC({sortBy: value[1], sortDirection: value[0]}))
    }
  }

  const [searchValue, setSearchValue] = useState('')

  const [options] = useState([
    {title: 'New blogs first', value: 'desc createdAt'},
    {title: 'Old blogs first', value: 'asc createdAt'},
    {title: 'From A to Z', value: 'asc name'},
    {title: 'From Z to A', value: 'desc name'},
  ])
  const searchHandler = (searchNameTerm: string) => {
    dispatch(setPageNumberBlogsAC({pageNumber: 1}))
    dispatch(setSearchNameTermBlogsAC({searchNameTerm}))
  }
  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN}/>
  }
  return (
    <div>
      <Title title="Blogs" isDesc={false}/>
      <div className={s.searchBar}>
        <div className={s.input}>
          <Input searchValue={searchValue} onChange={setSearchValue} searchHandler={searchHandler}/>
        </div>
        <div className={s.select}>
          <Select
            title={options[0].title}
            onChange={onChangeSelect}
            options={options}
          />
        </div>
      </div>
      <div>
        {blogs?.map(bg => <Blog
          key={bg.id}
          blogId={bg.id}
          title={bg.name}
          webSiteUrl={bg.websiteUrl}
          description={bg.description}
        />)}
      </div>
      {blogsTotalCount > blogs.length && <div className={s.pagination}><Pagination callback={onPagination}/></div>}
    </div>
  );
};

