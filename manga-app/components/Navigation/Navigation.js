import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/dist/client/router'
import Link from "#/components/NoScrollLink"
import { isActiveLink } from '#/utils/isActiveLink'
import { motion } from "framer-motion";

import ThemeChanger from "#/components/ThemeChanger";
import Search from "#/components/Search";

import { mqSm, mqMd, mqLg } from "#/theme/styleVars";

import profileImg from "#/assets/images/profile.svg";
import searchImg from "#/assets/images/search.svg"
import logoImgBig from "#/assets/images/logo_manga_here_big.png";
import logoImgSmall from "#/assets/images/logo_manga_here_small.png";


import { Header, Logo, Profile, NavItemStyled, OpenSearch} from "./styled";

const NavItem = (props) => {
    const { href, navName, pathName } = props;
    
    return (
        <NavItemStyled >
            <Link href={href}>
                <a href={href}>
                    {navName}
                    {isActiveLink(href, pathName) && (
                        <motion.div
                            layoutId="navigation-underline"
                            className="navigation-underline"
                            transition={{ type: 'linear' }}
                            animate
                        />
                    )}
            </a>
            </Link>
        </NavItemStyled>
    );
};


const Navigation = props => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const router = useRouter()

    const navRef = useRef(null);

    useEffect(()=> {
        
        const setNavHeight = () => {
            let height = 0;
            
            //mobile nav height
            if(matchMedia(mqSm).matches) {
                const navItems = [...navRef.current.children]
                //get navitems height
                navItems.forEach(item => height += item.clientHeight );

                //get nav padding top and bottom
                const {paddingTop, paddingBottom}  = getComputedStyle(navRef.current)
                height += parseInt(paddingTop) + parseInt(paddingBottom);

                navRef.current.style.height = navOpen ? height + "px" : "0px";
            //desktop nav height
            }else{
                navRef.current.style.height = "auto";
            }
        }

        setNavHeight()

        window.addEventListener("resize", setNavHeight);

        return () => {
            window.removeEventListener("resize", setNavHeight);
        }
       
    }, [navOpen])


    return(
        <Header>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-header">

                        <button className="navbar-toggle mobile" onClick={() => navOpen ? setNavOpen(false) : setNavOpen(true)}>
                            <div className="sr-only">Toggle navigation</div>
                            <div className={`hamburger ${navOpen ? "open" : ""}`}>
                                <div className="hamburger-line"></div>
                                <div className="hamburger-line"></div>
                                <div className="hamburger-line"></div>
                            </div>
                        </button>

                        <Logo>
                            <Link href="/">
                                <a href="/">
                                        <picture>
                                            <source media={mqLg} srcSet={logoImgBig.src}/>
                                            <source media={mqMd} srcSet={logoImgBig.src}/>
                                            <img src={logoImgSmall.src} alt="manga reader" />
                                        </picture>
                                </a>
                            </Link>
                        </Logo>
                        
                        <Profile className="mobile">
                            <Link href="/profile">
                                <a href="/profile">
                                    <img src={profileImg.src} alt="" />
                                </a>
                            </Link>
                        </Profile>
                    </div>

                    <ul className={`navbar-nav ${navOpen ? "open" : ""}`} ref={navRef}>
                        <li role="presentation">
                            <NavItem href="/latest" navName="Latest" pathName={router.pathname}/>
                        </li>
                        <li role="presentation">
                            <NavItem href="/popular" navName="popular" pathName={router.pathname}/>
                        </li>
                        <li role="presentation" className="seperator">
                            <span className="desktop">
                                |
                            </span>
                        </li>
                        <li role="presentation">
                            <ThemeChanger theme={props.theme} setTheme={props.setTheme}/>
                        </li>
                        <li role="presentation" className="desktop">
                            <Profile >
                                <Link href="/profile">
                                    <a href="/profile">
                                        <img src={profileImg.src} alt="" />
                                    </a>
                                </Link>
                            </Profile>
                        </li>
                        <li role="presentation">
                            <OpenSearch onClick={() => setSearchOpen(true)}>
                                <img src={searchImg.src} />
                                <span>Search</span>
                            </OpenSearch>
                        </li>
                    </ul>
                    <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
                    
                </div>
                
            </nav>
        </Header>
    );
}

export default Navigation;
