import React, { useState } from "react";
import { NightModeButtonStyled } from "./styled";

const addRootClass = (className) => document.documentElement.classList.add(className);
const removeRootClass = (className) => document.documentElement.classList.remove(className);

const NightModeButton = () => {
    const [nightMode, setNightMode] = useState(false);

    const toggleNightMode = () => {
        if (nightMode) {
            setNightMode(false);
            removeRootClass("dark");
        } else {
            setNightMode(true);
            addRootClass("dark");
        }
    };

    return <NightModeButtonStyled onClick={toggleNightMode} className={nightMode ? "active" : ""}>
        {nightMode ? "Day Mode" : "Night Mode"}
    </NightModeButtonStyled>;
};

export default NightModeButton;
