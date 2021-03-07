/* eslint-disable arrow-body-style */
import React from "react";
import Navigation from "./components/Navigation";
import LatestMangas from "./components/LatestMangas";

const App = () => {
    return (
        <main>
            <Navigation />
            <LatestMangas />
        </main>
    );
};

export default App;
