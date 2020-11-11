export interface IAPIState<T> {
    data: T
    isLoading: boolean
}

export interface IGenericObject<T> {
    [key: string]: T
}

export interface ITopTag {
    name: string
    slug: string
}
export interface ITopTagsResponse {
    tags: Array<ITopTag & {
        ID: number
        description: string
        post_count: number
    }>
}

export interface ICategory {
    name: string
    slug: string
}

export interface ICategoriesResponse {
    categories: Array<ICategory & {
        ID: number
        description: string
        post_count: number
        parent: number
    }>
}

export interface IBlogFeedsQueryParams {
    category?: string
    tag?: string
    page: number
}

export interface IBlogFeed {
    ID: number
    author: {
        name: string
        avatar_URL: string
    },
    date: string
    title: string
    content: string
    excerpt: string
    slug: string
    time: String
    featured_image: string
    categories: {
        [key: string]: ICategory
    }
    tags: {
        [key: string]: ITopTag
    }
}

export interface IBlogFeedsResponse {
    found: number
    posts: Array<IBlogFeed>
}

export interface IRootState {
    blog: {
        topTags?: ITopTag[],
        categories?: ICategory[],
        blogs?: IBlogFeed[],
        totalBlogs: number
    }
}

export interface IAction {
	type: string
	payload: any
}
