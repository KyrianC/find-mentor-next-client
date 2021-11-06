import { Flex, Spacer } from "@chakra-ui/react";
import React from "react";
import NavButton from "./NavButton";
import NavItems from "./NavItems";
import NavLogo from "./NavLogo";

export default function NavBar() {
    const [isOpen, setOpen] = React.useState(false)

    const toggle = () => setOpen(!isOpen);

    return (
        <Flex position="sticky" top="0" alignItems="center" p="2" wrap="wrap">
            <NavLogo />
            <Spacer />
            <NavButton toggle={toggle} isOpen={isOpen} />
            <NavItems isOpen={isOpen} />
        </Flex>
    )
}
