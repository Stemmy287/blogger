import { BlogType, ResponseType } from 'modules/blogsModule';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppRootStateType } from 'store';
import { PostType } from 'modules/postsModule';
import { apiBlogs } from 'modules/blogsModule';

export const fetchBlogsTC = createAsyncThunk(
	'blogs/fetchBlogs',
	async (param, { dispatch, rejectWithValue, getState }) => {
		const state = getState() as AppRootStateType;
		const queryParams = state.blogs.queryParams;

		try {
			const res = await apiBlogs.getBlogs(queryParams);
			dispatch(setBlogsAC({ blogs: res }));
		} catch (e) {
			return rejectWithValue(null);
		}
	}
);
export const fetchBlogTC = createAsyncThunk(
	'blogs/fetchBlog',
	async (param: { blogId: string }, { dispatch, rejectWithValue }) => {
		try {
			const res = await apiBlogs.getBlog(param.blogId);
			dispatch(setBlogAC({ blog: res }));
		} catch (e) {
			return rejectWithValue(null);
		}
	}
);

export const fetchPostsForSpecificBlogTC = createAsyncThunk(
	'blogs/fetchPosts',
	async (param: string, { dispatch, rejectWithValue, getState }) => {
		const state = getState() as AppRootStateType;
		const queryParams = state.blogs.queryParamsForPosts;
		const isPagination = state.blogs.isPaginationForPosts;

		try {
			const res = await apiBlogs.getPostsForSpecificBlog(
				param,
				isPagination ? queryParams : { ...queryParams, pageNumber: 1 }
			);
			dispatch(setPostsForSpecificBlogAC({ posts: res }));
		} catch (e) {
			return rejectWithValue(null);
		}
	}
);

const slice = createSlice({
	name: 'blogs',
	initialState: {
		blogs: {
			items: [] as BlogType[],
		} as ResponseType<BlogType[]>,
		blog: {} as BlogType,
		queryParams: {
			pageNumber: 1,
			pageSize: 15,
			sortBy: '',
			sortDirection: '',
			searchNameTerm: '',
		},
		isPagination: false,
		postsForSpecificBlog: {
			items: [] as PostType[],
		} as ResponseType<PostType[]>,
		queryParamsForPosts: {
			pageNumber: 1,
			pageSize: 15,
		},
		isPaginationForPosts: false,
	},
	reducers: {
		setBlogsAC(state, action: PayloadAction<{ blogs: ResponseType<BlogType[]> }>) {
			if (state.isPagination) {
				state.blogs = { ...action.payload.blogs, items: [...state.blogs.items, ...action.payload.blogs.items] };
				state.isPagination = false;
			} else {
				state.blogs = action.payload.blogs;
			}
		},
		setPageNumberBlogsAC(state, action: PayloadAction<{ pageNumber: number }>) {
			state.queryParams.pageNumber = action.payload.pageNumber;
		},
		setSortByBlogsAC(state, action: PayloadAction<{ sortBy: string; sortDirection: string }>) {
			state.queryParams = { ...state.queryParams, ...action.payload };
		},
		setSearchNameTermBlogsAC(state, action: PayloadAction<{ searchNameTerm: string }>) {
			state.queryParams.searchNameTerm = action.payload.searchNameTerm;
		},
		setIsPaginationBlogsAC(state) {
			state.isPagination = true;
		},
		setBlogAC(state, action: PayloadAction<{ blog: BlogType }>) {
			state.blog = action.payload.blog;
		},
		setPostsForSpecificBlogAC(state, action: PayloadAction<{ posts: ResponseType<PostType[]> }>) {
			if (state.isPaginationForPosts) {
				state.postsForSpecificBlog = {
					...action.payload.posts,
					items: [...state.postsForSpecificBlog.items, ...action.payload.posts.items],
				};
				state.isPagination = false;
			} else {
				state.postsForSpecificBlog = action.payload.posts;
			}
		},
		setPageNumberPostsForSpecificBLogAC(state, action: PayloadAction<{ pageNumber: number }>) {
			state.queryParamsForPosts.pageNumber = action.payload.pageNumber;
		},
		setIsPaginationPostsForSpecificBLogAC(state) {
			state.isPaginationForPosts = true;
		},
	},
});

export const blogsReducer = slice.reducer;
export const {
	setBlogsAC,
	setBlogAC,
	setPageNumberBlogsAC,
	setSortByBlogsAC,
	setSearchNameTermBlogsAC,
	setIsPaginationBlogsAC,
	setPostsForSpecificBlogAC,
	setPageNumberPostsForSpecificBLogAC,
	setIsPaginationPostsForSpecificBLogAC,
} = slice.actions;
