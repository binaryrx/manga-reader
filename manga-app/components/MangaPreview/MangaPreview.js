
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";

import DELETE_USER_FAVORITE from '#/api/mutations/DELETE_USER_FAVORITE'
import { removeFavorite } from "#/redux/slices/favoritesSlice";
import { getSession } from "#/redux/slices/sessionSlice";

import Link from "#/components/NoScrollLink";
import slugify  from "#/utils/slugify";
import { MangaPreviewStyled } from "./styled";

const MangaPreview = (props) => {
    const { cover_url, id, manga_name, genres,  updated_at, status, latest_chapter_num, latest_chapter, author } = props.manga;
    const { page, classes }  = props;

    const dispatch = useDispatch();
    const [deleteUserFavorite] = useMutation(DELETE_USER_FAVORITE);
    const session = useSelector(getSession)

    const imgUrl = "http://imghub.stg.sh" + cover_url;
    const slug = slugify(manga_name);

    console.log(page)
    console.log(props);
    
    const handleRemoveFavorite = () => {
        deleteUserFavorite({variables: {user_id: session.user.id, manga_id: Number(id)}})
        dispatch(removeFavorite({id: Number(id)}));
    }

    const chapterUrl = `/chapter/${slugify(manga_name)}/${slugify(latest_chapter)}`;

    return (
            <MangaPreviewStyled className="mangaPreview">
                <div className={classes + " mangaPreview-poster"}>
                    <Link href={"/manga/" +slug}>
                        <img src={imgUrl} alt=""  width="60" height="93" loading="lazy"/>
                    </Link>
                </div>
                <div className="mangaPreview-content">
                    <h4 className={classes + " mangaPreview-mangaName"}>
                        <Link href={"/manga/" + slug}>{manga_name}</Link>

                        {page !== "profile" &&
                            <small className="mangaPreview-lastUpdated">{new Date(updated_at).toUTCString()}</small>
                        }
                    </h4>

                        <>
                       
                            {page === "genre" && (
                                <span className="mangaPreview-author">by {author} </span>
                            ) }

                            
                            <div className={classes + " mangaPreview-chapterNum"}>
                                {/* add link to latest chapter */}
                                
                                <Link href={chapterUrl}> 
                                    <a href={chapterUrl}>
                                        {"#" + latest_chapter_num}

                                        {page !== "genre" && (
                                            <span><> - {latest_chapter}</></span>
                                            
                                        )}
                                    </a>
                                </Link>

                                {page === "genre" && (
                                    <>
                                        <> - chapters published </>
                                        <span className="mangaPreview-status">({status})</span>
                                    </>
                                )}

                            </div>

                            {page === "genre" && (
                                <duv className="mangaPreview-genres">
                                    {genres.map( (genre,i) => 
                                    <Link key={i} href={"/genre/" + slugify(genre)}>
                                        <a className="mangaPreview-genre" href={"/genre/" + slugify(genre)}>{genre}</a>
                                    </Link>)}
                                </duv>
                            )}

                            {page === "profile" &&
                                <button className="removeFavorite" onClick={handleRemoveFavorite}>
                                    remove
                                </button>
                            }

                        </>
                    
                        
                </div>
        </MangaPreviewStyled> 
    );
};

export default MangaPreview;
