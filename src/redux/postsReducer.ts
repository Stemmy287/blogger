import {apiPosts, PostType} from "../dal/apiBlogs";
import {Dispatch} from "redux";
import exp from "constants";
import {fetchBlog, setBlogAC} from "./blogsReducer";
import {AppThunkActionType, AppThunkDispatchType} from "./store";

const initialState: PostsDomainType = {
    post: {
        id: '',
        title: '',
        shortDescription: '',
        content: '',
        blogId: '',
        blogName: '',
        createdAt: '',
        extendedLikesInfo: {
            likesCount: 0,
            dislikesCount: 0,
            myStatus: '',
            newestLikes: []
        }
    },
    posts: []
}

export const postsReducer = (state = initialState, action: ActionPostsType):PostsDomainType => {
    switch (action.type) {
        case 'SET-POSTS':
            return {...state, posts: action.posts}
        case 'SET-POST':
            return {...state, post: action.post}
        default:
            return state
    }

}

//actions
export const setPostsAC = (posts: Array<PostType>) => ({type: 'SET-POSTS', posts} as const)
export const setPostAC= (post: PostType) => ({type: 'SET-POST', post} as const)

//thunks

export const fetchPosts = () => (dispatch: Dispatch) => {
    apiPosts.getPosts()
        .then(res => {
            dispatch(setPostsAC(res.items))
        })
}

export const fetchPost = (postId: string): AppThunkActionType => (dispatch) => {
    apiPosts.getPost(postId)
        .then(res => {
            dispatch(setPostAC(res))
        })
}

//types
export type ActionPostsType =
    ReturnType<typeof setPostsAC>
    | ReturnType<typeof setPostAC>

export type PostsDomainType = {
    post: PostType
    posts: Array<PostType>
}