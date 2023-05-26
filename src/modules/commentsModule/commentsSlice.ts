import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ResponseType} from "modules/blogsModule/blogsApi";
import {AppRootStateType} from "store/store";
import {apiComments, CommentType} from "modules/commentsModule/commentsApi";


export const fetchCommentsTC = createAsyncThunk('postsModule/fetchComment', async (param: { postId: string }, {
  dispatch,
  rejectWithValue,
  getState
}) => {

  const state = getState() as AppRootStateType
  const queryParams = state.comments.queryParams
  const isPagination = state.comments.isPagination

  try {
    const res = await apiComments.getComments(param.postId, isPagination ? queryParams : {...queryParams, pageNumber: 1})
    dispatch(setCommentsAC({comments: res}))
  } catch (e) {
    return rejectWithValue(null)
  }
})

export const createCommentTC = createAsyncThunk('postsModule/createComment', async (param: { content: string, postId: string }, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const res = await apiComments.createComment({content: param.content}, param.postId)
    dispatch(createCommentAC({comment: res}))
  } catch (e) {
    return rejectWithValue(null)
  }
})

export const updateCommentTC = createAsyncThunk('postsModule/updateComment', async (param: { content: string, commentId: string }, {
  dispatch,
  rejectWithValue
}) => {
  try {
    await apiComments.updateComment({content: param.content}, param.commentId)
    dispatch(updateCommentAC({content: param.content, commentId: param.commentId}))
  } catch (e) {
    return rejectWithValue(null)
  }
})

export const deleteCommentTC = createAsyncThunk('postsModule/deleteComment', async (param: { commentId: string }, {
  dispatch,
  rejectWithValue
}) => {
  try {
    await apiComments.deleteComment(param.commentId)
    dispatch(deleteCommentAC({commentId: param.commentId}))
  } catch (e) {
    return rejectWithValue(null)
  }
})

const slice = createSlice({
  name: 'comments',
  initialState: {
    comments: {
      items: [] as CommentType[]
    } as ResponseType<CommentType[]>,
    queryParams: {
      pageNumber: 1,
      pageSize: 15
    },
    isPagination: false
  },
  reducers: {
    setCommentsAC(state, action: PayloadAction<{ comments: ResponseType<CommentType[]> }>) {
      if (state.isPagination) {
        state.comments = {...action.payload.comments, items: [...state.comments.items, ...action.payload.comments.items]}
        state.isPagination = false
      } else {
        state.comments = action.payload.comments
      }
    },
    createCommentAC(state, action: PayloadAction<{ comment: CommentType }>) {
      state.comments.items.unshift(action.payload.comment)
      state.comments.totalCount += 1
    },
    updateCommentAC(state, action: PayloadAction<{ content: string, commentId: string }>) {
      const index = state.comments.items.findIndex(cm => cm.id === action.payload.commentId)

      if (index > -1) {
        state.comments.items[index].content = action.payload.content
      }
    },
    deleteCommentAC(state, action: PayloadAction<{ commentId: string }>) {
      const index = state.comments.items.findIndex(cm => cm.id === action.payload.commentId)

      if (index > -1) {
        state.comments.items.splice(index, 1)
        state.comments.totalCount -= 1
      }
    },
    setPageNumberCommentsAC(state, action: PayloadAction<{ pageNumber: number }>) {
      state.queryParams.pageNumber = action.payload.pageNumber
    },
    setIsPaginationCommentsAC(state) {
      state.isPagination = true
    }
  }
})

export const commentsReducer = slice.reducer
export const {
  setCommentsAC,
  createCommentAC,
  updateCommentAC,
  deleteCommentAC,
  setPageNumberCommentsAC,
  setIsPaginationCommentsAC
} = slice.actions