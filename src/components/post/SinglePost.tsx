import React, { useEffect } from 'react'
import BlogPost from '../common/BlogPost'
import { useLocation } from 'react-router'
import { useGetBlogPost } from '../../utils/apis'

const SinglePost = () => {
    useEffect(() => window.scrollTo(0, 0), [])
    const { pathname: locationPath } = useLocation()
    const [postId, postSlug] = locationPath.split('/').slice(2)
    const { data: post, isLoading } = useGetBlogPost(+postId, postSlug)
    return (
        <div className="feeds-container">
        {
            isLoading ? 
            (<h2>Loading...</h2>) :
            post ? 
            (<BlogPost post={ post } showCompletePost={true} />) : 
            (<h2>Error Loading Data!!</h2>)

        }
        </div>
    )
}
export default SinglePost