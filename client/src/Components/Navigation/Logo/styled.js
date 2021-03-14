import styled from "styled-components";
import { mqSm, mqMd, mqLg } from "../../styleVars";

export const LogoStyled = styled.div`
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
