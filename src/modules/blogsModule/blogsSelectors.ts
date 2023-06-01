import { AppRootStateType } from 'store/store';

export const blogsSelector = (state: AppRootStateType) => state.blogs.blogs.items;
export const blogSelector = (state: AppRootStateType) => state.blogs.blog;

//meta data
export const blogsTotalCountSelector = (state: AppRootStateType) => state.blogs.blogs.totalCount;

//query params
export const blogsPageNumberSelector = (state: AppRootStateType) => state.blogs.queryParams.pageNumber;
export const blogsSortBySelector = (state: AppRootStateType) => state.blogs.queryParams.sortBy;
export const blogsSortDirectionSelector = (state: AppRootStateType) => state.blogs.queryParams.sortDirection;
export const blogsSearchNameTermSelector = (state: AppRootStateType) => state.blogs.queryParams.searchNameTerm;

//posts for specific blog
export const postsForSpecificBlogSelector = (state: AppRootStateType) => state.blogs.postsForSpecificBlog.items;

//meta data for posts
export const postsTotalCountForSpecificBlogSelector = (state: AppRootStateType) =>
  state.blogs.postsForSpecificBlog.totalCount;

//query params for posts
export const postsPageNumberForSpecificBlogSelector = (state: AppRootStateType) =>
  state.blogs.queryParamsForPosts.pageNumber;
