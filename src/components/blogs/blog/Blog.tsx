import React, {FC} from 'react';
import s from './blog.module.scss'
import {NavLink} from "react-router-dom";

type BlogsPropsType = {
    blogId: string
    title: string
    webSiteUrl: string
    description: string
}

export const Blog: FC<BlogsPropsType> = ({
                                             blogId,
                                             title,
                                             webSiteUrl,
                                             description,
                                         }) => {
    return (
        <div className={s.blogContainer}>
            <div className={s.photo}>
                <img src=''/>
            </div>
            <div className={s.content}>
                <NavLink to={`/blog/${blogId}`} className={s.navBlog}>
                    <h3 className={s.title}>{title}</h3>
                </NavLink>
                <span className={s.website}><b>Website:</b><a href="">{webSiteUrl}</a></span>
                <span className={s.text}>{description}</span>
            </div>
        </div>
    );
};

