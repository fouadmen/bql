import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    token : null,
    id : null,
    isLoading : true //used for activityloader
}

//move this it utils

const authReducers = {
    logIn(state, action){
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.isLoading = false;
    },
    signUp(state, action){
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.isLoading = false;
    },
    signOut(state, action){
        state.token = null;
        state.id = null;
        state.isLoading = false;
    },
    retreiveToken(state, action){
        state.token = action.payload.token;
        state.id = action.payload.token; //TODO : REMOVE THIS
        state.isLoading = false;
    }
} 

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : authReducers
})

export const { logIn, signUp, signOut, retreiveToken } = authSlice.actions 
export default authSlice;