import { instance } from 'common/constans/instanceApi';
import { PostType } from '../postsModule/types';
import { BlogType, QueryParamsType, ResponseType } from './types';

export const apiBlogs = {
	getBlogs(data: QueryParamsType) {
		return instance.get<ResponseType<BlogType[]>>('api/blogs', { params: data }).then(res => res.data);
	},
	getBlog(blogId: string) {
		return instance.get<BlogType>(`api/blogs/${blogId}`).then(res => res.data);
	},
	getPostsForSpecificBlog(blogId: string, data: Pick<QueryParamsType, 'pageSize' | 'pageNumber'>) {
		return instance.get<ResponseType<PostType[]>>(`api/blogs/${blogId}/posts`, { params: data })
			.then(res => res.data);
	},
};
