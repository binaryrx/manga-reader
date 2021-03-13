/* eslint-disable arrow-body-style */
import React, { useState } from "react";
// import historyImg from "../../../assets/images/history.svg";
// import favoriteImg from "../../../assets/images/favorite.svg";
// import settingsImg from "../../../assets/images/settings.svg";
import profileImg from "../../../assets/images/profile.svg";
import SearchButton from "./SearchButton";
import Search from "./SearchForm";
import NightModeBtn from "./NightModeBtn";

import { NavigationUser, NavigationUserProfile } from "./styledComponent";

const userArea = () => {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <NavigationUser>
            <NightModeBtn />
            <NavigationUserProfile>
                <a href="/profile">
                    <img src={profileImg} alt="" />
                </a>
            </NavigationUserProfile>
            <SearchButton setSearchOpen={setSearchOpen} />
            <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
        </NavigationUser>
    );
};

export default userArea;
