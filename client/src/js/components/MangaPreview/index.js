/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from "react";

const MangaPreview = (props) => {
    const { mangaUrl, imgUrl, mangaName, mangaDescription, chapterUrl, mangaChapterNum, mangaUpdatedAt } = props;

    return (
        <div className="manga-preview">
            <div className="manga-preview-image">
                <a href={mangaUrl}>
                    <img src={imgUrl} alt="" />
                </a>
            </div>
            <div className="manga-preview-text">
                <div className="manga-preview-title">
                    <a href={mangaUrl}>{mangaName}</a>
                </div>
                <div className="manga-preview-summary">{mangaDescription}</div>
                <div className="manga-preview-footer">
                    <div className="manga-preview-chapterNum">
                        <a href={chapterUrl}>Ch.{mangaChapterNum}</a>
                    </div>
                    <div className="manga-preview-updatedAt">{mangaUpdatedAt}</div>
                </div>
            </div>
        </div>
    );
};

export default MangaPreview;
