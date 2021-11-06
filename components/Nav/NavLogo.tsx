import { Box, Link } from "@chakra-ui/react"
import NextLink from 'next/link'


const NavLogo = (): JSX.Element => {
    return (
        <Box textTransform="uppercase" fontSize="lg" fontWeight="bold">
            <Link as={NextLink} href="/">
                FindAMentor
            </Link>
        </Box>
    )
}

export default NavLogo
