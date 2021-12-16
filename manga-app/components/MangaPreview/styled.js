import styled from "styled-components";
import { mqSm, mqMd, mqLg } from "#/theme/styleVars";
import placeholderThumbImg from "#/assets/images/placeholder-thumb.png"

export const MangaPreviewStyled = styled.li`
    list-style:none;
    display: flex;
    flex-flow: row;
    padding: 0.635rem 0.765rem;
    border-bottom: 1px solid var(--manga-border-color);
    width: 100%;

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

    .mangaPreview {

        &-poster{
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
        }

        &-content{
            display: flex;
            flex-flow: column;
            width: 100%;
        }

        &-summary{
            font-size: 1rem;
        }

        &-genres{
            font-size: 1rem;
            margin-bottom: 0.5rem;
        }

        &-genre{
            text-decoration: none;
            font-size: 0.8575rem;
            padding: 0.25rem 0.375rem;
            border-radius: 2.8125px;
            margin: 0.35rem 0.35rem 0 0;
            font-weight: var(--mangaPreview-genre-font-weight);
            color: var(--mangaPreview-genre-text);
            border: 1px solid var(--mangaPreview-genre-border-color);
            font-size: 0.705rem;
            margin: 0 2px;
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
         
        }

        &-mangaName{
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
        }

        &-lastUpdated{
            color: #a0a0a0;
            font-size: 70%;
        }

        &-author{
            font-weight: 600;
            margin-bottom: 0.5rem;
            font-size: 0.65rem;
            color:  var(--mangaPreview-genre-author-text);
        }


        &-chapterNum{
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
        }



        &-status{
            color: inherit;
        }
    }
  
`;