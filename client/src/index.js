import "./scss/main.scss";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import { Home, Manga, PopularMangas, LatestMangas } from "./Components/Pages";


render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalStyle />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/popular" component={PopularMangas} />
                <Route exact path="/latest" component={LatestMangas} />
                <Route path="/:mangaName" component={Manga} />
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
