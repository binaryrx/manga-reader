/* eslint-disable arrow-body-style */
import React from "react";

import logoImg from "../../../assets/images/logo.png";
import { NavigationLogo } from "./styledComponent";

const Logo = () => {
    return (
        <NavigationLogo href="/">
            <img src={logoImg} alt="manga reader" />
        </NavigationLogo>
    );
};

export default Logo;
