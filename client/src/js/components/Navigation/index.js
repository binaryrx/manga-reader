/* eslint-disable arrow-body-style */
import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import Search from "./Search";
import UserArea from "./UserArea";

const Navigation = () => {
    return (
        <div className="navigation-container">
            <header className="navigation">
                <Logo />
                <Nav />
                <Search />
                <UserArea />
            </header>
        </div>
    );
};

export default Navigation;
