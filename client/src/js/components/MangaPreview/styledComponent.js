import styled from "styled-components";
import { mqSm, mqMd, mqLg } from "../styleVars";

export const MangaPreviewStyled = styled.div`
    display: flex;
    flex-flow: row;
    margin-bottom: 1.5rem;

    @media ${mqLg} {
        width: 33%;
    }
    @media ${mqMd} {
        width: 50%;
    }
    @media ${mqSm} {
        width: 100%;
    }

    &-updatedAt {
    }
`;

export const MangaPreviewImage = styled.div`
    img {
        width: 100px;
        height: 110px;
    }
`;

export const MangaPreviewContent = styled.div`
    display: flex;
    flex-flow: column;
    @media ${mqMd}, ${mqLg} {
        padding: 0 1.5rem 0 0.75rem;
    }
    @media ${mqSm} {
        padding: 0 0.5rem 0 0.75rem;
        width: 100%;
    }
`;

export const MangaPreviewChapterNum = styled.div`
    a {
        text-decoration: none;
        color: inherit;
    }
`;

export const MangaPreviewSummary = styled.p`
    font-size: 1rem;
`;

export const MangaPreviewTitle = styled.div`
    font-weight: 600;
    margin-bottom: 0.25rem;
    font-size: 1.1rem;
    a {
        text-decoration: none;
        color: inherit;
    }
`;

export const MangaPreviewFooter = styled.div`
    margin: auto 0 0.5rem;
    display: flex;
    justify-content: space-between;
`;
