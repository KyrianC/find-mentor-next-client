import { Collapse, Stack, useBreakpointValue } from "@chakra-ui/react"
import React, { useEffect } from "react"
import type { category } from '../../pages/api/categories'
import ExploreMenu from "./ExploreMenu"
import NavLink from "./NavLink"
import NavLinkButton from "./NavLinkButton"

type props = {
    isOpen: boolean
}


const NavItems = ({ isOpen }: props): JSX.Element => {

    const [nav, setNav] = React.useState<category[] | null>(null)

    const variant = useBreakpointValue({ base: '100%', md: 'auto' })

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then((data: category[]) => setNav(data))
    }, [])


    return (
        <Collapse
            style={{ width: variant }}
            in={variant != '100%' ? true : isOpen}
            unmountOnExit
        >
            <Stack
                bg={['gray.900', null, 'gray.800']}
                borderRadius="md"
                mt={["2", null, "0"]}
                padding="2"
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
        </Collapse>
    )
}

export default NavItems
