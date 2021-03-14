/* eslint-disable max-len */
import styled from "styled-components";
import { mqSm, mqMd, mqLg } from "../../styleVars";

export const UserAreaStyled = styled.div`
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

    & > *:not(.active) {
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

export const UserAreaProfile = styled.div`
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