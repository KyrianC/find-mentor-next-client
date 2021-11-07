import { Link, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import React from "react"

type props = {
    name: string
    href: string;
}

const NavLink = ({ name, href }: props): JSX.Element => {


    return (
        <NextLink href={href}>
            <Link px="2">
                <Text>{name}</Text>
            </Link>
        </NextLink>
    )
}

export default NavLink
