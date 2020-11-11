import React  from 'react'
import { useGetCategories } from '../../utils/apis'
import { navigateTo } from '../../utils/router'

const Categories = () => {
    const {isLoading, data: categories} = useGetCategories()
    if(isLoading) {
        return <p>Loading....</p>
    }
    return !categories ? 
        (
            <p>Loading Categories Failed </p>
        ) :
        (
            <>
                {
                    categories.map(
                        ({slug, name}) => (
                            <p key={slug} onClick={() => navigateTo(`/category/${slug}`)}>
                                {`${name}`} 
                            </p>
                        )
                    )
                }
            </>
        )
}

export default React.memo(Categories)
