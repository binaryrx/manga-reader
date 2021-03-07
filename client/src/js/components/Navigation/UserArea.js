/* eslint-disable arrow-body-style */
import React from "react";
import historyImg from "../../../assets/images/history.svg";
import favoriteImg from "../../../assets/images/favorite.svg";
import profileImg from "../../../assets/images/profile.svg";
import settingsImg from "../../../assets/images/settings.svg";

const userArea = () => {
    return (
        <div className="navigation-user">
            <div className="navigation-user-history">
                <a href="/history">
                    <img src={historyImg} alt="" />
                </a>
            </div>

            <div className="navigation-user-favorite">
                <a href="/favorite">
                    <img src={favoriteImg} alt="" />
                </a>
            </div>

            <div className="navigation-user-settings">
                <a href="/settings">
                    <img src={settingsImg} alt="" />
                </a>
            </div>

            <div className="navigation-user-profile">
                <a href="/profile">
                    <img src={profileImg} alt="" />
                </a>
            </div>
        </div>
    );
};

export default userArea;
