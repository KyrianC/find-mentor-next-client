import { Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import React from "react";
import NavButton from "./NavButton";
import NavItems from "./NavItems";
import NavLogo from "./NavLogo";

export default function NavBar() {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Flex zIndex="10" bg="gray.800" position="sticky" top="0" alignItems="center" p="2" wrap="wrap">
            <NavLogo />
            <Spacer />
            <NavButton onToggle={onToggle} isOpen={isOpen} />
            <NavItems isOpen={isOpen} />
        </Flex>
    )
}
