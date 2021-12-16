import styled from "styled-components";
import { mqSm, mqMd, mqLg } from "#/theme/styleVars";

const navBarPaddingDesktop= "15px";
const navBarPaddingMobile= "10px";
const navTransitionSpeed = "0.2s";

export const Header = styled.header`
    box-sizing: border-box;
    background-color: var(--nav-bg);
    border: 1px solid var(--nav-border-color);
    border-left-width: 0;
    border-right-width: 0;
    position: relative;
    z-index: 10;
    min-height: var(--page-header-height);
    height: 1px;

    @media ${mqMd}, ${mqLg} {
    }


    .navbar{
        height: 100%;

        &-container{
            display:flex;
            height: 100%;
            @media ${mqMd}, ${mqLg} {
                padding-right: ${navBarPaddingDesktop};
                padding-left: ${navBarPaddingDesktop};
            }
            @media ${mqSm} {
                padding-right: ${navBarPaddingMobile};
                padding-left: ${navBarPaddingMobile};
            }
        }
        &-header{
            display:flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            position: relative;
            @media ${mqMd}, ${mqLg} {
                margin-right: auto;
            }
        }
        &-toggle{
            padding:0;
            .hamburger{
                pointer-events: none;
                &-line{
                    width: 1.8rem;
                    height: 0.1875rem;
                    background-color: #ecf0f1;
                    display: block;
                    margin: 0.35rem auto;
                    transition: all ${navTransitionSpeed} ease-in-out;
                }

                &:hover{
                    cursor: pointer;
                }

                &.open{
                    .hamburger-line:nth-child(1) {
                        transform: translateY(0.525rem) rotate(45deg);
                    }
                    .hamburger-line:nth-child(2) {
                        opacity: 0;
                    }
                    .hamburger-line:nth-child(3) {
                        transform: translateY(-0.525rem) rotate(-45deg);
                    }
                }
            }
        }  
        &-nav{
            align-items:center;

            @media ${mqMd}, ${mqLg} {
                display:flex;
            }
            @media ${mqSm} {
                position: absolute;
                top: 101%;
                left:0;
                right:0;
                width: calc(100% - calc(${navBarPaddingMobile} * 2 ));
                padding: ${navBarPaddingMobile};
                background-color: var(--nav-bg);
                opacity: 0;
                height: 0px;
                transition: height ${navTransitionSpeed} ease-in-out;
                overflow: hidden;
            }

            li{
                @media ${mqMd}, ${mqLg} {
                    height: 100%;
                    display: flex;
                    align-items: center;
                }
                
            }
         

            &.open{
                @media ${mqSm} {
                    opacity: 1;
                    height: 260px;
                }
            }

            li{
                

                & > * {
                    @media ${mqMd}, ${mqLg} {
                        margin: 0 10px;
                        display: flex;
                        line-height: 0.7;
                    }
                    
                }

                &:not(&.seperator){
                    
                    @media ${mqSm} {
                        padding: 7px 0;
                    }
                }
            }

            li.seperator{
                color: var(--nav-color);
                @media ${mqSm} {
                        border-top:1px solid hsla(0,0%,100%,.3);
                        display:block;
                        height: 1px;
                        margin: 10px 0;
                }
                span{
                    @media ${mqSm} {
                        display:none;
                    }
                }
                
            }

        }  
    }
`;


export const Profile = styled.div`
    display: flex;
    a {
        display:flex;
        img {
            @media ${mqMd}, ${mqLg} {
                width: 2.25rem;
            }
            @media ${mqSm} {
                width: 2.5rem;
            }
        }
    }
    &.mobile{
        @media ${mqMd}, ${mqLg} {
            display:none;
        }
    }
`;

export const NavItemStyled = styled.div`
    list-style: none;

    &:not(:last-child) {
        margin-right: 1rem;
    }

    &.active {
        a {
            background-color: #0f5464;
            padding: 0.4rem;
        }
    }

    a {
        color: var(--nav-color);
        opacity: 0.8;
        font-weight: 600;
        letter-spacing: 1px;
        transition: all 0.1s ease;
        position: relative;

        @media ${mqMd}, ${mqLg} {
            font-size: 1rem;
        }

        @media ${mqSm} {
            font-size: 1.1rem;
            font-weight: 400;
        }

        &:hover {
            color: var(--nav-color);
            opacity: 1;
            text-decoration: none;
        }

        .navigation-underline{
            position: absolute;
            width: 100%;
            background: #02a6f2;
            height: 3px;
            margin-top: 7px;
        }

       
    }
`;

export const Logo = styled.div`
    cursor: pointer;
    picture{
        display:inline-block;
        img {
            @media ${mqMd}, ${mqLg} {
                margin-top: 0.6rem;
                width: 12rem;
            }

            @media ${mqSm} {
                width: 2.5rem;
            }
        }

    }
    
`;

export const OpenSearch = styled.button`
    border: none;
    outline: none;
    background: transparent;
    /* padding: 0.4rem 0.7rem; */
    display:flex;
    align-items: center;

    img{
        filter: brightness(0) invert(0.85);
        transition: all 0.1s ease;
        
        @media ${mqMd}, ${mqLg} {
            width: 1rem;
        }
        @media ${mqSm} {
            margin-top: 0.2rem;
            width: 1rem;
            margin-right: 0.5rem;
        }
        &:hover {
            filter: brightness(0) invert(1);
        }
    }
    span{
        font-size: 1.25rem;
        color: var(--nav-item-color);
        @media ${mqMd}, ${mqLg} {
            display:none;
        }
        @media ${mqSm} {
            display:flex
        }
    }
`;