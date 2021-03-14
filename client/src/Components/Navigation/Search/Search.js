import React, { useEffect, useRef } from "react";
import closeImg from "../../../assets/images/close.svg";

import {
    SearchFormContainer,
    SearchForm,
    SearchInput,
    SearchFormClose,
    SearchFormCloseImg
} from "./styled";

const Search = (props) => {

    const searchRef = useRef(null);

    useEffect(() => {
        searchRef.current.focus();
    });

    return (
        <SearchFormContainer className={props.searchOpen ? "active" : ""}>
            <SearchForm action="/search" method="GET" >
                <SearchInput type="text" name="search" placeholder="Type..." ref={searchRef} />
                {/* <input type="text" name="search" placeholder="Search..." className="-search-input" /> */}
            </SearchForm>
            <SearchFormClose onClick={() => props.setSearchOpen(false)}>
                <SearchFormCloseImg src={closeImg} />
            </SearchFormClose>
        </SearchFormContainer>
    );
};

export default Search;
