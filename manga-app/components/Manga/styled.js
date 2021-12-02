import styled from "styled-components";
import Link from "#/components/NoScrollLink";
import { mqSm, mqMd, mqLg } from "#/theme/styleVars";

export const MangaMain = styled.div`

`;

const Section = styled.section`
    background: var(--manga-bg);
    box-shadow: var(--manga-box-shadow);
    border-radius: 4px;
    padding: 0.98rem;
`;

export const SectionManga = styled(Section)`
    display: grid;
    grid-gap: 0.98rem;
    margin: 1.25rem 0;

    @media ${mqMd, mqLg} {
        grid-template-columns: min-content 1fr;
    }
    @media ${mqSm} {
        grid-template-columns: 1fr;
    }

`;



export const MangaImg = styled.img`
    min-width: 16.1rem;
    max-height: 350px;
    width: 100%;
`;

export const Strong = styled.strong`
    font-weight: 600;
    display: inline-block;
    min-width: 3.5rem;
`;

export const MangaDetails = styled.div`
    display:flex;
    flex-flow: column nowrap;
    padding-left: 0.98rem;
`;

export const MangaDetail = styled.div`
    margin-bottom: 0.85rem;
    font-size: 0.95rem;
`;

export const Genres = styled.div`
    display: flex;
    flex-flow: wrap;
    margin-bottom: 0.85rem;
`;

export const GenreBase = styled.a`
    text-decoration: none;
    font-size: 0.8575rem;
    padding: 0.25rem 0.375rem;
    border-radius: 2.8125px;
    margin: 0.35rem 0.35rem 0 0;
    font-weight: var(--mangaPreview-genre-font-weight);
    color: var(--mangaPreview-genre-text);
    border: 1px solid var(--mangaPreview-genre-border-color);
    :hover{
        color: var(--mangaPreview-genre-text-hover);
        background: var(--mangaPreview-genre-bg-hover);
    }
    :active,:visited{
        color: var(--mangaPreview-genre-text);

        :hover{
            color: var(--mangaPreview-genre-text-hover);
        }
    }
`;

export const Genre = GenreBase;

export const MangaTitle = styled.h1`
    font-size: 1.9rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
`;

export const AltNames = styled.small`
    display: block;
    color: var(--manga-altNames);
    line-height: 1;
    font-size: 1.15rem;
    margin-bottom: 1rem;
    font-weight: 400;
`;

export const LatestChapter = styled.a`
    color: var(--manga-latestChapter-text);
    :hover{
        color: var(--manga-latestChapter-text-hover);
    }
`;



export const SectionChapters = styled(Section)`

`;

export const Tabs = styled.ul`

    margin-bottom: 1rem;
`;



export const Tab = styled.li`
  
    display:inline-block;
    & + li {
        margin-left: 2px;
    }

`;


export const TabButton = styled.button`
    padding: 0.775rem 0.925rem;
    font-size: 0.975rem;
    color: inherit;
    cursor: pointer;
    color: var(--manga-tab-text);
    background-color: var(--manga-tab-bg);

    :hover{
        background-color: var(--manga-tab-bg-hover);;
        color: var(--manga-tab-text-hover);;
    }
    &.active{
        background-color: var(--manga-tab-text-active);;
        color:  var(--manga-tab-bg-active);
    }

`;


export const Chapter = styled.li`
    @media ${mqLg} {
        border-right: 1px solid var(--manga-chapterLink-border-color);;
        border-bottom: 1px solid var(--manga-chapterLink-border-color);
        &:first-child, &:nth-child(2), &:nth-child(3), &:nth-child(4) {
            border-top: 1px solid var(--manga-chapterLink-border-color);
        }
        &:nth-child(4n+1) {
            border-left: 1px solid var(--manga-chapterLink-border-color);
        }
    }
    @media ${mqMd}, ${mqSm} {
        border: 1px solid var(--manga-chapterLink-border-color);
        border-radius: 4px;
    }
    
`;

export const TabContent = styled.ul`

    display:none;
    padding-bottom: 1rem;


    @media ${mqLg} {
        grid-template-columns: repeat(4,minmax(min-content, 1fr));
    }

    @media ${mqMd}, ${mqSm} {
        grid-template-columns: repeat(auto-fit, minmax(3.75rem, 1fr));
        grid-gap: 1rem;
    }

    &.active{
        display:grid;
    }
`;


export const ChapterLink = styled.a`

    border-radius: 4px;
    
    font-size: 0.95rem;
    line-height: 1.35rem;
    text-decoration: none;

    @media ${mqLg} {
        display:grid;
        grid-template-columns: min-content 1fr;
        grid-template-rows: auto;
        padding: 0.7rem 0.8rem;
    }
    @media ${mqMd}, ${mqSm} {
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 0.3rem;
    }

    &:hover{
        background: var(--manga-chapterLink-bg-hover);
    }
  



`;
export const ChapterNum = styled.span`
    display:inline-block;

    @media ${mqLg} {
        margin-right: 0.15rem;
        color: var(--manga-chapterName-text);
    }

    @media ${mqMd},${mqSm} {
        color: var(--manga-chapterName-text);
    }

`;

export const ChapterName = styled.span`
    color: var(--manga-chapterName-text);

    @media ${mqLg} {
        display:inline-block;
    }
    @media ${mqMd}, ${mqSm} {
        display:none;
    }
`;

export const ChapterUpdatedAt = styled.small`
    grid-row: 2/3;
    grid-column: 2 span;
    color: var(--manga-chapterUpdatedAt-text);
    font-size: 0.85rem;

    @media ${mqLg} {
        display:inline-block;
    }
    @media ${mqMd}, ${mqSm} {
        display:none;
    }
`;

export const SummaryTab = styled(Tab)`

`;
export const Description = styled.p`
    grid-column: span 4;
`;



