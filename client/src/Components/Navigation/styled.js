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





