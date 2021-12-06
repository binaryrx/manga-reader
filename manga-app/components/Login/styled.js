import styled from "styled-components";

export const Form = styled.form`
    /* background: tomato; */
    
    display:flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    
    .input-container{
        position: relative;
        font-size: 1.15rem;
        margin-bottom: 1.25rem;
        display: flex;
        flex-flow: column;
    }

    label{
        margin-bottom: 0.25rem;
        position: absolute;
        top:0.75rem;
        left: 1rem;
        transition: all 0.1s ease;
        pointer-events: none;
        background-color: var(--body-bg)
    }

    input{
        padding: 0;
        margin:0;
        min-width: 15rem;
        min-height: 3rem;
        padding-left: 1rem;
        font-size: inherit;
        &:not([type="submit"]) {
            border: 1px solid white;
            border-radius: 3px;
            background: transparent;
       }
       &:focus ~ label,&:not(:focus).typed ~ label {
           top: -1rem;
           left: 0.3rem;
           padding: 0rem 0.25rem;
       }
       &[type="submit"] {
           cursor: pointer
       }
    }
    span.error{
        margin-top:0.25rem;
        font-size: 85%;
    }

    .links{
        margin-top: 0.5rem;
        .link{
            display:block;
            &:not(:last-child) {
                margin-bottom: 0.25rem;
            }
        }
    }



`;