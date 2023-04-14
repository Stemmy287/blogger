import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {apiPosts, CommentType, PostType} from "features/Posts/postsApi";
import {AppRootStateType} from "app/store";
import {ResponseType} from "features/Blogs/blogsApi";

export const fetchPostsTC = createAsyncThunk('Posts/fetchPosts', async (param, {
  dispatch,
  rejectWithValue,
  getState
}) => {

  const state = getState() as AppRootStateType
  const queryParams = state.posts.queryParams

  try {
    const res = await apiPosts.getPosts(queryParams)
    dispatch(setPostsAC({posts: res}))
  } catch (e) {
    return rejectWithValue(null)
  } finally {
    dispatch(setIsPaginationPostsAC({isPagination: false}))
  }
})
export const fetchPostTC = createAsyncThunk('Posts/fetchPost', async (param: { postId: string }, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const res = await apiPosts.getPost(param.postId)
    dispatch(setPostAC({post: res}))
  } catch (e) {
    return rejectWithValue(null)
  }
})

export const fetchCommentsTC = createAsyncThunk('Posts/fetchComments', async (param: { postId: string }, {
  dispatch,
  rejectWithValue
}) => {
  try {
    const res = await apiPosts.getComments(param.postId)
    dispatch(setCommentsAC({comments: res}))
  } catch (e) {
    return rejectWithValue(null)
  }
})

export const updateCommentTC = createAsyncThunk('Posts/updateComment', async (param: { content: string, commentId: string }, {
  dispatch,
  rejectWithValue
}) => {
  try {
    await apiPosts.updateComment({content: param.content}, param.commentId)
    dispatch(updateCommentAC({content: param.content, commentId: param.commentId}))
  } catch (e) {
    return rejectWithValue(null)
  }
})

export const deleteCommentTC = createAsyncThunk('Posts/deleteComment', async (param: {commentId: string }, {
  dispatch,
  rejectWithValue
}) => {
  try {
    await apiPosts.deleteComment(param.commentId)
    dispatch(deleteCommentAC({commentId: param.commentId}))
  } catch (e) {
    return rejectWithValue(null)
  }
})

const slice = createSlice({
  name: 'posts',
  initialState: {
    posts: {
      items: [] as PostType[]
    } as ResponseType<PostType[]>,
    post: {} as PostType,
    comments: [] as CommentType[],
    queryParams: {
      pageNumber: 1,
      pageSize: 15,
      sortBy: '',
      sortDirection: ''
    },
    isPagination: false
  },
  reducers: {
    setPostsAC(state, action: PayloadAction<{ posts: ResponseType<PostType[]> }>) {
      if (state.isPagination) {
        state.posts = {...action.payload.posts, items: [...state.posts.items, ...action.payload.posts.items]}
      } else {
        state.posts = action.payload.posts
      }
    },
    setPageNumberPostsAC(state, action: PayloadAction<{ pageNumber: number }>) {
      state.queryParams.pageNumber = action.payload.pageNumber
    },
    setSortByPostsAC(state, action: PayloadAction<{ sortBy: string, sortDirection: string }>) {
      state.queryParams = {...state.queryParams, ...action.payload}
    },
    setIsPaginationPostsAC(state, action: PayloadAction<{ isPagination: boolean }>) {
      state.isPagination = action.payload.isPagination
    },
    setPostAC(state, action: PayloadAction<{ post: PostType }>) {
      state.post = action.payload.post
    },
    setCommentsAC(state, action: PayloadAction<{ comments: CommentType[] }>) {
      state.comments = action.payload.comments
    },
    updateCommentAC(state, action: PayloadAction<{ content: string, commentId: string }>) {
      const index = state.comments.findIndex(cm => cm.id === action.payload.commentId)

      if (index > -1) {
        state.comments[index].content = action.payload.content
      }
    },
    deleteCommentAC(state, action: PayloadAction<{ commentId: string }>) {
      const index = state.comments.findIndex(cm => cm.id === action.payload.commentId)

      if (index > -1) {
        state.comments.splice(index, 1)
      }
    }
  }
})

export const postsReducer = slice.reducer
export const {
  setPostsAC,
  setPostAC,
  setPageNumberPostsAC,
  setSortByPostsAC,
  setIsPaginationPostsAC,
  setCommentsAC,
  updateCommentAC,
  deleteCommentAC
} = slice.actions