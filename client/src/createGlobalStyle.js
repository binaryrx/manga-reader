import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    :root{
        --nav-color: #fff;
        --text-color: #222;
        --body-bg: #f9f9f9;
        --nav-border: 1px solid;
        --nav-border-color: #111;
    }
    :root.dark{
        --nav-color: #fff;
        --text-color: #eee;
        --body-bg: #2d2d2d;
    }

    

    
    *,
    *::after,
    **:before {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    html,
    body {
        margin: 0;
        width: 100%;
        color: var(--text-color);
        scroll-behavior: smooth;
        background-color: var(--body-bg);;
        overflow-x: hidden;
        font-family: Roboto, sans-serif;
        font-size: calc(0.9em + 0.15vmin);

        @media (max-width: 600px) {
            font-size: calc(0.9em + 0.5vmin);
        }
    }


    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        margin: 0;
        padding: 0;
        font-weight: 400;
    }

    button a {
        border: none;
        outline: none;
        appearance: none;
    }
`;

export default GlobalStyle;

// module.exports = {
//     GlobalStyle,
// };
