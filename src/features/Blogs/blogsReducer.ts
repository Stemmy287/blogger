import {apiBlogs, BlogType, ResponseType} from "features/Blogs/blogsApi";
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
    dispatch(setBlogsAC({blogs: res}))
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
    blogs: {
      items: [] as BlogType[]
    } as ResponseType<BlogType[]>,
    blog: {} as BlogType,
    queryParams: {
      pageNumber: 1,
      pageSize: 15
    }
  },
  reducers: {
    setBlogsAC(state, action: PayloadAction<{ blogs: ResponseType<BlogType[]> }>) {
      const index = state.blogs.items.findIndex(el => el.id === action.payload.blogs.items[0].id)

      if (index > -1) {
        state.blogs = {...state.blogs}
      } else {
        state.blogs = {...action.payload.blogs, items: [...state.blogs.items, ...action.payload.blogs.items]}
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
