import { Box, Flex } from "@chakra-ui/react"
import React, { useEffect } from "react"
type props = {
    isEditable?: boolean
    baseValue: number
}


const StarRating = ({ baseValue }: props): JSX.Element => {
    const [value, _setValue] = React.useState(baseValue || 0)
    const [stars, setStars] = React.useState<Array<number> | null>(null)


    const divideValue = () => {
        let stars = [0, 0, 0, 0, 0]
        let j = 0
        for (let i = 0; i < 100; i += 20) {
            if (value >= i + 20) {
                stars[j] = 100
            } else {
                stars[j] = (value - i) * 5
                break
            }
            j++
        }
        console.log(stars)
        setStars(stars)
    }

    useEffect(() => {
        divideValue()
    }, [value])

    return (
        <Flex height='20px' width="90px">
            {stars?.map((x, i) => (
                <Box
                    clipPath='polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                    key={i}
                    flex='1'
                    border='1px solid black'
                    position='relative'
                    bgColor='gray.800'
                    boxSizing='border-box'
                >
                    <Box
                        clipPath='polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                        position='absolute'
                        top='5%'
                        left='5%'
                        width='90%'
                        height='90%'
                    >
                        <Box width={`${x}%`} height='100%' bgColor='yellow.300' />
                    </Box>
                </Box>
            ))}
        </Flex >
    )
}

export default StarRating
