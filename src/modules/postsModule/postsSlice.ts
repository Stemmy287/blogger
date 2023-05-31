import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiPosts, PostType } from 'modules/postsModule/postsApi';
import { AppRootStateType } from 'store/store';
import { ResponseType } from 'modules/blogsModule/blogsApi';

export const fetchPostsTC = createAsyncThunk(
	'postsModule/fetchPosts',
	async (param, { dispatch, rejectWithValue, getState }) => {
		const state = getState() as AppRootStateType;
		const queryParams = state.posts.queryParams;
		const isPagination = state.posts.isPagination;

		try {
			const res = await apiPosts.getPosts(isPagination ? queryParams : { ...queryParams, pageNumber: 1 });
			dispatch(setPostsAC({ posts: res }));
		} catch (e) {
			return rejectWithValue(null);
		}
	}
);

export const fetchPostTC = createAsyncThunk(
	'postsModule/fetchPost',
	async (param: { postId: string }, { dispatch, rejectWithValue }) => {
		try {
			const res = await apiPosts.getPost(param.postId);
			dispatch(setPostAC({ post: res }));
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
		setPostsAC(state, action: PayloadAction<{ posts: ResponseType<PostType[]> }>) {
			if (state.isPagination) {
				state.posts = { ...action.payload.posts, items: [...state.posts.items, ...action.payload.posts.items] };
				state.isPagination = false;
			} else {
				state.posts = action.payload.posts;
			}
		},
		setPageNumberPostsAC(state, action: PayloadAction<{ pageNumber: number }>) {
			state.queryParams.pageNumber = action.payload.pageNumber;
		},
		setSortByPostsAC(state, action: PayloadAction<{ sortBy: string; sortDirection: string }>) {
			state.queryParams = { ...state.queryParams, ...action.payload };
		},
		setIsPaginationPostsAC(state) {
			state.isPagination = true;
		},
		setPostAC(state, action: PayloadAction<{ post: PostType }>) {
			state.post = action.payload.post;
		},
	},
});

export const postsReducer = slice.reducer;
export const { setPostsAC, setPostAC, setPageNumberPostsAC, setSortByPostsAC, setIsPaginationPostsAC } = slice.actions;