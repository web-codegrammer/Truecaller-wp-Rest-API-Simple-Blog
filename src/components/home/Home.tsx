import React, { useState, useMemo, useEffect } from 'react'
import { useGetBlogs } from '../../utils/apis'
import BlogPost from '../common/BlogPost'
import { NO_OF_FEEDS } from '../../constants/configs'
import { useLocation } from 'react-router'
import { IBlogFeedsQueryParams, IGenericObject, IRootState } from '../../interfaces'
import { useGetPrevious, decodeSlug } from '../../utils/common'
import { useSelector } from 'react-redux'
import { navigateTo } from '../../utils/router'

const Home = () => {
    const [page, setPage] = useState(1)
    useEffect(() => window.scrollTo(0, 0), [])
    const { pathname: locationPath } = useLocation()
    const [routeType, routeSlug] = locationPath.split('/').slice(1)
    const previousLocationPath = useGetPrevious(locationPath)
    const isPathChanged = previousLocationPath !== locationPath
    const blogFeedsParam: IBlogFeedsQueryParams = { page }
    let showPathInfo = false
    if(routeType && routeSlug) {
        (blogFeedsParam as IGenericObject<any>)[routeType] = routeSlug
        showPathInfo = true
    }
    const blogFeeds = useGetBlogs(blogFeedsParam, !isPathChanged)
    const categories = useSelector((state: IRootState) => state.blog.categories) || []
    const topTags = useSelector((state: IRootState) => state.blog.topTags) || []
    const totalPosts = useSelector((state: IRootState) => state.blog.totalBlogs) || []
    const pathInfo = useMemo(
        () => showPathInfo ? 
            `${routeType} Archives: ${
                (((routeType === 'category' ? categories: topTags)
                .find(({slug}) => slug === routeSlug) || {})['name']) ||
                decodeSlug(routeSlug)
            }` :
            '',
        [showPathInfo, routeType, routeSlug, categories, topTags]
    )
    return (
        <div className="feeds-container">
            {
                pathInfo && (
                    <h4 className="path-info">
                        {pathInfo}
                    </h4>
                )
            }
            {
                (blogFeeds.isLoading || isPathChanged) ? 
                (<h2>Loading...</h2>) :
                blogFeeds.data ?
                (<>
                    {
                        blogFeeds.data.map(
                            blog => (
                                <div 
                                    className="blog-feed-navigation"
                                    key={`${blog.slug}-${blog.ID}`}
                                    onClick={() => navigateTo(`/post/${blog.ID}/${blog.slug}`)}
                                >
                                    <BlogPost post={blog}/>
                                    <div className="click-continue">Continue Reading → </div>
                                </div>
                            )
                        )
                    }
                    {
                        (totalPosts > page * NO_OF_FEEDS) && 
                        (
                            <div className="view-more-btn-container">
                                {
                                    (blogFeeds.data.length === (page - 1) * NO_OF_FEEDS) ?
                                    (<button> Loading... </button>) : 
                                    (<button onClick={()=>setPage(page + 1)}> Older Posts </button>)
                                }
                            </div>
                        )
                    }
                </>):
                (<h2>Error Loading Data!!</h2>)
            }
        </div>
    )
}

export default Home