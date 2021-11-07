import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Collapse, useBreakpoint, useDisclosure, useOutsideClick } from '@chakra-ui/react'
import React from 'react'

type props = {
    children: React.ReactNode
    name: string
}

const NavLinkButton = ({ children, name }: props): JSX.Element => {
    const { isOpen, onToggle, onClose } = useDisclosure()

    const ref = React.useRef<HTMLDivElement>(null!)
    useOutsideClick({
        ref: ref,
        handler: onClose
    })


    return (
        <Box display="inline-block" ref={ref} pos="relative">
            <Text cursor="pointer" onClick={onToggle}>
                {name}
                {isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
            </Text>
            <Collapse in={isOpen} animateOpacity>
                {isOpen && children}
            </Collapse>
        </Box>
    )
}

export default NavLinkButton
