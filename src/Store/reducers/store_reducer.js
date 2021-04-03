
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    store : null,
    isLoading: true,
}

const storeReducers = {
    fetchStore(state, action){
        state.store = null;
        state.isLoading = true;
    },
    onboarding(state, action){
        state.isLoading = false;
    },
    redirect(state, action){
        state.store = action.payload.store;
        state.isLoading = false;
    },
    setStoreInfo(state, action){
        state.store = action.payload;
    }
} 

const storeSlice = createSlice({
    name : 'store',
    initialState,
    reducers : storeReducers
})

export const { fetchStore, onboarding, redirect, setStoreInfo } = storeSlice.actions;
export default storeSlice;