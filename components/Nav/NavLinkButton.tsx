import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Collapse, useBreakpoint, useDisclosure, useOutsideClick } from '@chakra-ui/react'
import React from 'react'

type props = {
    children: React.ReactNode
    name: string
}

const NavLinkButton = ({ children, name }: props): JSX.Element => {
    const { isOpen, onToggle, onClose, onOpen } = useDisclosure()

    const ref = React.useRef<HTMLDivElement>(null!)
    useOutsideClick({
        ref: ref,
        handler: onClose
    })


    // don't listen to hover on mobile viewport
    const breakpoint = useBreakpoint()
    const handleMouseEnter = () => breakpoint == 'base' ? undefined : onOpen()
    const handleMouseLeave = () => breakpoint == 'base' ? undefined : onClose()


    return (
        <Box
            display="inline-block"
            ref={ref}
            pos="relative"
            cursor="pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onToggle}
        >
            {name}
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            <Collapse in={isOpen} animateOpacity>
                {children}
            </Collapse>
        </Box>
    )
}

export default NavLinkButton
