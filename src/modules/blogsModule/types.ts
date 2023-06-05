export type BlogType = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
};

export type ResponseType<T> = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: T;
};

export type QueryParamsType = {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: string;
  searchNameTerm?: string;
};


export type OptionsSelectorType = {
  title: string,
  value?: string
}