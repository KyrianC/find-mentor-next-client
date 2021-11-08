import { TriangleUpIcon } from "@chakra-ui/icons"
import { Box, VStack } from "@chakra-ui/react"
import type { category } from "../../pages/api/categories"
import NavLink from "./NavLink"

type props = {
    categories: category[] | null
}

const ExploreMenu = ({ categories }: props): JSX.Element => {
    return (
        <>
            <TriangleUpIcon
                pos="absolute"
                right="50%"
                transform="translateX(50%)"
                display={['none', 'initial']}
                color="gray.700"
            />
            <VStack
                bg="gray.700"
                borderRadius="lg"
                p="4"
                left={['0', '-50%', '-200%']}
                top="9" pos={['initial', 'absolute']}
                width={['auto', 'max-content']}
                textAlign={['center', 'start']}
            >
                {categories ? (
                    categories.map(item => (
                        <NavLink
                            key={item.slug}
                            href={'/explore' + item.slug}
                        >{item.displayName}</NavLink>
                    ))
                ) : (
                    "loading..."
                )}
            </VStack>
        </>
    )
}

export default ExploreMenu
