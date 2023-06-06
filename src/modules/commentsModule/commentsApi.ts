import { instance } from 'common/constans';
import { ResponseType } from 'modules/blogsModule';
import { AxiosResponse } from 'axios';
import { CommentType } from 'modules/commentsModule';

export const apiComments = {
	getComments(postId: string, data: { pageNumber: number; pageSize: number }) {
		return instance
			.get<ResponseType<CommentType[]>>(`api/posts/${postId}/comments`, { params: data })
			.then(res => res.data);
	},
	createComment(content: string , postId: string) {
		return instance
			.post<'', AxiosResponse<CommentType>, { content: string }>(`api/posts/${postId}/comments`, { content })
			.then(res => res.data);
	},
	updateComment(content: string , commentId: string) {
		return instance.put<'', AxiosResponse, { content: string }>(`api/comments/${commentId}`, {content});
	},
	deleteComment(commentId: string) {
		return instance.delete(`api/comments/${commentId}`);
	},
};