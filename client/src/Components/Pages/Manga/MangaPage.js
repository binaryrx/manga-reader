/* eslint-disable arrow-body-style */
import React from "react";
import Navigation from "../../Navigation";

const MangaPage = (props) => {
    return (
        <>
            <Navigation />
            <main>
                <h1>{props.match.params.mangaName.split("-").join(" ")}</h1>
            </main>
        </>
    );
};

export default MangaPage;
