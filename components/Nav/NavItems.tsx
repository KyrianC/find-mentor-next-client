import { Stack } from "@chakra-ui/react"
import NavLink from "./NavLink"
import type { category } from '../../pages/api/categories'
import React, { useEffect } from "react"
import ExploreMenu from "./ExploreMenu"
import NavLinkButton from "./NavLinkButton"

type props = {
    isOpen: boolean
}


const NavItems = ({ isOpen }: props): JSX.Element => {

    const [nav, setNav] = React.useState<category[] | null>(null)


    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then((data: category[]) => setNav(data))
    }, [])


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
            <NavLink name="About" href="/about" />
            <NavLink name="Contact" href="/contact" />
            <NavLinkButton name="Explore"><ExploreMenu categories={nav} /></NavLinkButton>
            <NavLink name="Join" href="/join" />
        </Stack>
    )
}

export default NavItems
