import React, {useEffect} from 'react';
import s from './posts.module.scss'
import {Title} from "../common/title/Title";
import {Select} from "../search/select/Select";
import {Post} from "./post/Post";
import {useSelector} from "react-redux";
import {AppDispatch, ReduxRootType} from "../../redux/store";
import {PostType} from "../../dal/apiBlogs";
import {stat} from "fs";
import {compile} from "sass";
import {fetchPosts} from "../../redux/postsReducer";

export const Posts = () => {

    const posts = useSelector<ReduxRootType, Array<PostType>>(state => state.posts.posts)

    return (
        <div>
            <Title title={'Posts'} isDesc={false}/>
            <div className={s.select}>
                <Select/>
            </div>
            <div className={s.posts}>
                {posts.map(ps =>
                    <Post
                        key={ps.id}
                        postId={ps.id}
                        title={ps.title}
                        blogName={ps.blogName}
                        date={ps.createdAt}
                    />)}

            </div>
        </div>
    );
};

