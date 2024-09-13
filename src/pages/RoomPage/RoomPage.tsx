import SearchForm from '@/components/Rooms/SearchForm/SearchForm'
import { SearchCriteria } from '@/constants/TypesConstant'
import Posts from '@/data/data.json'
import { getAreaRange, getPriceRange } from '@/helpers/DataTransformHelper'
import { useState } from 'react'
import './styles.scss'
import { Box } from '@mui/material'

interface Post {
    title: string
    thumbnail: string
    price: number
    area: number
    city: string
    district: string
    content: string
}

const RoomPage = () => {
    const [filteredPosts, setFilteredPosts] = useState<Post[]>(Posts)

    const handleSearch = (criteria: SearchCriteria) => {
        console.log(criteria)
        const { min: minPrice, max: maxPrice } = getPriceRange(
            criteria.priceRange
        )
        const { min: minArea, max: maxArea } = getAreaRange(criteria.areaRange)

        const filtered = Posts.filter((post) => {
            const matchesCity =
                !criteria.province || post.city === criteria.province.code
            const matchesDistrict =
                !criteria.district || post.district === criteria.district.code
            const matchesPrice =
                !criteria.priceRange ||
                (post.price >= minPrice && post.price <= maxPrice)
            const matchesArea =
                !criteria.areaRange ||
                (post.area >= minArea && post.area <= maxArea)

            return matchesCity && matchesDistrict && matchesPrice && matchesArea
        })

        setFilteredPosts(filtered)
    }
    return (
        <>
            <SearchForm onSubmit={handleSearch} />
            <Box className="post-list">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                        <Box key={index} className="post-list__item">
                            <Box className="post-list__item-img">
                                <img src={post.thumbnail} alt={post.title} />
                            </Box>
                            <Box className="post-list__item-info">
                                <h3>{post.title}</h3>
                                <p>Price: {post.price.toLocaleString()} VND</p>
                                <p>Area: {post.area} m²</p>
                                <p>{post.content}</p>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <p>No posts match the selected criteria.</p>
                )}
            </Box>
        </>
    )
}

export default RoomPage
