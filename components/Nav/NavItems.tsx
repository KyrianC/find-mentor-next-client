import { useToast, Collapse, Stack, useBreakpointValue, Button } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useAuth } from "../../auth/context"
import { useRouter } from 'next/router'
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
    const auth = useAuth()
    const router = useRouter()
    const toast = useToast()

    const [nav, setNav] = React.useState<category[] | null>(null)

    const variant = useBreakpointValue({ base: '100%', md: 'auto' })

    const handleLogout = async () => {
        await auth.logout()
        router.push('/')
        toast({
            title: "Logged Out",
            status: "info",
            isClosable: true,
            duration: 2500,
            position: 'top',
        })

    }

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
                alignItems={["normal", "center"]}
                textAlign="center"
            >
                <NavLink href="/about">About</NavLink>
                <NavLink href="/contact">Contact</NavLink>
                <NavLinkButton toShow={<ExploreMenu categories={nav} />}>Explore</NavLinkButton>
                {
                    auth.isAuthenticated ? (
                        <NavLink href="#"><Button onClick={handleLogout} size="sm">Logout</Button></NavLink>

                    ) : (
                        <NavLink href="/signup"><Button size="sm">Join</Button></NavLink>
                    )
                }
            </Stack>
        </Collapse >
    )
}

export default NavItems
