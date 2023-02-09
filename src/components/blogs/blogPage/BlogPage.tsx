import React, {useEffect} from 'react';
import s from './blogPage.module.scss'
import {Title} from "../../common/title/Title";
import {BackLink} from "../../common/backLink/BackLink";
import {Blog} from "../blog/Blog";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppDispatch, ReduxRootType} from "../../../redux/store";
import {BlogType} from "../../../dal/apiBlogs";
import {fetchBlog} from "../../../redux/blogsReducer";


export const BlogPage = () => {

    const {blogId} = useParams()
    const blog = useSelector<ReduxRootType, BlogType>(state => state.blogs.blog)
    const dispatch = AppDispatch()

    useEffect(() => {
        if (blogId)
        dispatch(fetchBlog(blogId))
    })

    return (
        <div className={s.blogPageContainer}>
            <Title title={'Blogs'} isDesc={true} desc={blog.name}/>
            <BackLink link={'/blogs'} where={'Blogs'}/>
            <img src="" className={s.banner}/>
            <Blog
                blogId={blog.id}
                title={blog.name}
                description={blog.description}
                webSiteUrl={blog.websiteUrl}
            />
        </div>
    );
};

