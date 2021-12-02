import React, { useEffect, useRef } from "react";
import closeImg from "#/assets/images/close.svg";
import { SearchForm } from "./styled";

const Search = (props) => {

    const searchRef = useRef(null);

    useEffect(() => {
        searchRef.current.focus();
    });

    return (
        <SearchForm className={`${props.searchOpen ? "active" : ""}` }>
             <form action="/search" method="GET" >
                <input type="text" name="search" placeholder="Type..." ref={searchRef}/>
            </form>
            <div className="SearchForm-close" onClick={() => props.setSearchOpen(false)}>
                <img src={closeImg.src} alt="close search" className="SearchForm-close" />
            </div>
        </SearchForm>
    );
};

export default Search;
