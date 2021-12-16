import { Box, Flex, Avatar, Text } from "@chakra-ui/react"
import StarRating from "./StarRating"

export type rating = {
    id: number
    author: {
        username: string
        email: string
        is_teacher: boolean
        avatar: string
    },
    value: number,
    description: string
    rated_class: number
}

type props = {
    rating: rating
}

const Rating = ({ rating }: props): JSX.Element => {
    const convertedRating = rating.value / 20
    return (
        <Box my='2' p='2'>
            <Flex py='2' alignItems='center'>
                <Text mr='2'>{convertedRating}/5</Text>
                <StarRating baseValue={rating.value} />
                <Text ml='auto' mr='2'>by {rating.author.username}</Text>
                <Avatar size='xs' src={rating.author.avatar} />
            </Flex>
            <Text>{rating.description}</Text>
        </Box>
    )
}

export default Rating
