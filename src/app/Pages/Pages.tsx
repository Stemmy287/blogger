import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Blogs} from "features/Blogs/Blogs";
import {Posts} from "features/Posts/Posts";
import {BlogPage} from "features/Blogs/BlogPage/BlogPage";
import {PostPage} from "features/Posts/PostPage/PostPage";
import {PATH} from "common/constans/path";
import {Login} from "features/Login/Login";
import {WithoutNav} from "app/WithoutNav";
import {WithNav} from "app/WithNav";

export const Pages = () => {
  return (
    <Routes>
      <Route element={<WithoutNav/>}>
        <Route path={PATH.LOGIN} element={<Login/>}/>
      </Route>
      <Route element={<WithNav/>}>
        <Route path={PATH.MAIN} element={<Blogs/>}/>
        <Route path={PATH.BLOGS} element={<Blogs/>}/>
        <Route path={PATH.POSTS} element={<Posts/>}/>
        <Route path={PATH.BLOG_PAGE} element={<BlogPage/>}/>
        <Route path={PATH.POST_PAGE} element={<PostPage/>}/>
      </Route>
    </Routes>
  );
};

