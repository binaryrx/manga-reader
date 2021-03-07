/* eslint-disable arrow-body-style */
import React from "react";

import randomImg from "../../../assets/images/random.svg";
import searchImg from "../../../assets/images/search.svg";

const Search = () => {
    return (
        <form action="/search" method="GET" className="navigation-search">
            <input type="text" name="search" placeholder="Search..." className="navigation-search-input" />

            <a href="/random" className="navigation-search-random">
                <img src={randomImg} alt="" className="navigation-search-random-img" />
            </a>

            <button type="submit" className="navigation-search-submit">
                <img src={searchImg} alt="" className="navigation-search-submit-img" />
            </button>
        </form>
    );
};

export default Search;
