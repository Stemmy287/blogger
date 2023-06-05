import { BlogType, ResponseType } from 'modules/blogsModule';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppRootStateType } from 'store';
import { PostType } from 'modules/postsModule';
import { apiBlogs } from 'modules/blogsModule';

export const fetchBlogs = createAsyncThunk(
	'blogs/fetchBlogs',
	async (param, { rejectWithValue, getState }) => {
		const state = getState() as AppRootStateType;
		const queryParams = state.blogs.queryParams;
		const isPagination = state.blogs.isPagination

		try {
			return await apiBlogs.getBlogs(isPagination ? queryParams : { ...queryParams, pageNumber: 1 });
		} catch (e) {
			return rejectWithValue(null);
		}
	}
);
export const fetchBlog = createAsyncThunk(
	'blogs/fetchBlog',
	async (param: { blogId: string }, { rejectWithValue }) => {
		try {
			return await apiBlogs.getBlog(param.blogId);
		} catch (e) {
			return rejectWithValue(null);
		}
	}
);

export const fetchPostsForSpecificBlog = createAsyncThunk(
	'blogs/fetchPosts',
	async (param: string, { rejectWithValue, getState }) => {
		const state = getState() as AppRootStateType;
		const queryParams = state.blogs.queryParamsForPosts;
		const isPagination = state.blogs.isPaginationForPosts;

		try {
			return  await apiBlogs.getPostsForSpecificBlog(
				param,
				isPagination ? queryParams : { ...queryParams, pageNumber: 1 }
			);

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
		setPageNumberPostsForSpecificBLogAC(state, action: PayloadAction<{ pageNumber: number }>) {
			state.queryParamsForPosts.pageNumber = action.payload.pageNumber;
		},
		setIsPaginationPostsForSpecificBLogAC(state) {
			state.isPaginationForPosts = true;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchBlogs.fulfilled, (state, action) => {
			if (state.isPagination) {
				state.blogs = { ...action.payload, items: [...state.blogs.items, ...action.payload.items] };
				state.isPagination = false;
			} else {
				state.blogs = action.payload;
			}
		});
		builder.addCase(fetchBlog.fulfilled, (state, action) => {
			state.blog = action.payload;
		});
		builder.addCase(fetchPostsForSpecificBlog.fulfilled, (state, action) => {
			if (state.isPaginationForPosts) {
				state.postsForSpecificBlog = {
					...action.payload,
					items: [...state.postsForSpecificBlog.items, ...action.payload.items],
				};
				state.isPagination = false;
			} else {
				state.postsForSpecificBlog = action.payload;
			}
		});
	},
});

export const blogsReducer = slice.reducer;
export const {
	setPageNumberBlogsAC,
	setSortByBlogsAC,
	setSearchNameTermBlogsAC,
	setIsPaginationBlogsAC,
	setPageNumberPostsForSpecificBLogAC,
	setIsPaginationPostsForSpecificBLogAC,
} = slice.actions;
