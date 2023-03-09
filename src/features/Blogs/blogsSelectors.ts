import {AppRootStateType} from "app/store";

export const blogsSelector = (state: AppRootStateType) => state.blogs.blogs
export const blogSelector = (state: AppRootStateType) => state.blogs.blog

