import React, { useState, useEffect } from "react";
import Link from "#/components/NoScrollLink";
import slugify  from "#/utils/slugify";
import formatDate from "#/utils/formatDate";

import { 
    MangaMain ,
    SectionManga ,
    SectionChapters ,

    MangaImg ,
    MangaDetail ,
    MangaDetails ,
    AltNames ,
    MangaTitle ,
    Strong ,
    Genres ,
    Genre ,
    Description,
    LatestChapter,

    Tabs,
    Tab,
    TabButton,
    TabContent,

    Chapter,
    ChapterLink,
    ChapterNum,
    ChapterName,
    ChapterUpdatedAt
} from "./styled";


const Manga = ({ manga } = props) => {

    //max amount of chapters per Tab
    const tabLength = 50;

    //amount of Tabs
    const tabsAmount = Math.ceil(manga.chapters.length / tabLength);

    // formated tabs, chapters + summary
    const tabsContents = formatTabData(manga, tabsAmount, tabLength);

    const [activeTab, setActiveTab] = useState(tabsContents[tabsContents.length -1]);


    const setTab = (e) => {
        setActiveTab(tabsContents[e.target.dataset.section])
    }

    return (
        <>
            {manga && <MangaMain>
                <SectionManga>
                    <MangaImg src={"http://imghub.stg.sh/" + manga.cover_url} alt="" width="255" height="350"/>
                    <MangaDetails>
                        <MangaTitle>
                            {manga.title}
                            <AltNames>{manga.alt_names}</AltNames>
                        </MangaTitle>

                         <MangaDetail>
                            <Strong>Author:</Strong>
                            {manga.author}
                        </MangaDetail>
                        
                        <MangaDetail>
                            <Strong>Artist:</Strong>
                            {manga.artist}
                        </MangaDetail>

                        <MangaDetail>
                            <Strong>Status:</Strong>
                            {manga.status}
                        </MangaDetail>
                        <MangaDetail>
                            <Strong>Latest:</Strong>
                            <LatestChapter href="#">{manga.latestChapter}</LatestChapter>
                        </MangaDetail>
                        
                        <Genres>
                            {manga.genres.map( (genre,i) => 
                            <Link key={i} href={"/genre/" + slugify(genre)}>
                                <Genre href={"/genre/" + slugify(genre)}>{genre}</Genre>
                            </Link>)}
                        </Genres> 

                    </MangaDetails>
                </SectionManga>

                <SectionChapters>
                    <Tabs role="tablist">
                        {createTabs({tabsContents, activeTab, setTab})}
                    </Tabs>

                    {createContentTabs({tabsContents, description: manga.description, activeTab})}
                    
                </SectionChapters>
            
            </MangaMain>
            }
        </>
    );
};

const formatTabData = ( manga, tabsAmount, tabLength) => {
    const {chapters} = manga;
    /**
    * filter chapters based on secstion into secs array 
    * @retuns two dimensional array -> [][]
    */
   const secs = Array.from({ length: tabsAmount }, (_,i) => {
       return chapters.filter( (chapter) => {

           return ( Number(chapter.chapter_num) <= tabLength * ( i + 1) && 
               Number(chapter.chapter_num) > tabLength * ( i) ) || ( Number(chapter.chapter_num) == 0 && i === 0 );
       });
   });


    /**
    * create an object for the manga desction
    * concat the maped tabs with their respective labels
    * @retuns {label: String, section: Number, chapters: Array}
    */
   const secsWithLabel = [{
           "label": `Summary`,
           "tabNum": 0,
           "description": manga.description,
       }].concat(secs.map((sec,i) => {
       return {
           "label": `${sec[sec.length-1].chapter_num} - ${sec[0].chapter_num}`,
           "tabNum": i+1,
           "chapters": sec,
       }
   }));

   return secsWithLabel

}

const createTabs = ({tabsContents, activeTab, setTab}) => {
    const secs = [];

    for( let i = tabsContents.length; i > 0; i-- ){

        secs.push(
            
            <Tab key={i} role="presentation">
                <TabButton 
                    onClick={setTab} 
                    data-section={i-1} 
                    className={activeTab.tabNum === i - 1 ? "active" : ""}
                    role="tab"
                    id={`anim-content-tab-panel-${i}-id`}
                    aria-controls={`anim-content-tab-panel-${i}`}
                    aria-selected={activeTab.tabNum ===  i - 1 ? "true" : "false"}
                    tabIndex={activeTab.tabNum === i - 1 ? "" : "-1"}
                >
                    {tabsContents[i-1].label}
                </TabButton>
            </Tab>
        )

    };

    return secs;
}

const createContentTabs = ({tabsContents, description, activeTab}) => {
    const tabs = [];

    //create TabContent 
    for( let i = tabsContents.length; i > 1; i-- ){
        
        tabs.push(
            <TabContent 
                key={i}
                className={activeTab.tabNum === i - 1 ? "active" : ""}
                role="tabpanel"
                aria-hidden={activeTab.tabNum ===  i - 1 ? "false" : "true"}
                aria-labelledby={`anim-content-tab-panel-${i}-id`}
                id={`anim-content-tab-panel-${i}`}
            >
                {tabsContents[i -1].chapters && tabsContents[i -1].chapters.map( (chapter,j) =>   {
                    const chapterURL = `/chapter/${slugify(chapter.manga_name)}/${slugify(chapter.chapter_name)}`
                      return (
                        <Chapter key={j}>
                            <Link href={chapterURL}>
                                <ChapterLink href={chapterURL} >
                                        <ChapterNum>#{chapter.chapter_num}</ChapterNum>
                                        <ChapterName> - {chapter.chapter_name}</ChapterName>
                                        <ChapterUpdatedAt>{formatDate(chapter.updated_at)}</ChapterUpdatedAt>
                                </ChapterLink>
                            </Link>
                        </Chapter>
                      )
                   
                   }).reverse()
                }
            </TabContent>
        );
    
    }
    // push a description tab to the tabs array
    tabs.push(
        <TabContent
            key={1}
            className={activeTab.tabNum === 0 ? "active" : ""}
            role="tabpanel"
            aria-hidden={activeTab.tabNum ===  0 ? "false" : "true"}
            aria-labelledby={`anim-content-tab-panel-1-id`}
            id={`anim-content-tab-panel-1`}
        >
            <Description>
                {description}
            </Description>
        </TabContent>
    )

    return tabs;

}
export default Manga;
