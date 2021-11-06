import { Link } from "@chakra-ui/react"
import NextLink from "next/link"
import React from "react"

type props = {
    children: React.ReactNode;
    href: string;

}

const NavLink = ({ children, href }: props): JSX.Element => {
    return (
        <NextLink href={href}>
            <Link px="2">
                {children}
            </Link>
        </NextLink>
    )
}

export default NavLink
