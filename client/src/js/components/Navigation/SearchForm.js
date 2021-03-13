/* eslint-disable arrow-body-style */
import React, { useState, useEffect, useRef } from "react";
import closeImg from "../../../assets/images/close.svg";

import {
    NavigationSearchFormContainer,
    NavigationSearchForm,
    NavigationSearchInput,
    NavigationSearchFormClose,
    NavigationSearchFormCloseImg
} from "./styledComponent";

const Search = (props) => {
    // const [hidden, sethidden] = useState(true);
    console.log(props.searchOpen);

    const searchRef = useRef(null);

    useEffect(() => {
        searchRef.current.focus();
    });

    return (
        <NavigationSearchFormContainer className={props.searchOpen ? "active" : ""}>
            <NavigationSearchForm action="/search" method="GET" >
                <NavigationSearchInput type="text" name="search" placeholder="Type..." ref={searchRef} />
                {/* <input type="text" name="search" placeholder="Search..." className="navigation-search-input" /> */}
            </NavigationSearchForm>
            <NavigationSearchFormClose onClick={() => props.setSearchOpen(false)}>
                <NavigationSearchFormCloseImg src={closeImg} />
            </NavigationSearchFormClose>
        </NavigationSearchFormContainer>
    );
};

export default Search;
