import { LikeInfoType } from '../postsModule/types';

export type CommentType = {
	id: string;
	content: string;
	userId: string;
	userLogin: string;
	createdAt: string;
	likesInfo: Omit<LikeInfoType, 'newestLikes'>;
};