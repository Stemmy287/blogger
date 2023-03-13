import {apiBlogs, BlogType} from "features/Blogs/blogsApi";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppRootStateType} from "app/store";

export const fetchBlogsTC = createAsyncThunk('Blogs/fetchBlogs', async (param, {
  dispatch,
  rejectWithValue,
  getState
}) => {

  const state = getState() as AppRootStateType
  const queryParams = state.blogs.queryParams

  try {
    const res = await apiBlogs.getBlogs(queryParams)
    dispatch(setBlogsAC({blogs: res.items}))
  } catch (e) {
    return rejectWithValue(null)
  }
})
export const fetchBlogTC = createAsyncThunk('Blogs/fetchBlog', async (param: { blogId: string }, {
  dispatch,
  rejectWithValue
}) => {
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
    blogs: [] as Array<BlogType>,
    queryParams: {
      pageNumber: 1,
      pageSize: 15
    }
  },
  reducers: {
    setBlogsAC(state, action: PayloadAction<{ blogs: Array<BlogType> }>) {
      const index = state.blogs.findIndex(el => action.payload.blogs[0].id === el.id)

      if (index > -1) {
        state.blogs = [...state.blogs]
      } else {
        state.blogs = [...state.blogs, ...action.payload.blogs]
      }

    },
    setBlogAC(state, action: PayloadAction<{ blog: BlogType }>) {
      state.blog = action.payload.blog
    },
    setPageNumberAC(state, action: PayloadAction<{ pageNumber: number }>) {
      state.queryParams.pageNumber = action.payload.pageNumber
    }
  }
})

export const blogsReducer = slice.reducer
export const {setBlogsAC, setBlogAC, setPageNumberAC} = slice.actions
