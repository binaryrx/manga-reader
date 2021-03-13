import React, { useState } from "react";
import { NavigationNightModeBtn } from "./styledComponent";

const addRootClass = (className) => document.documentElement.classList.add(className);
const removeRootClass = (className) => document.documentElement.classList.remove(className);

const NightModeBtn = () => {
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

    return <NavigationNightModeBtn onClick={toggleNightMode} className={nightMode ? "active" : ""}>
        {nightMode ? "Day Mode" : "Night Mode"}
    </NavigationNightModeBtn>;
};

export default NightModeBtn;
