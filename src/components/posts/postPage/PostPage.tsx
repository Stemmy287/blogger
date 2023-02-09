import React, {useEffect} from 'react';
import {Title} from "../../common/title/Title";
import {BackLink} from "../../common/backLink/BackLink";
import {PostDeployed} from "../postDeployed/postDeployed";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppDispatch, ReduxRootType} from "../../../redux/store";
import {PostType} from "../../../dal/apiBlogs";
import {fetchPost} from "../../../redux/postsReducer";

export const PostPage = () => {

    const {postId} = useParams()
    const post = useSelector<ReduxRootType, PostType>(state => state.posts.post)
    const dispatch = AppDispatch()

    useEffect(() => {
        if (postId) {
            dispatch(fetchPost(postId))
        }
    })

    return (
        <div>
            <Title title={'Posts'} isDesc={true} desc={post.blogName}/>
            <BackLink link={'/posts'} where={'posts'}/>
            <PostDeployed
                postId={post.id}
                blogName={post.blogName}
                postName={post.title}
                date={post.createdAt}
                content={post.content}
            />
        </div>
    );
};