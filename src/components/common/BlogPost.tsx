import React  from 'react'
import { IBlogFeed } from '../../interfaces'
import { timeInAge, stopEventBubbleAndCall } from '../../utils/common'
import { navigateTo } from '../../utils/router'

const BlogPost = ({post, showCompletePost = false}: {post: IBlogFeed, showCompletePost?: boolean}) => {
    return (
        <article className="article-content" >
            <header>
                {
                    post.featured_image && 
                    (<img src={`${post.featured_image}`} alt="Post Thumbnail" className="post-thumbnail"/>)
                }
                <div className="article-category-wrapper">
                    {
                        Object.keys(post.categories).map(
                            (category) => (
                                <div 
                                    className="article-category"
                                    key={category}
                                    onClick={
                                        (event) => stopEventBubbleAndCall(
                                            () => navigateTo(
                                                `/category/${post.categories[category]['slug']}`
                                            ),
                                            event
                                        ) 
                                    }
                                >
                                    {category}
                                </div>
                            )
                        )
                    }
                </div>
                <h2 className="post-title">
                    { post.title }
                </h2>
            </header>
            <footer className="post-meta-container">
                <div className="post-meta">
                    • &nbsp;  
                    { timeInAge(new Date(post.date)) }
                </div>
                {post.author && post.author.name && 
                (
                    <div className="post-meta">
                        • &nbsp;  
                        { post.author.name }
                    </div>
                )}
            </footer>
            <div className="content-section">
                <div dangerouslySetInnerHTML={
                    { __html: post[showCompletePost ? 'content' : 'excerpt'] }
                } />
            </div>
            <div className="article-category-wrapper">
                    {
                        Object.keys(post.tags).map(
                            (tag) => (
                                <div 
                                    className="article-tag"
                                    key={tag}
                                    onClick={
                                        (event) => stopEventBubbleAndCall(
                                            () => navigateTo(
                                                `/tag/${post.tags[tag]['slug']}`
                                            ),
                                            event
                                        ) 
                                    }
                                >
                                    {tag}
                                </div>
                            )
                        )
                    }
                </div>
        </ article >
    )
}

export default BlogPost
