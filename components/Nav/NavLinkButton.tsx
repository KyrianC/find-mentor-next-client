import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Link, Box, Text } from '@chakra-ui/react'
import React, { MouseEventHandler } from 'react'

type props = {
    children: React.ReactNode
    name: string
}

const NavLinkButton = ({ children, name }: props): JSX.Element => {
    const [showChildren, setShowChildren] = React.useState(false)

    const toggle = () => {
        setShowChildren(!showChildren)
    }

    return (
        <Box display="inline-block" pos="relative">
            <Text cursor="pointer" onClick={toggle}>
                {name}
                {showChildren ? <ChevronDownIcon /> : <ChevronUpIcon />}
            </Text>
            {showChildren && children}
        </Box>
    )
}

export default NavLinkButton
