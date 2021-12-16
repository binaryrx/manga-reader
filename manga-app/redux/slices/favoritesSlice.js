import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

const initialState = [];

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setFavorites: ( state, { payload } ) => {
            payload.forEach( load => state.push(load))
        },

        setFavorite: ( state, { payload } ) => {
            state.push(payload)
        },
        
        removeFavorite: (state, { payload }) => {
            return current(state).filter( fav => fav.manga_id !== payload.id)
        },

        clearFavorites: () => initialState
       
    }
});

//Selectors
export const getFavorites = state => state.favorites;

//Reducers and Actions
export const { setFavorites ,setFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;