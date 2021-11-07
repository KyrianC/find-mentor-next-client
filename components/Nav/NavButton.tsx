import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"
import React from "react"

type props = {
    isOpen: boolean;
    onToggle: React.MouseEventHandler
}

const MenuButton = ({ isOpen, onToggle }: props): JSX.Element => {
    return (
        <IconButton
            zIndex={10}
            display={[null, null, 'none']}
            onClick={onToggle} aria-label="toggle menu"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        ></IconButton>
    )
}

export default MenuButton
