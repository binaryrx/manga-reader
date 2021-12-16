import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import DELETE_USER_FAVORITE from '#/api/mutations/DELETE_USER_FAVORITE'
import CREATE_USER_FAVORITE from '#/api/mutations/CREATE_USER_FAVORITE'

import { setFavorites, setFavorite , getFavorites, removeFavorite } from "#/redux/slices/favoritesSlice";
import { getSession } from "#/redux/slices/sessionSlice";

import heartImg from "#/assets/images/heart.svg";
import favoriteImg from "#/assets/images/favorite.svg";
import { useEffect } from "react";


const Favorite = ({manga_id} = props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [deleteUserFavorite] = useMutation(DELETE_USER_FAVORITE);
    const [createUserFavorite] = useMutation(CREATE_USER_FAVORITE);

    const session = useSelector(getSession)
    const favorites = useSelector(getFavorites);

    const favorite = favorites.find( favorite => favorite.manga_id === manga_id )
    

    useEffect(() => {
        //if router query contains favorite, create a user favorite, and redirect to the same page without the query
        if(router.query.favorite && session.id && favorite === undefined) {
            router.replace(router.asPath.split("?")[0], undefined, {shallow: true})
            createUserFavorite({variables: {user_id: session.user.id, manga_id}})
                .then(({data}) => {
                    dispatch(setFavorites([data.createUserFavorite]));
                })
                .catch((e => {
                    console.log(e);
                }))
        }
    },[session, favorite])

   

    const handleFavorite = async () => {
        //if not logged in redirect to login with returnUrl query param + favorite 
        if(!session.id) {
            return router.push(`/login?returnUrl=${encodeURIComponent(router.asPath)}&favorite=1`)
        }

        if(favorite !== undefined) {
            deleteUserFavorite({variables: {user_id: session.user.id, manga_id}})
            dispatch(removeFavorite({id: manga_id}));
        }else{
            const { data } = await createUserFavorite({variables: {user_id: session.user.id, manga_id}});
            dispatch(setFavorites([data.createUserFavorite]));
        }
    }

    
    return <button className="favorite" onClick={handleFavorite}>
        <img src={favorite !== undefined ? favoriteImg.src : heartImg.src} alt="" />
    </button>;
};
export default Favorite;