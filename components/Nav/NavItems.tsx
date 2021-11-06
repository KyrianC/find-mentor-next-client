import { Stack } from "@chakra-ui/react"
import NavLink from "./NavLink"

type props = {
    isOpen: boolean
}

const NavItems = ({ isOpen }: props): JSX.Element => {

    return (
        <Stack
            bg={['gray.900', null, 'gray.800']}
            borderRadius="md"
            mt={["2", null, "0"]}
            padding="2"
            display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}
            width={['100%', '100%', 'auto']}
            direction={['column', 'row']}
            justifyContent={['center', 'space-around']}
            textAlign="center"
        >
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <NavLink href="/explore">Explore</NavLink>
            <NavLink href="/join">Join</NavLink>
        </Stack>
    )
}

export default NavItems
