import {instance} from "common/constans/instanceApi";

export const apiBlogs = {
    getBlogs(data: BlogsQueryParamsType) {
        return instance.get<ResponseType<Array<BlogType>>>(`api/blogs`, {params: data})
            .then(res => res.data)
    },
    getBlog(blogId: string) {
        return instance.get<BlogType>(`api/blogs/${blogId}`)
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

export type ResponseType<T> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: T
}

export type BlogsQueryParamsType = {
    pageNumber: number
}