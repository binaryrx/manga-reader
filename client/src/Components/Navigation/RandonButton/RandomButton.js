/* eslint-disable arrow-body-style */
import React from "react";

import randomImg from "../../../assets/images/random.svg";

const RandomButton = () => {
    return (
        <>
            <a href="/random" className="navigation-search-random">
                <img src={randomImg} alt="" className="navigation-search-random-img" />
            </a>
        </>
    );
};

export default RandomButton;
