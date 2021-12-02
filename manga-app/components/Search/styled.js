import styled from "styled-components";


export const SearchForm = styled.div`
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    margin:0;
    background-color: rgba(0, 0, 0, 0.85);
    width: 100%;
    height: 100vh;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;

    &.active {
        display: flex;
    }
  
    form{
        position: relative;
        display: flex;
        align-items: center;
        margin: 6rem 0 0;
        min-height: 2.5rem;
        outline: none;
    }

    input{
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
    }

    .SearchForm-close{
        position: absolute;
        right: 3%;
        top:3%;
        cursor: pointer;

        img{
            width: 3rem;
            height: auto;
            transition: all 0.1s ease;
            filter: brightness(0) invert(1);
            &:hover {
                filter: brightness(0) invert(0.85);
            }
        }
    }
`;