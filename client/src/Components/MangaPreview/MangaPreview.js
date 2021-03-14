/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from "react";
import { Link } from "react-router-dom";
import {
    MangaPreviewStyled,
    MangaPreviewImage,
    MangaPreviewContent,
    MangaPreviewTitle,
    MangaPreviewSummary,
    MangaPreviewFooter,
    MangaPreviewChapterNum,
} from "./styled";

const MangaPreview = (props) => {
    const { mangaUrl, imgUrl, mangaName, mangaDescription, chapterUrl, mangaChapterNum, mangaUpdatedAt } = props;

    return (
        <MangaPreviewStyled>
            <MangaPreviewImage>
                <Link to={mangaUrl}>
                    <img src={imgUrl} alt="" />
                </Link>
            </MangaPreviewImage>
            <MangaPreviewContent>
                <MangaPreviewTitle>
                    <Link to={mangaUrl}>{mangaName}</Link>
                </MangaPreviewTitle>
                <MangaPreviewSummary>{mangaDescription}</MangaPreviewSummary>
                <MangaPreviewFooter>
                    <MangaPreviewChapterNum>
                        <Link to={chapterUrl}>Ch.{mangaChapterNum}</Link>
                    </MangaPreviewChapterNum>
                    <div className="manga-preview-updatedAt">{mangaUpdatedAt}</div>
                </MangaPreviewFooter>
            </MangaPreviewContent>
        </MangaPreviewStyled>
    );
};

export default MangaPreview;
