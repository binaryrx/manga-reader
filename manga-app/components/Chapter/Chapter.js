/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import heartImg from "#/assets/images/heart.svg";
import arrowRightImg from "#/assets/images/arrow-right.svg";
import arrowUpImg from "#/assets/images/arrow-up.svg";
import upImg from "#/assets/images/up.svg";
import { mqSm, mqMd, mqLg } from "#/theme/styleVars";


import {
    ChapterMain,
    Title,
    TitleName,
    ChapterImgs,
    ChapterImg,
    ChapterNum,
    ChapterNav,
} from "./styled";
import slugify from "#/utils/slugify";


const Chapter = ({ chapter, chapters } = props) => {

    const host = "http://imghub.stg.sh";

    const [selectOpen, setSelectOpen] = useState(false);

    const selectRef = useRef(null);

    const handleClickOutsideSelect = (e) => {
        if (selectRef.current && !selectRef.current.contains(e.target) && !e.target.classList.contains("select-open")) {
            e.target.classList.contains("select-open");
            setSelectOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutsideSelect, true);
        return () => {
            document.removeEventListener("click", handleClickOutsideSelect, true)
        }
    })

    //arrays are frozen in strict mode, so a new array is made using slice
    chapters = chapters.slice().sort((a,b) => Number(a.chapter_num) - Number(b.chapter_num) )
    
    //get index of current chapter
    const index = chapters.findIndex(({chapter_num}) => Number(chapter_num) === Number(chapter.chapter_num)  )
    const nextChapter = chapters[index + 1] ?? null; 
    const prevChapter = chapters[index - 1] ?? null;

    const getPrevNextUrl = (chapter, mangaName) => {
        return chapter ?  `/chapter/${slugify(mangaName)}/${slugify(chapter.chapter_name)}` : `/manga/${slugify(mangaName)}`
    }

    const nextChapterUrl = getPrevNextUrl(nextChapter, chapter.manga_name);
    const prevChapterUrl = getPrevNextUrl(prevChapter, chapter.manga_name);


    return (
        <>
            {chapter && <ChapterMain >

                <Title>
                    <TitleName href={"#"}>{chapter.manga_name}</TitleName>: #{chapter.chapter_num} - {chapter.chapter_name}
                </Title>

                <ChapterImgs>
                    {chapter.img_urls.map((url, i) => {
                        return (
                            <div key={i}>
                                <ChapterImg src={host + url} />
                                <ChapterNum>{i + 1}/{chapter.img_urls.length}</ChapterNum>
                            </div>
                        )
                    })}
                </ChapterImgs>

                <ChapterNav>

                    <button className="favorite">
                        <img src={heartImg.src} alt="" />
                    </button>

                    <ul className={`pagination ${selectOpen ? "open" : ""}`} >
                        <li>
                            <Link href={prevChapterUrl} >
                                <a href={prevChapterUrl} className="prev">
                                    <img src={arrowRightImg.src} alt="" />
                                    <span className="desktopInline">Previus</span>
                                </a>
                            </Link>
                        </li>


                        <li >
                            <button className="select-open" id="select-chapter" onClick={() => setSelectOpen(!selectOpen)} role="button" aria-haspopup="true" aria-expanded="false">
                                <span>#{chapter.chapter_num} <span className="desktopInline">- {chapter.chapter_name}</span></span>
                                <img src={upImg.src} alt="" />
                            </button>

                            <ul role="menu" className="select" ref={selectRef} aria-labelledby="select-chapter">

                                {chapters.map(({chapter_name, chapter_num} = chapter, i) => {
                                    const url = `/chapter/${slugify(chapter.manga_name)}/${slugify(chapter_name)}`;
                                    return (
                                        <li role="presentation" key={i}>
                                            <Link href={url}>
                                                <a href={url}>#{chapter_num} - {chapter_name}</a>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>


                        <li>
                            <Link href={nextChapterUrl}>
                                <a href={nextChapterUrl} className="next">
                                    <span className="desktopInline">Next</span>
                                    <img src={arrowRightImg.src} alt="" />
                                </a>
                            </Link>
                        </li>

                    </ul>

                    <button className="scrollUp" onClick={() => window.scrollTo(0,0)}>
                        <img src={arrowUpImg.src} alt="" />
                    </button>

                </ChapterNav>

            </ChapterMain>
            }
        </>
    );
};

export default Chapter;
