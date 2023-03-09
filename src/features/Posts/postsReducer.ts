import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {apiPosts, PostType} from "features/Posts/postsApi";

export const fetchPostsTC = createAsyncThunk('Posts/fetchPosts', async (param, {dispatch, rejectWithValue}) => {
    try {
        const res = await apiPosts.getPosts()
        dispatch(setPostsAC({posts: res.items}))
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
        post: {} as PostType,
        posts: [] as Array<PostType>
    },
    reducers: {
        setPostsAC(state, action: PayloadAction<{ posts: Array<PostType> }>) {
            state.posts = action.payload.posts
        },
        setPostAC(state, action: PayloadAction<{ post: PostType }>) {
            state.post = action.payload.post
        }
    }
})

export const postsReducer = slice.reducer
const {setPostsAC, setPostAC} = slice.actions