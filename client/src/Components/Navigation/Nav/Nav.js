/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from "react";
import { NavStyled, NavContainer, NavItemStyled } from "./styled";
import { Link } from "react-router-dom";

const NavItem = (props) => {
    const { url, active, navName } = props;

    return (
        <NavItemStyled className={active ? "active" : ""}>
            <Link to={url}>{navName}</Link>
        </NavItemStyled>
    );
};

const Nav = () => {
    return (
        <NavStyled role="navigation">
            <NavContainer>
                <NavItem url="/latest" navName="Latest" />
                <NavItem url="/popular" navName="popular" />
            </NavContainer>
        </NavStyled>
    );
};

export default Nav;
