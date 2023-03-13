import {AppRootStateType} from "app/store";

export const blogsSelector = (state: AppRootStateType) => state.blogs.blogs
export const blogSelector = (state: AppRootStateType) => state.blogs.blog

//query params
export const pageNumberSelector = (state: AppRootStateType) => state.blogs.queryParams.pageNumber
export const pageSizeSelector = (state: AppRootStateType) => state.blogs.queryParams.pageSize

