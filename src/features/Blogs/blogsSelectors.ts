import {AppRootStateType} from "app/store";

export const blogsSelector = (state: AppRootStateType) => state.blogs.blogs.items
export const blogSelector = (state: AppRootStateType) => state.blogs.blog

//meta data
export const blogsTotalCountSelector = (state: AppRootStateType) => state.blogs.blogs.totalCount

//query params
export const blogsPageNumberSelector = (state: AppRootStateType) => state.blogs.queryParams.pageNumber
export const blogsPageSizeSelector = (state: AppRootStateType) => state.blogs.queryParams.pageSize
export const blogsSortBySelector = (state: AppRootStateType) => state.blogs.queryParams.sortBy
export const blogsSortDirectionSelector = (state: AppRootStateType) => state.blogs.queryParams.sortDirection
export const blogsSearchNameTermSelector = (state: AppRootStateType) => state.blogs.queryParams.searchNameTerm


