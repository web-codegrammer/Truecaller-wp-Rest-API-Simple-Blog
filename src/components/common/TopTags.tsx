import React from 'react'
import { useGetTopTags } from '../../utils/apis'
import { navigateTo } from '../../utils/router'

const TopTags = () => {
    const {isLoading, data: topTags} = useGetTopTags()

    if(isLoading) {
        return <p>Loading....</p>
    }
    return !topTags ? 
        (
            <p>Loading Top Tags Failed </p>
        ) :
        (
            <>
                {
                    topTags.map(
                        ({slug, name}) => (
                            <p key={slug} onClick={() => navigateTo(`/tag/${slug}`)}>
                                {`${name}`}
                            </p>
                        )
                    )
                }
            </>
        )
}

export default React.memo(TopTags)
