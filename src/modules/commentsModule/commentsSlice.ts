import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseType } from 'modules/blogsModule';
import { AppRootStateType } from 'store';
import { apiComments } from 'modules/commentsModule';
import { CommentType } from 'modules/commentsModule';

export const fetchComments = createAsyncThunk(
	'postsModule/fetchComment',
	async (param: string, {dispatch , rejectWithValue, getState }) => {
		const state = getState() as AppRootStateType;
		const queryParams = state.comments.queryParams;
		const isPagination = state.comments.isPagination;

		dispatch(setIsLoadingComments(true))
		try {
			const res = await apiComments.getComments(
				param,
				isPagination
					? queryParams
					: {
						...queryParams,
						pageNumber: 1,
					}
			);
			dispatch(setIsLoadingComments(false))
			return res
		} catch (e) {
			return rejectWithValue(null);
		}
	}
);

export const createComment = createAsyncThunk(
	'postsModule/createComment',
	async (
		param: {
			content: string;
			postId: string;
		},
		{ rejectWithValue }
	) => {
		try {
			return await apiComments.createComment(param.content, param.postId);
		} catch (e) {
			return rejectWithValue(null);
		}
	}
);

export const updateComment = createAsyncThunk(
	'postsModule/updateComment',
	async (
		param: {
			content: string;
			commentId: string;
		},
		{ rejectWithValue }
	) => {
		try {
			await apiComments.updateComment(param.content, param.commentId);
			return { content: param.content, commentId: param.commentId };
		} catch (e) {
			return rejectWithValue(null);
		}
	}
);

export const deleteComment = createAsyncThunk(
	'postsModule/deleteComment',
	async (param: string, { rejectWithValue }) => {
		try {
			await apiComments.deleteComment(param);
			return param;
		} catch (e) {
			return rejectWithValue(null);
		}
	}
);

const slice = createSlice({
	name: 'comments',
	initialState: {
		comments: {
			items: [] as CommentType[],
		} as ResponseType<CommentType[]>,
		queryParams: {
			pageNumber: 1,
			pageSize: 15,
		},
		isPagination: false,
		isLoadingComments: false,
	},
	reducers: {
		setPageNumberComments(state, action: PayloadAction<number>) {
			state.queryParams.pageNumber = action.payload;
		},
		setIsPaginationComments(state) {
			state.isPagination = true;
		},
		setIsLoadingComments(state, action: PayloadAction<boolean>) {
			state.isLoadingComments = action.payload
		},
		clearComments(state) {
			state.comments = {} as ResponseType<CommentType[]>;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchComments.fulfilled, (state, action) => {
			if (state.isPagination) {
				state.comments = {
					...action.payload,
					items: [...state.comments.items, ...action.payload.items],
				};
				state.isPagination = false;
			} else {
				state.comments = action.payload;
			}
		});
		builder.addCase(createComment.fulfilled, (state, action) => {
			state.comments.items.unshift(action.payload);
			state.comments.totalCount += 1;
		});
		builder.addCase(updateComment.fulfilled, (state, action) => {
			const index = state.comments.items.findIndex(cm => cm.id === action.payload.commentId);

			if (index > -1) {
				state.comments.items[index].content = action.payload.content;
			}
		});
		builder.addCase(deleteComment.fulfilled, (state, action) => {
			const index = state.comments.items.findIndex(cm => cm.id === action.payload);

			if (index > -1) {
				state.comments.items.splice(index, 1);
				state.comments.totalCount -= 1;
			}
		});
	},
});

export const commentsReducer = slice.reducer;
export const { setPageNumberComments, setIsPaginationComments, setIsLoadingComments, clearComments } = slice.actions;
