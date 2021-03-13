import "./scss/main.scss";
import React from "react";
import { render } from "react-dom";
import GlobalStyle from "./createGlobalStyle";
import Home from "./js/Home";

render(
    <>
        <GlobalStyle />
        <Home />
    </>,
    document.getElementById("root")
);
