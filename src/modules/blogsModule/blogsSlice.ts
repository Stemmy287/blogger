import { BlogType, ResponseType } from 'modules/blogsModule';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppRootStateType } from 'store';
import { PostType } from 'modules/postsModule';
import { apiBlogs } from 'modules/blogsModule';

export const fetchBlogs = createAsyncThunk(
	'blogs/fetchBlogs',
	async (param, { dispatch, rejectWithValue, getState }) => {
		const state = getState() as AppRootStateType;
		const queryParams = state.blogs.queryParams;
		const isPagination = state.blogs.isPagination;

		dispatch(setIsLoadingBlogs(true));

		try {
			const res = await apiBlogs.getBlogs(isPagination ? queryParams : { ...queryParams, pageNumber: 1 });
			dispatch(setIsLoadingBlogs(false));
			return res;
		} catch (e) {
			dispatch(setIsLoadingBlogs(false));
			return rejectWithValue(null);
		}
	}
);
export const fetchBlog = createAsyncThunk('blogs/fetchBlog', async (param: string, { rejectWithValue }) => {
	try {
		return await apiBlogs.getBlog(param);
	} catch (e) {
		return rejectWithValue(null);
	}
});

export const fetchPostsForSpecificBlog = createAsyncThunk(
	'blogs/fetchPosts',
	async (param: string, { rejectWithValue, getState }) => {
		const state = getState() as AppRootStateType;
		const queryParams = state.blogs.queryParamsForPosts;
		const isPagination = state.blogs.isPaginationForPosts;

		try {
			return await apiBlogs.getPostsForSpecificBlog(
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
		isLoadingBlogs: false,
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
		setPageNumberBlogs(state, action: PayloadAction<number>) {
			state.queryParams.pageNumber = action.payload;
		},
		setSortByBlogs(state, action: PayloadAction<{ sortBy: string; sortDirection: string }>) {
			state.queryParams = { ...state.queryParams, ...action.payload };
		},
		setSearchNameTermBlogs(state, action: PayloadAction<string>) {
			state.queryParams.searchNameTerm = action.payload;
		},
		setIsLoadingBlogs(state, action: PayloadAction<boolean>) {
			state.isLoadingBlogs = action.payload;
		},
		setIsPaginationBlogs(state) {
			state.isPagination = true;
		},
		setPageNumberPostsForSpecificBLog(state, action: PayloadAction<number>) {
			state.queryParamsForPosts.pageNumber = action.payload;
		},
		setIsPaginationPostsForSpecificBLog(state) {
			state.isPaginationForPosts = true;
		},
		clearBlog(state) {
			state.blog = {} as BlogType;
		},
		clearPostsForSpecificBLog(state) {
			state.postsForSpecificBlog = {} as ResponseType<PostType[]>;
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
	setPageNumberBlogs,
	setSortByBlogs,
	setSearchNameTermBlogs,
	setIsPaginationBlogs,
	setPageNumberPostsForSpecificBLog,
	setIsPaginationPostsForSpecificBLog,
	clearBlog,
	clearPostsForSpecificBLog,
	setIsLoadingBlogs,
} = slice.actions;
