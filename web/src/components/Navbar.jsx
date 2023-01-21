import { Navbar } from 'flowbite-react'
import React from 'react'
import { useLocation } from 'react-router-dom';
import Logo from "../assets/logo.svg";

function NavigationMenu() {
    const withouSidebarRoutes = ["/login", "/register"];

    const { pathname } = useLocation();
    if (withouSidebarRoutes.some((item) => pathname.includes(item)))
        return null;

    return (
        <Navbar className="border-b border-gray-200">
            <Navbar.Brand>
                <img className="mr-3 h-6 sm:h-9" src={Logo} />
                <span className="self-center whitespace-nowrap text-xl font-semibold">
                    Issue Bear
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href="#">
                    Dashboard
                </Navbar.Link>
                <Navbar.Link href="#">
                    About
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationMenu