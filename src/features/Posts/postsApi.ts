import {instance} from "common/constans/instanceApi";
import {QueryParamsType, ResponseType} from "features/Blogs/blogsApi";

export const apiPosts = {

  getPosts(data: QueryParamsType) {
    return instance.get<ResponseType<PostType[]>>(`api/posts`, {params: data})
      .then(res => res.data)
  },
  getPost(postId: string) {
    return instance.get<PostType>(`api/posts/${postId}`)
      .then(res => res.data)
  },
  getComments(postId: string) {
    return instance.get<CommentType[]>(`api/comments${postId}`)
      .then(res => res.data)
  },
  updateComment(data: { content: string }, commentId: string) {
    return instance.put(`api/comments${commentId}`, data)
  },
  deleteComment(commentId: string) {
    return instance.delete(`api/comments${commentId}`)
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

export type CommentType = {
  id: string,
  content: string,
  commentatorInfo: CommentatorInfoType
  createdAt: string
}

type CommentatorInfoType = {
  userId: string,
  userLogin: string
}