/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from "react";
import {
    MangaPreviewStyled,
    MangaPreviewImage,
    MangaPreviewContent,
    MangaPreviewTitle,
    MangaPreviewSummary,
    MangaPreviewFooter,
    MangaPreviewChapterNum,
} from "./styledComponent";

const MangaPreview = (props) => {
    const { mangaUrl, imgUrl, mangaName, mangaDescription, chapterUrl, mangaChapterNum, mangaUpdatedAt } = props;

    return (
        <MangaPreviewStyled>
            <MangaPreviewImage>
                <a href={mangaUrl}>
                    <img src={imgUrl} alt="" />
                </a>
            </MangaPreviewImage>
            <MangaPreviewContent>
                <MangaPreviewTitle>
                    <a href={mangaUrl}>{mangaName}</a>
                </MangaPreviewTitle>
                <MangaPreviewSummary>{mangaDescription}</MangaPreviewSummary>
                <MangaPreviewFooter>
                    <MangaPreviewChapterNum>
                        <a href={chapterUrl}>Ch.{mangaChapterNum}</a>
                    </MangaPreviewChapterNum>
                    <div className="manga-preview-updatedAt">{mangaUpdatedAt}</div>
                </MangaPreviewFooter>
            </MangaPreviewContent>
        </MangaPreviewStyled>
    );
};

export default MangaPreview;
