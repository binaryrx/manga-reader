/* eslint-disable arrow-body-style */
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import historyImg from "../../../assets/images/history.svg";
// import favoriteImg from "../../../assets/images/favorite.svg";
// import settingsImg from "../../../assets/images/settings.svg";
import profileImg from "../../../assets/images/profile.svg";
import OpenSearchButton from "../OpenSearchButton";
import Search from "../Search";
import NightModeButton from "../NightModeButton";

import { UserAreaStyled, UserAreaProfile } from "./styled";

const UserArea = () => {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <UserAreaStyled>
            <NightModeButton />
            <UserAreaProfile>
                <Link to="/profile">
                    <img src={profileImg} alt="" />
                </Link>
            </UserAreaProfile>
            <OpenSearchButton setSearchOpen={setSearchOpen} />
            <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
        </UserAreaStyled>
    );
};

export default UserArea;
