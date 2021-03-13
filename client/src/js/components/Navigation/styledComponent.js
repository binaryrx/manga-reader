/* eslint-disable max-len */
import styled from "styled-components";
import { mqSm, mqMd, mqLg } from "../styleVars";

export const NavigationContainer = styled.div`
    background-color: #222;
    border: var(--nav-border);
    border-color: var(--nav-border-color);
    margin-bottom: 2rem;
`;

export const NavigationStyled = styled.header`
    display: flex;
    align-items: center;
    min-height: 4rem;
    max-width: 1100px;
    margin: 0 auto;

    @media ${mqMd}, ${mqLg} {
        flex-flow: row;
        justify-content: flex-start;
    }

    @media ${mqSm} {
        flex-flow: column;
        justify-content: center;
    }

    a {
        text-decoration: none;
    }

    img {
        height: auto;
    }
`;

export const NavigationUser = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;

    @media ${mqMd}, ${mqLg} {
        margin-left: 2rem;
        padding-left: 1rem;
        border-left: 1px solid hsla(0, 0%, 100%, 0.3);
    }
    @media ${mqSm} {
        margin-bottom: 0.5rem;
    }

    & > * {
        margin-left: 1rem;
    }

    div {
        a {
            display: flex;
            img {
                // width: 2rem;
                filter: brightness(0) invert(0.85);
                transition: all 0.1s ease;
                &:hover {
                    filter: brightness(0) invert(1);
                }
            }
        }
    }
`;

export const NavigationUserProfile = styled.div`
    a {
        img {
            @media ${mqMd}, ${mqLg} {
                width: 2.25rem;
            }
            @media ${mqSm} {
                width: 2.75rem;
            }
        }
    }
`;

export const NavigationLogo = styled.a`
    img {
        background: white;
        @media ${mqMd}, ${mqLg} {
            margin-top: 0.6rem;
            width: 9.4rem;
        }

        @media ${mqSm} {
            margin-top: 0.5rem;
            width: 14rem;
        }
    }
`;

export const NavigationNav = styled.nav`
    @media ${mqMd}, ${mqLg} {
        margin: 0 0 0 auto;
    }

    @media ${mqSm} {
        margin: 0 0 0.75rem 0;
    }
`;
export const NavigationSearchFormContainer = styled.div`
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    margin:0;
    background-color: rgba(0, 0, 0, 0.85);
    width: 100%;
    height: 100%;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;

    &.active {
        display: flex;
    }
`;
export const NavigationSearchForm = styled.form`
    position: relative;
    display: flex;
    align-items: center;
    margin: 6rem 0 0;
    min-height: 2.5rem;
    outline: none;
`;
export const NavigationSearchFormClose = styled.div`
    position: absolute;
    right: 3%;
    top:3%;
    
`;
export const NavigationSearchFormCloseImg = styled.img`
    width: 3rem;
    height: auto;
    filter: brightness(0) invert(0.85);
    transition: all 0.1s ease;
    &:hover {
        filter: brightness(0) invert(1);
    }
`;

export const NavigationSearchInput = styled.input`
    padding: 0.5rem 0;
    font-size: 1.25rem;
    border: 2px solid rgba(255, 255, 255, 0.4);
    color: #c8eef7;
    background: transparent;
    padding-left: 1rem;
    min-width: 20rem;

    &:focus {
        border-color: #fff;
        outline: none;
    }
`;

export const NavigationNavItem = styled.div`
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

        &:hover {
            color: var(--nav-color);
            opacity: 1;
            text-decoration: underline;
        }

        @media ${mqMd}, ${mqLg} {
            font-size: 1rem;
        }

        @media ${mqSm} {
            font-size: 1.35rem;
        }
    }
`;
export const NavigationNavContainer = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-between;
`;

export const NavigationNightModeBtn = styled.button`
        cursor: pointer;
        text-indent: -9999px;
        width: 4rem;
        height: 2.2rem;
        background: #02a6f2;
        float: right;
        border-radius: 100px;
        position: relative;
        border: none;
        outline: none;
        overflow: hidden;
        transition: .3s;

    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 8%;
        transform: translateY(-50%) scale(1);
        width: 1.7rem;
        height: 1.7rem;
        background: #fff;
        border-radius: 50%;
        transition: inherit;
        // eslint-disable-next-line max-len
        --poly: polygon(44.13371% 12.96169%, 50% 0%, 55.86629% 12.96169%, 59.70571% 13.77778%, 63.4388% 14.99073%, 67.02464% 16.58726%, 79.38926% 9.54915%, 76.5165% 23.4835%, 79.14297% 26.40049%, 81.45015% 29.57604%, 83.41274% 32.97536%, 97.55283% 34.54915%, 87.03831% 44.13371%, 87.44861% 48.0374%, 87.44861% 51.9626%, 87.03831% 55.86629%, 97.55283% 65.45085%, 83.41274% 67.02464%, 81.45015% 70.42396%, 79.14297% 73.59951%, 76.5165% 76.5165%, 79.38926% 90.45085%, 67.02464% 83.41274%, 63.4388% 85.00927%, 59.70571% 86.22222%, 55.86629% 87.03831%, 50% 100%, 44.13371% 87.03831%, 40.29429% 86.22222%, 36.5612% 85.00927%, 32.97536% 83.41274%, 20.61074% 90.45085%, 23.4835% 76.5165%, 20.85703% 73.59951%, 18.54985% 70.42396%, 16.58726% 67.02464%, 2.44717% 65.45085%, 12.96169% 55.86629%, 12.55139% 51.9626%, 12.55139% 48.0374%, 12.96169% 44.13371%, 2.44717% 34.54915%, 16.58726% 32.97536%, 18.54985% 29.57604%, 20.85703% 26.40049%, 23.4835% 23.4835%, 20.61074% 9.54915%, 32.97536% 16.58726%, 36.5612% 14.99073%, 40.29429% 13.77778%);
        background: #ff0;

        transform-origin: 20% 20%;
        clip-path: var(--poly);
    }

    &.active:before{
        transform: translate(calc(100% + 0.05em),-50%) scale(.3);
    }

    &:after{
        content: '';
        position:absolute;
        top: 50%;
        right: 7%;
        height: 1.7rem;
        width: 1.7rem;
        transition: inherit;
        background: radial-gradient(circle at 19% 19%,transparent 41%,#fff 43%);
        border-radius: 50%;
        transform: translateY(70%);
    }

    &.active:after{
        transform: translateY(calc(-100% - -0.85rem));
    }
    
    

    &.active {
        background: black;
    }

`;