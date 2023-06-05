import { LikeInfoType } from 'modules/postsModule/postsApi';
import { instance } from 'common/constans/instanceApi';
import { ResponseType } from 'modules/blogsModule/blogsApi';
import { AxiosResponse } from 'axios';

export const apiComments = {
	getComments(postId: string, data: { pageNumber: number; pageSize: number }) {
		return instance
			.get<ResponseType<CommentType[]>>(`api/posts/${postId}/comments`, { params: data })
			.then(res => res.data);
	},
	createComment(data: { content: string }, postId: string) {
		return instance
			.post<'', AxiosResponse<CommentType>, { content: string }>(`api/posts/${postId}/comments`, data)
			.then(res => res.data);
	},
	updateComment(data: { content: string }, commentId: string) {
		return instance.put<'', AxiosResponse, { content: string }>(`api/comments/${commentId}`, data);
	},
	deleteComment(commentId: string) {
		return instance.delete(`api/comments/${commentId}`);
	},
};

//types
export type CommentType = {
	id: string;
	content: string;
	userId: string;
	userLogin: string;
	createdAt: string;
	likesInfo: Omit<LikeInfoType, 'newestLikes'>;
};