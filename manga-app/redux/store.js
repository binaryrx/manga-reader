import { configureStore, combineReducers } from "@reduxjs/toolkit";
import sessionReducer from "./slices/sessionSlice";
import favoritesReducer from "./slices/favoritesSlice";

const combinedReducers = combineReducers({
    session: sessionReducer,
    favorites: favoritesReducer
})

const rootReducer = (state, action) => {
    if(action.type === "session/clearSession") {
        state = undefined
    }

    return combinedReducers(state,action)
}

export const store = configureStore({
    reducer: rootReducer
})
