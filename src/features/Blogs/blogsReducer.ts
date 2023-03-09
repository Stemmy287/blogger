import {apiBlogs, BlogType} from "features/Blogs/blogsApi";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const fetchBlogsTC = createAsyncThunk('Blogs/fetchBlogs', async (param, {dispatch ,rejectWithValue}) => {
    try {
        const res = await apiBlogs.getBlogs()
        dispatch(setBlogsAC({blogs: res.items}))
    } catch (e) {
        return rejectWithValue(null)
    }
})
export const fetchBlogTC = createAsyncThunk('Blogs/fetchBlog', async (param: {blogId: string}, {dispatch ,rejectWithValue}) => {
    try {
        const res = await apiBlogs.getBlog(param.blogId)
        dispatch(setBlogAC({blog: res}))
    } catch (e) {
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: 'blogs',
    initialState: {
        blog: {} as BlogType,
        blogs: [] as Array<BlogType>
    },
    reducers: {
        setBlogsAC(state, action: PayloadAction<{blogs: Array<BlogType>}>) {
            state.blogs = action.payload.blogs
        },
        setBlogAC(state, action: PayloadAction<{blog: BlogType}>) {
            state.blog = action.payload.blog
        }
    }
})

export const blogsReducer = slice.reducer
export const {setBlogsAC, setBlogAC} = slice.actions
