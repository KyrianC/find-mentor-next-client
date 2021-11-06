import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"

type props = {
    isOpen: boolean;
    toggle: () => void
}

const MenuButton = ({ isOpen, toggle }: props): JSX.Element => {
    return (
        <IconButton
            display={[null, null, 'none']}
            onClick={toggle} aria-label="toggle menu"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        ></IconButton>
    )
}

export default MenuButton
