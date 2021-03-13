/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from "react";
import { NavigationNav, NavigationNavContainer, NavigationNavItem } from "./styledComponent";

const NavItem = (props) => {
    const { url, active, navName } = props;

    return (
        <NavigationNavItem className={active ? "active" : ""}>
            <a href={url}>{navName}</a>
        </NavigationNavItem>
    );
};

const Nav = () => {
    return (
        <NavigationNav role="navigation">
            <NavigationNavContainer>
                <NavItem url="/latest" navName="Latest" />
                <NavItem url="/popular" navName="popular" />
            </NavigationNavContainer>
        </NavigationNav>
    );
};

export default Nav;
