/* eslint-disable arrow-body-style */
import React from "react";

import logoImg from "../../../assets/images/logo.png";

const Logo = () => {
    return (
        <a href="/" className="navigation-logo">
            <img src={logoImg} alt="manga reader" />
        </a>
    );
};

export default Logo;
