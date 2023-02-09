import axios from "axios";

const instanse = axios.create({
    baseURL: 'https://back-samurai.vercel.app/'
})

export const apiBlogs = {
    getBlogs() {
        return instanse.get<ResponseType<Array<BlogType>>>(`api/blogs?pageSize=15`)
            .then(res => res.data)
    },
    getBlog(blogId: string) {
        return instanse.get<BlogType>(`api/blogs/${blogId}`)
            .then(res => res.data)
    }
}

export const apiPosts = {
    getPosts() {
        return instanse.get<ResponseType<Array<PostType>>>(`api/posts?pageSize=15`)
            .then(res => res.data)
    },
    getPost(postId: string) {
        return instanse.get<PostType>(`api/posts/${postId}`)
            .then(res => res.data)
    }
}

//types

export type BlogType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
}

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

export type ResponseType<T> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: T
}