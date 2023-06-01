import { instance } from 'common/constans/instanceApi';
import { PostType } from '../postsModule/postsApi';

export const apiBlogs = {
	getBlogs(data: QueryParamsType) {
		return instance.get<ResponseType<BlogType[]>>('api/blogs', { params: data }).then(res => res.data);
	},
	getBlog(blogId: string) {
		return instance.get<BlogType>(`api/blogs/${blogId}`).then(res => res.data);
	},
	getPostsForSpecificBlog(blogId: string) {
		return instance.get<ResponseType<PostType[]>>(`api/blogs/${blogId}/posts`).then(res => res.data);
	},
};

//types
export type BlogType = {
	id: string;
	name: string;
	description: string;
	websiteUrl: string;
	createdAt: string;
};

export type ResponseType<T> = {
	pagesCount: number;
	page: number;
	pageSize: number;
	totalCount: number;
	items: T;
};

export type QueryParamsType = {
	pageNumber: number;
	pageSize: number;
	sortBy: string;
	sortDirection: string;
	searchNameTerm?: string;
};
