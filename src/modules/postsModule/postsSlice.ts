import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostType } from 'modules/postsModule';
import { apiPosts } from 'modules/postsModule';
import { AppRootStateType } from 'store';
import { ResponseType } from 'modules/blogsModule';

export const fetchPosts = createAsyncThunk(
	'postsModule/fetchPosts',
	async (param, { rejectWithValue, getState }) => {
		const state = getState() as AppRootStateType;
		const queryParams = state.posts.queryParams;
		const isPagination = state.posts.isPagination;

		try {
			return await apiPosts.getPosts(isPagination ? queryParams : { ...queryParams, pageNumber: 1 });
		} catch (e) {
			return rejectWithValue(null);
		}
	}
);

export const fetchPost = createAsyncThunk(
	'postsModule/fetchPost',
	async (param: { postId: string }, { rejectWithValue }) => {
		try {
			return  await apiPosts.getPost(param.postId);
		} catch (e) {
			return rejectWithValue(null);
		}
	}
);

const slice = createSlice({
	name: 'posts',
	initialState: {
		posts: {
			items: [] as PostType[],
		} as ResponseType<PostType[]>,
		post: {} as PostType,
		queryParams: {
			pageNumber: 1,
			pageSize: 15,
			sortBy: '',
			sortDirection: '',
		},
		isPagination: false,
	},
	reducers: {
		setPageNumberPostsAC(state, action: PayloadAction<{ pageNumber: number }>) {
			state.queryParams.pageNumber = action.payload.pageNumber;
		},
		setSortByPostsAC(state, action: PayloadAction<{ sortBy: string; sortDirection: string }>) {
			state.queryParams = { ...state.queryParams, ...action.payload };
		},
		setIsPaginationPostsAC(state) {
			state.isPagination = true;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			if (state.isPagination) {
				state.posts = { ...action.payload, items: [...state.posts.items, ...action.payload.items] };
				state.isPagination = false;
			} else {
				state.posts = action.payload;
			}
		});
		builder.addCase(fetchPost.fulfilled, (state, action) => {
			state.post = action.payload;
		});
	},

});

export const postsReducer = slice.reducer;
export const { setPageNumberPostsAC, setSortByPostsAC, setIsPaginationPostsAC } = slice.actions;