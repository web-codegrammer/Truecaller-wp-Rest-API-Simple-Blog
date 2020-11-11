import { useState, useEffect, } from 'react'
import { get, objectToQueryString, stringifyObjectValues, } from "./common"
import * as urls from "../constants/urls"
import {
    ITopTagsResponse,
    ITopTag,
    ICategoriesResponse,
    ICategory,
    IAPIState,
    IBlogFeedsQueryParams,
    IBlogFeedsResponse,
    IBlogFeed,
    IAction,
    IRootState,
} from "../interfaces"
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { ACTION_TYPES } from '../store/actions'

export function useGetCategories(): IAPIState<ICategory[] | undefined> {
    const [categories, setCategories] = useState<IAPIState<ICategory[] | undefined>>(
        {isLoading: true, data: undefined}
    )

    const dispatch: Dispatch<IAction> = useDispatch()

    useEffect(() => {
        (async() => {
            const response: ICategoriesResponse | undefined = await get(urls.CATEGORIES)
            setCategories(
                {
                    isLoading: false, 
                    data: response && response.categories && response.categories.map(
                        ({name, slug}) => ({name, slug})
                    ),
                }
            )
        })()
    }, [])
    dispatch({type: ACTION_TYPES.SAVE_CATEGORIES, payload: {data: categories.data}})
    return { ...categories }
}

export function useGetTopTags(): IAPIState<ITopTag[] | undefined> {
    const [topTags, setCategories] = useState<IAPIState<ITopTag[] | undefined>>(
        {isLoading: true, data: undefined}
    )
    
    const dispatch: Dispatch<IAction> = useDispatch()

    useEffect(() => {
        (async() => {
            const response: ITopTagsResponse | undefined = await get(urls.TAGS)
            setCategories(
                {
                    isLoading: false, 
                    data: response && response.tags && response.tags.map(
                        ({name, slug}) => ({name, slug})
                    ),
                }
            )
        })()
    }, [])

    dispatch({type: ACTION_TYPES.SAVE_TOP_TAGS, payload: {data: topTags.data}})

    return { ...topTags }
}

export function useGetBlogPost(postId: number, postSlug: string): IAPIState<IBlogFeed | undefined> {
    const [blogPost, setBlogPost] = useState<IAPIState<IBlogFeed | undefined>>(
        {isLoading: true, data: undefined}
    )
    const blogs = useSelector((state: IRootState) => state.blog.blogs) || []
    useEffect(() => {
        const post = blogs.find(({ID, slug}) => ((ID === postId) && (slug === postSlug)))
        if(post){
            setBlogPost(
                {
                    isLoading: false, 
                    data: post,
                }
            )
        }
        else{
            (async() => {
                const response: IBlogFeed | undefined = await get(`${urls.SINGLE_POST_URL}${postId}`)
                setBlogPost(
                    {
                        isLoading: false, 
                        data: response,
                    }
                )
            })()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { ...blogPost }
}

export function useGetBlogs(
    query: IBlogFeedsQueryParams,
    shouldAppend: boolean = true
): IAPIState<IBlogFeed[] | undefined> {
    const [blogs, setBlogs] = useState<IAPIState<{
        feed?: IBlogFeed[] 
        totalCount: number
    }>>(
        {isLoading: true, data: {feed: undefined, totalCount: 0}}
    )
    const queryString = objectToQueryString(stringifyObjectValues(query))
    const dispatch: Dispatch<IAction> = useDispatch()

    useEffect(() => {
        (async() => {
            const response: IBlogFeedsResponse | undefined = await get(`${urls.POSTS_FEED_URL}&${queryString}`)
            const newFeed = response && response.posts && response.posts.map(
                ({
                    author,
                    categories,
                    content,
                    date,
                    excerpt,
                    featured_image,
                    ID,
                    slug,
                    time,
                    tags,
                    title,
                }) => ({
                    author,
                    categories,
                    content,
                    date,
                    excerpt,
                    featured_image,
                    ID,
                    slug,
                    time,
                    tags,
                    title,
                })
            )
            setBlogs(
                {
                    isLoading: false, 
                    data: {
                        feed: [
                            ...((shouldAppend && blogs.data.feed) || []),
                            ...(newFeed || [])
                        ],
                        totalCount: (response && response.found) || 0
                    }
                }
            )
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryString])

    dispatch(
        {
            type: ACTION_TYPES.SAVE_BLOG_FEEDS,
            payload: {data: blogs.data.feed, totalCount: blogs.data.totalCount}
        }
    )
    return { data: blogs.data.feed, isLoading: blogs.isLoading }
}
