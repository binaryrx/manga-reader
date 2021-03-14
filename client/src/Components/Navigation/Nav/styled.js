import styled from "styled-components";
import { mqSm, mqMd, mqLg } from "../../styleVars";

export const NavContainer = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-between;
`;


export const NavStyled = styled.nav`
    @media ${mqMd}, ${mqLg} {
        margin: 0 0 0 auto;
    }

    @media ${mqSm} {
        margin: 0 0 0.75rem 0;
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
