import { Link, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import React from "react"

type props = {
    href: string;
    children: React.ReactNode
}

const NavLink = ({ href, children }: props): JSX.Element => {


    return (
        <NextLink href={href}>
            <Link px="2" _hover={{ color: 'teal.300' }}>
                {children}
            </Link>
        </NextLink>
    )
}

export default NavLink
