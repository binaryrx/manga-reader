/* eslint-disable max-len */
import styled from "styled-components";
import { mqSm, mqMd, mqLg } from "#/theme/styleVars";


export const ThemeChangerStyled = styled.button`
    cursor: pointer;
    text-indent: -9999px;
  
    border-radius: 100px;
    position: relative;
    border: none;
    outline: none;
    overflow: hidden;
    transition: .3s;
    user-select: none;
    color:transparent;
    box-sizing: border-box;
    background: var(--ThemeChangerBG);
        
    @media ${mqLg}, ${mqMd} {
        width: 4rem;
        height: 2.4rem;
    }
    @media ${mqSm} {
        width: 4.5rem;
        height: 2.3rem;
    }
        
    &:before {
        content: '';
        position: absolute;
        top: 50%;
        background: #fff;
        border-radius: 50%;
        transition: inherit;
        --poly: polygon(44.13371% 12.96169%, 50% 0%, 55.86629% 12.96169%, 59.70571% 13.77778%, 63.4388% 14.99073%, 67.02464% 16.58726%, 79.38926% 9.54915%, 76.5165% 23.4835%, 79.14297% 26.40049%, 81.45015% 29.57604%, 83.41274% 32.97536%, 97.55283% 34.54915%, 87.03831% 44.13371%, 87.44861% 48.0374%, 87.44861% 51.9626%, 87.03831% 55.86629%, 97.55283% 65.45085%, 83.41274% 67.02464%, 81.45015% 70.42396%, 79.14297% 73.59951%, 76.5165% 76.5165%, 79.38926% 90.45085%, 67.02464% 83.41274%, 63.4388% 85.00927%, 59.70571% 86.22222%, 55.86629% 87.03831%, 50% 100%, 44.13371% 87.03831%, 40.29429% 86.22222%, 36.5612% 85.00927%, 32.97536% 83.41274%, 20.61074% 90.45085%, 23.4835% 76.5165%, 20.85703% 73.59951%, 18.54985% 70.42396%, 16.58726% 67.02464%, 2.44717% 65.45085%, 12.96169% 55.86629%, 12.55139% 51.9626%, 12.55139% 48.0374%, 12.96169% 44.13371%, 2.44717% 34.54915%, 16.58726% 32.97536%, 18.54985% 29.57604%, 20.85703% 26.40049%, 23.4835% 23.4835%, 20.61074% 9.54915%, 32.97536% 16.58726%, 36.5612% 14.99073%, 40.29429% 13.77778%);
        background: #ff0;
        transform-origin: 20% 20%;
        clip-path: var(--poly);
        transform: var(--ThemeChangerBefore);


        @media ${mqLg}, ${mqMd} {
            left: 8%;
            width: 1.7rem;
            height: 1.7rem;
        }
        @media ${mqSm} {
            left: 6%;
            width: 2rem;
            height: 2rem;
        }

    }


    &:after{
        content: '';
        position:absolute;
        right: 10%;

        transition: inherit;
        background: radial-gradient(circle at 19% 19%,transparent 41%,#fff 43%);
        border-radius: 50%;
        transform: var(--ThemeChangerAfter);
        top: 50%;
        width: 1.7rem;
        height: 1.7rem;
    }

 
`;
