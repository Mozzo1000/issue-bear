import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.svg";
import AuthService from '../services/auth.service';
import FeedbackButton from './FeedbackButton';

function NavigationMenu() {
    const currentUser = AuthService.getCurrentUser()
    const withouSidebarRoutes = ["/login", "/register"];
    const navigate = useNavigate()

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
            <div className="flex items-center gap-x-10 md:order-2" >
                <FeedbackButton/>
                <Dropdown arrowIcon={false} inline={true} label={<Avatar alt="User settings" rounded={true} />}>
                    <Dropdown.Header>
                        <span className="block text-sm">
                            {currentUser && currentUser["name"]}
                        </span>
                        <span className="block truncate text-sm font-medium">
                            {currentUser && currentUser["email"]}
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className="text-red-600" onClick={() => (AuthService.logout(), navigate(0))}>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
            </div>

            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link active={location.pathname == "/"}>
                    <Link to="/">Dashboard</Link>
                </Navbar.Link>
                <Navbar.Link active={location.pathname == "/about"}>
                    <Link to="/about">About</Link>
                </Navbar.Link>
                <Navbar.Link active={location.pathname == "/docs"}>
                    <Link to="/docs">Docs</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationMenu