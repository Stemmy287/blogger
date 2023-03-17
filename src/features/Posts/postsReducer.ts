import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {apiPosts, PostType} from "features/Posts/postsApi";
import {AppRootStateType} from "app/store";
import {ResponseType} from "features/Blogs/blogsApi";

export const fetchPostsTC = createAsyncThunk('Posts/fetchPosts', async (param, {dispatch, rejectWithValue, getState}) => {

    const state = getState() as AppRootStateType
    const queryParams = state.posts.queryParams

    try {
        const res = await apiPosts.getPosts(queryParams)
        dispatch(setPostsAC({posts: res}))
    } catch (e) {
        return rejectWithValue(null)
    }
})
export const fetchPostTC = createAsyncThunk('Posts/fetchPost', async (param: {postId: string}, {dispatch, rejectWithValue}) => {
    try {
        const res = await apiPosts.getPost(param.postId)
        dispatch(setPostAC({post: res}))
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
        queryParams: {
            pageNumber: 1,
            pageSize: 15,
            sortBy: '',
            sortDirection: ''
        }
    },
    reducers: {
        setPostsAC(state, action: PayloadAction<{ posts: ResponseType<PostType[]> }>) {
            state.posts = action.payload.posts
        },
        setPostAC(state, action: PayloadAction<{ post: PostType }>) {
            state.post = action.payload.post
        },
        setPageNumberPostsAC(state, action: PayloadAction<{ pageNumber: number }>) {
            state.queryParams.pageNumber = action.payload.pageNumber
        },
        setSortByPostsAC(state, action: PayloadAction<{sortBy: string, sortDirection: string}>) {
            state.queryParams = {...state.queryParams, ...action.payload}
        }
    }
})

export const postsReducer = slice.reducer
export const {setPostsAC, setPostAC, setPageNumberPostsAC, setSortByPostsAC} = slice.actions