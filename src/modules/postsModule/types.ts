export type PostType = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
  extendedLikesInfo: LikeInfoType;
};

export type LikeInfoType = {
  likesCount: number;
  dislikesCount: number;
  myStatus: string;
  newestLikes: Array<NewestLikesType>;
};

export type NewestLikesType = {
  addedAt: string;
  userId: string;
  login: string;
};