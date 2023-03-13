import React, {useEffect} from 'react';
import {Title} from "common/components/Title/Title";
import {Search} from "common/components/Search/search";
import {Blog} from "./Blog/Blog";
import {useAppSelector} from "hooks/useAppSelector";
import {fetchBlogsTC, setPageNumberAC} from "features/Blogs/blogsReducer";
import {useAppDispatch} from "hooks/useAppDispatch";
import {blogsSelector, blogsTotalCountSelector, pageNumberSelector, pageSizeSelector} from "features/Blogs/blogsSelectors";
import {Pagination} from "common/components/Pagination/Pagination";

export const Blogs = () => {

  const blogs = useAppSelector(blogsSelector)
  const pageNumber = useAppSelector(pageNumberSelector)
  const pageSize = useAppSelector(pageSizeSelector)
  const blogsTotalCount = useAppSelector(blogsTotalCountSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBlogsTC())
  }, [pageNumber, pageSize])

  const onPaginationHandler = () => {
    dispatch(setPageNumberAC({pageNumber: pageNumber + 1}))
  }

  return (
    <div>
      <Title title="Blogs" isDesc={false}/>
      <Search/>
      {blogs?.map(bg => <Blog
        key={bg.id}
        blogId={bg.id}
        title={bg.name}
        webSiteUrl={bg.websiteUrl}
        description={bg.description}
      />)}
      {blogsTotalCount > blogs.length  && <Pagination callback={onPaginationHandler}/>}
    </div>
  );
};

