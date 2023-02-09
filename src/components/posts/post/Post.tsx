import React, {FC} from 'react';
import s from './post.module.scss'
import {NavLink} from "react-router-dom";

type PostPropsType = {
    postId: string
    title: string
    blogName: string
    date: string
}

export const Post: FC<PostPropsType> = ({
                                            postId,
                                            title,
                                            blogName,
                                            date
                                        }) => {

    const time = date.slice(11).slice(0, 8)

    return (
        <div className={s.postContainer}>
            <div className={s.banner}>
                <img src=""/>
            </div>
            <div className={s.content}>
                <div className={s.img}>
                    <img src="" alt=""/>
                </div>
                <div className={s.text}>
                    <NavLink to={`/post/${postId}`} className={s.navPost}>
                        <h3 className={s.title}>{title}</h3>
                    </NavLink>
                    <span className={s.description}>{blogName}</span>
                    <span className={s.date}>{time}</span>
                </div>
            </div>
        </div>
    );
};

