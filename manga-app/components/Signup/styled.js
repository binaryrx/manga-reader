import styled from "styled-components";

export const Form = styled.form`
    display:flex;
    flex-flow: column nowrap;
    justify-content: flex-end;

    .apiError{
        margin-bottom: 1.5rem;
        color: red;
    }
    
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
        min-width: 24rem;
        min-height: 3rem;
        padding-left: 1rem;
        font-size: inherit;
        &:not([type="submit"]) {
            border: 1px solid var(--login-border-color);
            border-radius: 3px;
            background: transparent;
            &.error ~ span.error{
                color:red;
            }
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
        a{
            display:block;
			text-decoration: underline;
            &:not(:last-child) {
                margin-bottom: 0.25rem;
            }
        }
    }



`;