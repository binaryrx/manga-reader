/* eslint-disable arrow-body-style */
import React from "react";
import styled from "styled-components";
// import { mqSm, mqMd, mqLg } from "../styleVars";

import searchImg from "../../../assets/images/search.svg";

const NavigationOpenSearchBtn = styled.button`
    border: none;
    outline: none;
    background: transparent;
    padding: 0.4rem 0.7rem;
`;

const NavigationOpenSearchBtnImg = styled.img`
    width: 1.25rem;
    margin-top: 0.2rem;
    filter: brightness(0) invert(0.85);
    transition: all 0.1s ease;
    &:hover {
        filter: brightness(0) invert(1);
    }
`;

const SearchButton = (props) => {
    return (
        <NavigationOpenSearchBtn onClick={() => props.setSearchOpen(true)}>
            <NavigationOpenSearchBtnImg src={searchImg} />
        </NavigationOpenSearchBtn>
    );
};

export default SearchButton;
