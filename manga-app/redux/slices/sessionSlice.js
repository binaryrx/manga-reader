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
        setSession: ( state, action ) => {
            state.id = action.payload.id;
            state.user.id = action.payload.user.id
            state.user.email = action.payload.user.email
            state.user.name = action.payload.user.name
        },
        clearSession: () => initialState
       
    }
});

//Selectors
export const getSession = state => state.session;

//Reducers and Actions
export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;