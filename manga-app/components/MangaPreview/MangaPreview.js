
import React from "react";
import Link from "#/components/NoScrollLink";
import slugify  from "#/utils/slugify";

import {
    MangaPreviewStyled,
    MangaImage,
    Content,
    MangaName,
    Author,
    Genres,
    Genre,
    Footer,
    ChapterNum,
    Status,
    LastUpdated
    
} from "./styled";

const MangaPreview = (props) => {
    const { cover_url, manga_name, genres,  updated_at, status, latestChapterNum, latestChapter, author } = props.manga;
    const { page, classes }  = props;
    
    const imgUrl = "http://imghub.stg.sh" + cover_url;
    const slug = slugify(manga_name);

    const chapterUrl = `/chapter/${slugify(manga_name)}/${slugify(latestChapter)}`;

    return (
            <MangaPreviewStyled>
                <MangaImage className={classes}>
                    <Link href={"/manga/" +slug}>
                        <img src={imgUrl} alt=""  width="60" height="93" loading="lazy"/>
                    </Link>
                </MangaImage>
                <Content>
                    <MangaName className={classes}>
                        <Link href={"/manga/" + slug}>{manga_name}</Link>

                        <LastUpdated>{new Date(updated_at).toUTCString()}</LastUpdated>
                    </MangaName>

                        <>
                            {page === "genre" && (
                                <Author>by {author} </Author>
                            ) }

                            
                            <ChapterNum className={classes}>
                                {/* add link to latest chapter */}
                                
                                <Link href={chapterUrl}> 
                                    <a href={chapterUrl}>
                                        {"#" + latestChapterNum}

                                        {page !== "genre" && (
                                            <span><> - {latestChapter}</></span>
                                            
                                        )}
                                    </a>
                                </Link>

                                

                                {page === "genre" && (
                                    <>
                                        <> - chapters published </>
                                        <Status>({status})</Status>
                                    </>
                                )}

                              

                            </ChapterNum>

                            {page === "genre" && (
                                <Genres>
                                    {genres.map( (genre,i) => 
                                    <Link key={i} href={"/genre/" + slugify(genre)}>
                                        <Genre href={"/genre/" + slugify(genre)}>{genre}</Genre>
                                    </Link>)}
                                </Genres>
                            )}

                        </>
                    
                        
                </Content>
        </MangaPreviewStyled> 
    );
};

export default MangaPreview;
