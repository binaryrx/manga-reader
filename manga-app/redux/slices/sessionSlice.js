import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    user: {
        id: null,
        email: null,
        name: null
    },
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSession: ( state, { payload } ) => {
            state.id = payload.id;
            state.user.id = payload.user.id
            state.user.email = payload.user.email
            state.user.name = payload.user.name
        },
        clearSession: () => initialState
       
    }
});

//Selectors
export const getSession = state => state.session;

//Reducers and Actions
export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;