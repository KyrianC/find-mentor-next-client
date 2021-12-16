import { Box, Divider, Spinner, Text } from "@chakra-ui/react"
import React from "react"
import type { rating } from './Rating'
import Rating from "./Rating"

type props = {
    classSlug: string
}

const RatingList = ({ classSlug }: props): JSX.Element => {

    const [ratings, setRatings] = React.useState<rating[] | null>(null)

    const fetchRatings = async () => {
        const res = await fetch(process.env.BASE_API_URL + `classes/rate/${classSlug}/`)
        const data: rating[] = await res.json()
        setRatings(data)
    }

    React.useEffect(() => {
        fetchRatings()
    }, [])

    if (ratings && ratings.length) {
        return (
            <Box>
                {ratings.map((r, i) => (
                    <Box key={r.id}>
                        <Rating rating={r} />
                        {i !== ratings.length - 1 && (
                            <Divider />
                        )}
                    </Box>
                ))}
            </Box>
        )
    } else if (ratings && ratings.length == 0) {
        return <Text fontSize='sm' fontStyle='italic'>No ratings yet</Text>
    } else {
        return <Spinner color='teal' />
    }
}


export default RatingList
