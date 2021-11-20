import { Collapse, Stack, useBreakpointValue } from "@chakra-ui/react"
import React, { useEffect } from "react"
import ExploreMenu from "./ExploreMenu"
import NavLink from "./NavLink"
import NavLinkButton from "./NavLinkButton"

type props = {
    isOpen: boolean
}

export type category = {
    title: string,
    slug: string,
    sub_categories: category[]
}

const NavItems = ({ isOpen }: props): JSX.Element => {

    const [nav, setNav] = React.useState<category[] | null>(null)

    const variant = useBreakpointValue({ base: '100%', md: 'auto' })

    useEffect(() => {
        const fetchNav = async () => {
            const res = await fetch('http://localhost:8000/api/categories/nav/')
            const data: category[] = await res.json()
            setNav(data)
        }
        fetchNav()
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
                <NavLink href="/about">About</NavLink>
                <NavLink href="/contact">Contact</NavLink>
                <NavLinkButton toShow={<ExploreMenu categories={nav} />}>Explore</NavLinkButton>
                <NavLink href="/join">Join</NavLink>
            </Stack>
        </Collapse >
    )
}

export default NavItems
