import styled from "styled-components";

export const OpenSearchBtn = styled.button`
    border: none;
    outline: none;
    background: transparent;
    padding: 0.4rem 0.7rem;
`;

export const OpenSearchBtnImg = styled.img`
    width: 1.25rem;
    margin-top: 0.2rem;
    filter: brightness(0) invert(0.85);
    transition: all 0.1s ease;
    &:hover {
        filter: brightness(0) invert(1);
    }
`;