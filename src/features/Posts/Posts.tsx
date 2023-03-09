import React from 'react';
import s from './posts.module.scss'
import {Title} from "common/components/Title/Title";
import {Post} from "./Post/Post";
import {useAppSelector} from "hooks/useAppSelector";
import {Select} from "common/components/Search/Select/Select";

export const Posts = () => {

    const posts = useAppSelector(state => state.posts.posts)

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

