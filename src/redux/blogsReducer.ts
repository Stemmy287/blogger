import {apiBlogs, BlogType} from "../dal/apiBlogs";
import {Dispatch} from "redux";

const initialState: BlogsDomainType = {
    blog: {
        id: '',
        name: '',
        description: '',
        websiteUrl: '',
        createdAt: ''
    },
    blogs: []
}



export const blogsReducer = (state = initialState, action: ActionType): BlogsDomainType  => {
    switch (action.type) {
        case 'SET-BLOGS':
            return {...state, blogs: action.blogs}
        case 'SET-BLOG':
            return {...state, blog: action.blog}
        default:
            return state
    }
}

//actions
export const setBlogsAC = (blogs: Array<BlogType>) => ({type: 'SET-BLOGS', blogs} as const)
export const setBlogAC = (blog: BlogType) => ({type: 'SET-BLOG', blog} as const)

//thunks
export const fetchBlogs = () => (dispatch: Dispatch) => {
    apiBlogs.getBlogs()
        .then((res) => dispatch(setBlogsAC(res.items)))
}

export const fetchBlog = (blogId: string) => (dispatch: Dispatch) => {
    apiBlogs.getBlog(blogId)
        .then((res) => dispatch(setBlogAC(res)))
}

//types
type ActionType =
    ReturnType<typeof setBlogsAC>
    | ReturnType<typeof setBlogAC>


type BlogsDomainType = {
    blog: BlogType
    blogs: Array<BlogType>
}