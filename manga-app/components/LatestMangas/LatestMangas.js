
import React, { useState, useEffect } from "react";

import MangaPreview from "#/components/MangaPreview";
import { LatestUpdates, LatestUpdatesContent } from "./styled";

const LatestMangas = ({ mangas } = props) => {

    return (
        <LatestUpdates>
            <LatestUpdatesContent>
                {mangas.map( ( manga, i) => ( <MangaPreview manga={manga} index={i} key={i} />) )}
            </LatestUpdatesContent>
        </LatestUpdates>
    );
};

export default LatestMangas;