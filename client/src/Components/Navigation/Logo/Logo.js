/* eslint-disable arrow-body-style */
import React from "react";
import { Link } from "react-router-dom";

import logoImg from "../../../assets/images/logo.png";
import { LogoStyled } from "./styled";

const Logo = () => {
    return (
        <Link to="/">
            <LogoStyled>
                <img src={logoImg} alt="manga reader" />
            </LogoStyled>
        </Link>
    );
};

export default Logo;
