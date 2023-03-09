import {instance} from "common/constans/instanceApi";
import {ResponseType} from "features/Blogs/blogsApi";

export const apiPosts = {
    getPosts() {
        return instance.get<ResponseType<Array<PostType>>>(`api/posts?pageSize=15`)
            .then(res => res.data)
    },
    getPost(postId: string) {
        return instance.get<PostType>(`api/posts/${postId}`)
            .then(res => res.data)
    }
}

//types
export type PostType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
    extendedLikesInfo: LikeInfoType
}

export type LikeInfoType = {
    likesCount: number
    dislikesCount: number
    myStatus: string
    newestLikes: Array<NewestLikesType>
}

export type NewestLikesType = {
    addedAt: string
    userId: string
    login: string
}