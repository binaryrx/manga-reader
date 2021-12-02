import styled from "styled-components";
import { mqSm, mqMd, mqLg } from "#/theme/styleVars";
import { GenreBase } from "#/components/Manga/styled"
import placeholderThumbImg from "#/assets/images/placeholder-thumb.png"

export const MangaPreviewStyled = styled.li`
    list-style:none;
    display: flex;
    flex-flow: row;
    padding: 0.635rem 0.765rem;
    border-bottom: 1px solid var(--manga-border-color);

    :last-child{
        border:none;
    }

    @media ${mqLg} {
        /* width: 33%; */
    }
    @media ${mqMd} {
        /* width: 50%; */
    }
    @media ${mqSm} {
    }
        width: 100%;

    &-updatedAt {
    }
`;

export const MangaImage = styled.div`
    margin-right: 0.635rem;
    img {
        min-width: 60px;
        height: auto;
        background: url(${placeholderThumbImg.src}) center center no-repeat #a0a0a0;
        background-size: contain;
    }

    &.genre{
        img{
            min-width: 90px;
            height: 113px;
        }
    }
    
`;

export const Content = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
  
`;

export const Summary = styled.p`
    font-size: 1rem;
`;
export const Genres = styled.div`
    font-size: 1rem;
    margin-bottom: 0.5rem;
`;
export const Genre = styled(GenreBase)`
    font-size: 0.705rem;
    margin: 0 2px;
`;

export const MangaName = styled.h4`
    font-weight: 600;
    font-size: 1.1rem;
    display: flex;
    align-items: baseline;
    margin-bottom: 1.25rem;
    a {
        text-decoration: none;
        color: inherit;
        margin-right:auto;
    }
    &.genre{
        margin-bottom: 0;
    }

    &:hover{
        color: var(--mangaPreview-link-color);
    }
`;

export const LastUpdated = styled.small`
    color: #a0a0a0;
    font-size: 70%;
`;

export const Author = styled.span`
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.65rem;
    color:  var(--mangaPreview-genre-author-text);
`;

export const Footer = styled.div`
    margin: auto 0 0.5rem;
    display: flex;
    justify-content: space-between;
`;

export const ChapterNum = styled.div`
    a {
        text-decoration: none;
        color: var(--mangaPreview-link-color);

        span{
            color: var(--body-color);
        }
    }

    &:hover{
        a{
            text-decoration: underline;
            span{
                color: var(--mangaPreview-link-color);
            }
        }
        
    }

    &.genre{
        margin-bottom: auto;
    }
    
`;

export const Status = styled.span`
    color: inherit;
`;

