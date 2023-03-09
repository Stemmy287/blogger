import {AppRootStateType} from "app/store";

export const postsSelector = (state: AppRootStateType) => state.posts.posts
export const postSelector = (state: AppRootStateType) => state.posts.post

