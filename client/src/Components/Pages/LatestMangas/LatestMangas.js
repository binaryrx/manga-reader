/* eslint-disable arrow-body-style */
import React from "react";
import Navigation from "../../Navigation";
import LatestMangasC from "../../LatestMangas";

import { LatestMangasTitle } from "./styled";

const LatestMangas = () => {
    return (
        <>
            <Navigation />
            <main>
                <LatestMangasTitle>Latest Releases</LatestMangasTitle>
                <LatestMangasC />
            </main>
        </>
    );
};

export default LatestMangas;
