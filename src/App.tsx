import React, {useEffect} from 'react';
import {Header} from "./components/header/Header";
import {NavBar} from "./components/navBar/NavBar";
import s from './App.module.scss'
import {Blogs} from "./components/blogs/Blogs";
import {AppDispatch} from "./redux/store";
import {fetchBlogs} from "./redux/blogsReducer";
import {Route, Routes} from "react-router-dom";
import {Posts} from "./components/posts/Posts";
import {fetchPosts} from "./redux/postsReducer";
import {BlogPage} from "./components/blogs/blogPage/BlogPage";
import {PostPage} from "./components/posts/postPage/PostPage";

function App() {

    const dispatch = AppDispatch()

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchBlogs())
    },[])

    return (
        <div>
            <Header/>
            <div className={s.NavAndContent}>
                <NavBar/>
                <div className={s.mainContent}>
                    <Routes>
                        <Route path={'/'} element={<Blogs/>}/>
                        <Route path={'/blogs'} element={<Blogs/>}/>
                        <Route path={'/posts'} element={<Posts/>}/>
                        <Route path={'/blog/:blogId?'} element={<BlogPage/>}/>
                        <Route path={'/post/:postId?'} element={<PostPage/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
