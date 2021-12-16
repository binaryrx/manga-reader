
import React, { useState, useEffect } from "react";

import MangaPreview from "#/components/MangaPreview";
import { LatestUpdates, LatestUpdatesContent } from "./styled";

const LatestMangas = ({ mangas, page} = props) => {

    return (
        <LatestUpdates>
            <LatestUpdatesContent>
                {mangas.map( ( manga, i) => ( <MangaPreview page={page} manga={manga} index={i} key={i} />) )}
            </LatestUpdatesContent>
        </LatestUpdates>
    );
};

export default LatestMangas;