import React, {useEffect} from 'react';
import s from './blogPage.module.scss'
import {Title} from "common/components/Title/Title";
import {BackLink} from "common/components/BackLink/BackLink";
import {Blog} from "../Blog/Blog";
import {useParams} from "react-router-dom";
import {fetchBlogTC} from "features/Blogs/blogsReducer";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import defaultBlogBanner from 'common/image/blog-banner.jpg'
import {blogSelector} from "features/Blogs/blogsSelectors";

export const BlogPage = () => {

    const {blogId} = useParams()
    const blog = useAppSelector(blogSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (blogId)
        dispatch(fetchBlogTC({blogId}))
    })

    return (
        <div className={s.blogPageContainer}>
            <Title title={'Blogs'} isDesc={true} desc={blog.name}/>
            <BackLink link={'/Blogs'} where={'Blogs'}/>
            <img src={defaultBlogBanner} alt={'banner'} className={s.banner}/>
            <Blog
                blogId={blog.id}
                title={blog.name}
                description={blog.description}
                webSiteUrl={blog.websiteUrl}
            />
        </div>
    );
};

