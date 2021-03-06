/* eslint-disable arrow-body-style */
import React from "react";
import Logo from "./Logo/";
import Nav from "./Nav/";
import UserArea from "./UserArea/";
import { NavigationStyled, NavigationContainer } from "./styled";

const Navigation = () => {
    return (
        <NavigationContainer>
            <NavigationStyled>
                <Logo />
                <Nav />
                <UserArea />
            </NavigationStyled>
        </NavigationContainer>
    );
};

export default Navigation;
