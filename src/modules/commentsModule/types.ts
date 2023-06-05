import { LikeInfoType } from 'modules/postsModule';

export type CommentType = {
	id: string;
	content: string;
	userId: string;
	userLogin: string;
	createdAt: string;
	likesInfo: Omit<LikeInfoType, 'newestLikes'>;
};