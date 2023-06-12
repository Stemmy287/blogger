import { AppRootStateType } from 'store';

export const commentsSelector = (state: AppRootStateType) => state.comments.comments.items;

//meta data
export const commentsTotalCountSelector = (state: AppRootStateType) => state.comments.comments.totalCount;

//query params
export const commentsPageNumberSelector = (state: AppRootStateType) => state.comments.queryParams.pageNumber;
export const isPaginationCommentsSelector = (state: AppRootStateType) => state.comments.isPagination

//states
export const isLoadingCommentsSelector = (state: AppRootStateType) => state.comments.isLoadingComments
