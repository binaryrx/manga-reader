import styled from "styled-components";
import Link from "#/components/NoScrollLink";
import { mqSm, mqMd, mqLg } from "#/theme/styleVars";


const fixedNavHeight = "40px"
export const ChapterMain = styled.div`
    padding-bottom: ${fixedNavHeight};
    height: 100%;
`;

const Section = styled.section`
    background: var(--manga-bg);
    box-shadow: var(--manga-box-shadow);
    border-radius: 4px;
    padding: 0.98rem;
`;



export const SectionChapters = styled(Section)`

`;

export const Title = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 2rem;
`;

export const ChapterImg = styled.img`
    max-width: 100%;
    height: auto;
`;
export const ChapterImgs = styled.div`
  
    padding: 0.5rem;

    div{
        display:flex;
        flex-flow: column nowrap;
        align-items:center;
        justify-content:center;

    }

    @media ${mqMd}, ${mqLg} {
        /* max-width: 700px; */
        max-width: 1200px;

    }

    @media ${mqSm} {
        max-width: 100%

    }
    margin: 0 auto;
`;
export const TitleName = styled(Link)`
    text-decoration: underline;
    font-weight: 600;

    &:hover{
        color: orange;
    }
`;

export const ChapterNum = styled.span`
    width: 100%;
    text-align:center;
    line-height: 1.1;
    font-size: 1rem;
    margin: 0.25rem 0;
`;

export const ChapterNav = styled.nav`
    position: fixed;
    bottom:0;
    right:0;
    left:0;
    width: 100%;
    height: ${fixedNavHeight};
    background-color: var(--chapter-fixed-navigation-bg);
    border-width: var(--chapter-fixed-navigation-border);
    border-color: var(--chapter-fixed-navigation-border-color);
    display:flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;

    button.favorite{
        padding: 0 1rem;
        img{
            width: 1.25rem;
            height:auto;
            filter: brightness(0) invert(0.5);
        }
        &:hover{
            img{
                filter: brightness(0) invert(1);
            }
        }
    }

    .pagination{
        margin: 0 auto;
        display:flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        .prev, .next, .select-open{
            font-size: 1rem;
            color: var(--chapter-fixed-navigation-text);
            &:hover{
                color: var(--chapter-fixed-navigation-text-hover);
            }
        }

        li{
            height: 100%;
            span,img{
                pointer-events: none;
            }
        }

        .prev, .next {
            display:flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 0 1.25rem;
            border-width: var(--chapter-fixed-navigation-pagination-border-width);
            border-style: var(--chapter-fixed-navigation-pagination-border-style);
            border-color: var(--chapter-fixed-navigation-pagination-border-color);
            img{
                width: 1rem;
                height:auto;
                filter: brightness(0) invert(0.5);
                margin-top: 0.25rem;
            }
            span{
                margin: 0 0.25rem;
            }

            &:hover{
                background-color: var(--chapter-fixed-navigation-bg-hover);
                img{
                    filter: brightness(0) invert(1);
                }
            }
        }

        
        .prev{
            img{
                transform: rotate(180deg);
            }
        }
        .next{

        }
        
        .select{
            display:none;
            position: absolute;
            bottom: 100%;
            flex-flow: column nowrap;
            align-items: row;
            justify-content: flex-start;
            max-width: 300px;
            max-height: 400px;
            left: 50%;
            transform: translateX(-50%);
            overflow-y: scroll;
            background: var(--chapter-fixed-navigation-pagination-bg);
            font-size: 1rem;

            li{
                padding: 0.5rem;

                
            }

            &-open {
                height: 100%;
                @media ${mqMd}, ${mqLg} {
                    padding: 0 4rem;
                }
                @media ${mqSm} {
                    padding: 0 2rem;
                }
                img{
                    margin-left: 0.25rem; 
                    width: 0.55rem;
                    filter: brightness(0) invert(0.5);
                }

                &:hover{
                    background-color: var(--chapter-fixed-navigation-bg-hover);
                    img{
                        filter: brightness(0) invert(1);
                    }
                }
            }

           


        }

        &.open{
            .select{
                display:flex;
            }
        }
    }  

    button.scrollUp{
        padding: 0 1rem;
        img{
            filter: brightness(0) invert(0.5);
        }

        &:hover{
            img{
                filter: brightness(0) invert(1);
            }
        }
    }  
`;



