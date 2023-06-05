import { AppRootStateType } from 'store/store';

export const commentsSelector = (state: AppRootStateType) => state.comments.comments.items;

//meta data
export const commentsTotalCountSelector = (state: AppRootStateType) => state.comments.comments.totalCount;

//query params
export const commentsPageNumberSelector = (state: AppRootStateType) => state.comments.queryParams.pageNumber;
