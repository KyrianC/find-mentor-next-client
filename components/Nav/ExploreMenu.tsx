import { Box, Link } from "@chakra-ui/react"
import { TriangleUpIcon } from "@chakra-ui/icons"
import type { category } from "../../pages/api/categories"

type props = {
    categories: category[] | null
}

const ExploreMenu = ({ categories }: props): JSX.Element => {
    return (
        <>
            <TriangleUpIcon pos="absolute" right="50%" display={['none', 'initial']} color="gray.700" />
            <Box
                bg="gray.700"
                borderRadius="lg"
                p="2"
                left={['0', '-50%', '-200%']}
                top="9" pos={['initial', 'absolute']}
                width={['auto', 'max-content']}
                textAlign={['center', 'start']}
            >
                {categories ? (
                    categories.map(item => (
                        <Link key={item.slug} m="4" display="block">{item.displayName}</Link>
                    ))
                ) : (
                    "loading..."
                )}
            </Box>
        </>
    )
}

export default ExploreMenu
