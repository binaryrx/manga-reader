/* eslint-disable arrow-body-style */
import React from "react";
import Navigation from "../../Navigation";
import LatestMangas from "../../LatestMangas";

import { HomeTitle } from "./styled";

const Home = () => {
    return (
        <>
            <Navigation />
            <main>
                <HomeTitle>Home</HomeTitle>
                <LatestMangas />
            </main>
        </>
    );
};

export default Home;
