import { instance } from 'common/constans';
import { QueryParamsType, ResponseType } from 'modules/blogsModule';
import { PostType } from 'modules/postsModule';

export const apiPosts = {
	getPosts(data: QueryParamsType) {
		return instance.get<ResponseType<PostType[]>>('api/posts', { params: data }).then(res => res.data);
	},
	getPost(postId: string) {
		return instance.get<PostType>(`api/posts/${postId}`).then(res => res.data);
	},
};