import {instance} from "common/constans/instanceApi";
import {QueryParamsType, ResponseType} from "modules/blogsModule/blogsApi";

export const apiPosts = {

  getPosts(data: QueryParamsType) {
    return instance.get<ResponseType<PostType[]>>(`api/posts`, {params: data})
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