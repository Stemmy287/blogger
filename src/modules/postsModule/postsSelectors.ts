import { AppRootStateType } from 'store';

//posts
export const postsSelector = (state: AppRootStateType) => state.posts.posts.items;
export const postSelector = (state: AppRootStateType) => state.posts.post;

//meta data
export const postsTotalCountSelector = (state: AppRootStateType) => state.posts.posts.totalCount;

//query params
export const postsPageNumberSelector = (state: AppRootStateType) => state.posts.queryParams.pageNumber;
export const postsSortBySelector = (state: AppRootStateType) => state.posts.queryParams.sortBy;
export const postsSortDirectionSelector = (state: AppRootStateType) => state.posts.queryParams.sortDirection;
export const isPaginationPostsSelector = (state: AppRootStateType) => state.posts.isPagination
export const isLoadingPostsSelector = (state: AppRootStateType) => state.posts.isLoadingPosts