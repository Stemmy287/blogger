import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostType } from 'modules/postsModule';
import { apiPosts } from 'modules/postsModule';
import { AppRootStateType } from 'store';
import { ResponseType } from 'modules/blogsModule';

export const fetchPosts = createAsyncThunk(
	'postsModule/fetchPosts',
	async (param, {dispatch, rejectWithValue, getState }) => {
		const state = getState() as AppRootStateType;
		const queryParams = state.posts.queryParams;
		const isPagination = state.posts.isPagination;

		dispatch(setIsLoadingPosts(true))

		try {
			const res = await apiPosts.getPosts(isPagination ? queryParams : { ...queryParams, pageNumber: 1 });
			dispatch(setIsLoadingPosts(false))
			return res
		} catch (e) {
			dispatch(setIsLoadingPosts(false))
			return rejectWithValue(null);
		}
	}
);

export const fetchPost = createAsyncThunk(
	'postsModule/fetchPost',
	async (param: string , { rejectWithValue }) => {
		try {
			return  await apiPosts.getPost(param);
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
		isLoadingPosts: false,
		queryParams: {
			pageNumber: 1,
			pageSize: 15,
			sortBy: '',
			sortDirection: '',
		},
		isPagination: false,
	},
	reducers: {
		setPageNumberPosts(state, action: PayloadAction<number>) {
			state.queryParams.pageNumber = action.payload;
		},
		setSortByPosts(state, action: PayloadAction<{ sortBy: string; sortDirection: string }>) {
			state.queryParams = { ...state.queryParams, ...action.payload };
		},
		setIsLoadingPosts(state, action:PayloadAction<boolean>) {
			state.isLoadingPosts = action.payload
		},
		setIsPaginationPosts(state) {
			state.isPagination = true;
		},
		clearPost(state) {
			state.post = {} as PostType
		}
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
export const { setPageNumberPosts, setSortByPosts, setIsLoadingPosts, setIsPaginationPosts, clearPost } = slice.actions;