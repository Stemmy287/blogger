import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseType } from 'modules/blogsModule';
import { AppRootStateType } from 'store';
import { apiComments } from 'modules/commentsModule';
import { CommentType } from 'modules/commentsModule';

export const fetchComments = createAsyncThunk(
	'postsModule/fetchComment',
	async (param: { postId: string }, { rejectWithValue, getState }) => {
		const state = getState() as AppRootStateType;
		const queryParams = state.comments.queryParams;
		const isPagination = state.comments.isPagination;

		try {
			return await apiComments.getComments(
				param.postId,
				isPagination
					? queryParams
					: {
							...queryParams,
							pageNumber: 1,
					  }
			);
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
			return await apiComments.createComment({ content: param.content }, param.postId);
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
			await apiComments.updateComment({ content: param.content }, param.commentId);
			return { content: param.content, commentId: param.commentId };
		} catch (e) {
			return rejectWithValue(null);
		}
	}
);

export const deleteComment = createAsyncThunk(
	'postsModule/deleteComment',
	async (param: { commentId: string }, { rejectWithValue }) => {
		try {
			await apiComments.deleteComment(param.commentId);
			return { commentId: param.commentId };
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
	},
	reducers: {
		setPageNumberCommentsAC(state, action: PayloadAction<{ pageNumber: number }>) {
			state.queryParams.pageNumber = action.payload.pageNumber;
		},
		setIsPaginationCommentsAC(state) {
			state.isPagination = true;
		},
	},
	extraReducers:(builder) => {
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
		})
		builder.addCase(createComment.fulfilled, (state, action) => {
			state.comments.items.unshift(action.payload);
			state.comments.totalCount += 1;
		})
		builder.addCase(updateComment.fulfilled, (state, action) => {
			const index = state.comments.items.findIndex(cm => cm.id === action.payload.commentId);

			if (index > -1) {
				state.comments.items[index].content = action.payload.content;
			}
		})
		builder.addCase(deleteComment.fulfilled, (state, action) => {
			const index = state.comments.items.findIndex(cm => cm.id === action.payload.commentId);

			if (index > -1) {
				state.comments.items.splice(index, 1);
				state.comments.totalCount -= 1;
			}
		})
	}
});

export const commentsReducer = slice.reducer;
export const {
	setPageNumberCommentsAC,
	setIsPaginationCommentsAC,
} = slice.actions;
