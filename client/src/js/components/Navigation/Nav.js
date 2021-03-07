/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from "react";

const NavItem = (props) => {
    const { url, active, navName } = props;

    return (
        <li className={active ? "active navigation-nav-item" : "navigation-nav-item"}>
            <a href={url}>{navName}</a>
        </li>
    );
};

const Nav = () => {
    return (
        <nav className="navigation-nav" role="navigation">
            <ul className="navigation-nav-container">
                <NavItem url="/" navName="Home" active />

                <NavItem url="/latest" navName="Latest" />

                <NavItem url="/browse" navName="Browse" />

                <NavItem url="/search" navName="Search" />
            </ul>
        </nav>
    );
};

export default Nav;
