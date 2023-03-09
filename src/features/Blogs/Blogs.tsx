import React, {useEffect} from 'react';
import {Title} from "common/components/Title/Title";
import {Search} from "common/components/Search/search";
import {Blog} from "./Blog/Blog";
import {useAppSelector} from "hooks/useAppSelector";
import {fetchBlogsTC} from "features/Blogs/blogsReducer";
import {useAppDispatch} from "hooks/useAppDispatch";
import {blogsSelector} from "features/Blogs/blogsSelectors";

export const Blogs = () => {

  const blogs = useAppSelector(blogsSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBlogsTC())
  }, [])

  return (
    <div>
      <Title title="Blogs" isDesc={false}/>
      <Search/>
      {blogs.map(bg => <Blog
        key={bg.id}
        blogId={bg.id}
        title={bg.name}
        webSiteUrl={bg.websiteUrl}
        description={bg.description}
      />)}
    </div>
  );
};

