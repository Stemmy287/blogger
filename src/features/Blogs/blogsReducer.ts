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
  } finally {
      dispatch(setIsPaginationBlogsAC({isPagination: false}))
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
      pageSize: 15,
      sortBy: '',
      sortDirection: '',
      searchNameTerm: ''
    },
    isPagination: false
  },
  reducers: {
    setBlogsAC(state, action: PayloadAction<{ blogs: ResponseType<BlogType[]> }>) {
      if (state.isPagination) {
        state.blogs = {...action.payload.blogs, items: [...state.blogs.items, ...action.payload.blogs.items]}
      } else {
        state.blogs = action.payload.blogs
      }
    },
    setPageNumberBlogsAC(state, action: PayloadAction<{ pageNumber: number }>) {
      state.queryParams.pageNumber = action.payload.pageNumber
    },
    setSortByBlogsAC(state, action: PayloadAction<{ sortBy: string, sortDirection: string }>) {
      state.queryParams = {...state.queryParams, ...action.payload}
    },
    setSearchNameTermBlogsAC(state, action: PayloadAction<{ searchNameTerm: string }>) {
      state.queryParams.searchNameTerm = action.payload.searchNameTerm
    },
    setIsPaginationBlogsAC(state, action: PayloadAction<{isPagination: boolean}>) {
      state.isPagination = action.payload.isPagination
    },
    setBlogAC(state, action: PayloadAction<{ blog: BlogType }>) {
      state.blog = action.payload.blog
    }
  }
})

export const blogsReducer = slice.reducer
export const {setBlogsAC, setBlogAC, setPageNumberBlogsAC, setSortByBlogsAC, setSearchNameTermBlogsAC, setIsPaginationBlogsAC} = slice.actions
