/* eslint-disable arrow-body-style */
import React from "react";
import MangaPreview from "../MangaPreview";

const LatestMangas = () => {
    const tempImg =
        "https://xcdn-000.animemark.com/acg_covers/W300/50/78/50783028d4b3b0ec937cc51df0b95b90dc916ead_51960_350_490.jpg";
    const tempDesc = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id facere";
    const tempName = "Mayday Mayday Mayday!";
    return (
        <div className="latest-updates">
            <h2>Latest Releases</h2>

            <div className="latest-updates-content">
                {Array.from({ length: 50 }, (_, i) => {
                    return (
                        <MangaPreview
                            mangaUrl={"#" + tempName.split(" ").join("")}
                            imgUrl={tempImg}
                            mangaName={tempName}
                            mangaDescription={tempDesc}
                            mangaChapterNum={i}
                            chapterUrl={"#" + i}
                            mangaUpdatedAt="1 Hour Ago"
                            key={i}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default LatestMangas;
