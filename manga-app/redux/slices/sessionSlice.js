import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    user: {
        id: null,
        email: null
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
        },
        clearSession: ( state ) => {
            state.id = null,
            state.user.id = null,
            state.user.email = null
        }
    }
});

//Selectors
export const getSession = state => state.session;

//Reducers and Actions
export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;