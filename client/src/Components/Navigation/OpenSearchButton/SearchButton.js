/* eslint-disable arrow-body-style */
import React from "react";
import { OpenSearchBtn, OpenSearchBtnImg } from "./styled";
// import { mqSm, mqMd, mqLg } from "../styleVars";

import searchImg from "../../../assets/images/search.svg";



const SearchButton = (props) => {
    return (
        <OpenSearchBtn onClick={() => props.setSearchOpen(true)}>
            <OpenSearchBtnImg src={searchImg} />
        </OpenSearchBtn>
    );
};

export default SearchButton;
