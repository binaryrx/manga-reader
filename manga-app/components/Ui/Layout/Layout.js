import React from "react";
import { StyledLayout } from "./styledElements";


const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
}

const Layout = ({children}) => {
    return (
        <StyledLayout initial="hidden" animate="enter" exit="exit" variants={variants} transition={{type: "linear"  }}>
            {children}
        </StyledLayout>
    );
};
export default Layout;